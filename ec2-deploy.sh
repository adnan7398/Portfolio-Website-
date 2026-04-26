#!/bin/bash
set -e

echo "============================================"
echo "🚀 Portfolio EC2 Deployment Script"
echo "============================================"

# --- 1. System Update ---
echo ""
echo "📦 [1/7] Updating system packages..."
sudo apt update && sudo apt upgrade -y

# --- 2. Install Node.js 20 LTS ---
echo ""
echo "📦 [2/7] Installing Node.js 20 LTS..."
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs
echo "   Node: $(node -v)"
echo "   npm:  $(npm -v)"

# --- 3. Install Nginx ---
echo ""
echo "📦 [3/7] Installing Nginx..."
sudo apt install -y nginx
sudo systemctl enable nginx

# --- 4. Install PM2 globally ---
echo ""
echo "📦 [4/7] Installing PM2..."
sudo npm install -g pm2

# --- 5. Clone repo & install dependencies ---
echo ""
echo "📦 [5/7] Cloning repository & installing dependencies..."
cd ~
if [ -d "portfolio" ]; then
    echo "   ⚠️  Directory 'portfolio' exists. Pulling latest..."
    cd portfolio
    git pull origin main
else
    git clone https://github.com/adnan7398/Portfolio-Website-.git portfolio
    cd portfolio
fi

# Backend
echo "   Installing backend dependencies..."
cd backend
npm install --production
cd ..

# Frontend
echo "   Installing frontend dependencies..."
cd frontend
npm install

# --- 6. Build frontend ---
echo ""
echo "📦 [6/7] Building frontend..."

# Get EC2 public IP for the API URL
EC2_PUBLIC_IP=$(curl -s http://169.254.169.254/latest/meta-data/public-ipv4 2>/dev/null || echo "")
if [ -z "$EC2_PUBLIC_IP" ]; then
    # Fallback: try IMDSv2
    TOKEN=$(curl -s -X PUT "http://169.254.169.254/latest/api/token" -H "X-aws-ec2-metadata-token-ttl-seconds: 21600")
    EC2_PUBLIC_IP=$(curl -s -H "X-aws-ec2-metadata-token: $TOKEN" http://169.254.169.254/latest/meta-data/public-ipv4)
fi
echo "   EC2 Public IP: $EC2_PUBLIC_IP"

# Set the API URL to the EC2 server itself (Nginx proxies /api to backend)
echo "VITE_API_URL=http://${EC2_PUBLIC_IP}" > .env

npm run build
echo "   ✅ Frontend built to dist/"
cd ..

# --- 7. Setup Backend .env ---
echo ""
echo "📦 [7/7] Setting up backend environment..."
cat > backend/.env << 'ENVEOF'
MONGODB_URI=mongodb+srv://123adnansiddiqui:781786@cluster0.6n71fln.mongodb.net/porfolio
JWT_SECRET=mysecretkey123
EMAIL_USER=123adnansiddiqui@gmail.com
EMAIL_PASS="urls gevu rksz tedu"
PORT=3001
NODE_ENV=production
ENVEOF
chmod 600 backend/.env
echo "   ✅ Backend .env created"

# --- Configure Nginx ---
echo ""
echo "🔧 Configuring Nginx..."
sudo cp nginx-portfolio.conf /etc/nginx/sites-available/portfolio
sudo ln -sf /etc/nginx/sites-available/portfolio /etc/nginx/sites-enabled/portfolio
sudo rm -f /etc/nginx/sites-enabled/default
sudo nginx -t
sudo systemctl restart nginx
echo "   ✅ Nginx configured"

# --- Start backend with PM2 ---
echo ""
echo "🔧 Starting backend with PM2..."
pm2 stop portfolio-backend 2>/dev/null || true
pm2 delete portfolio-backend 2>/dev/null || true
pm2 start ecosystem.config.js
pm2 save
pm2 startup systemd -u ubuntu --hp /home/ubuntu 2>/dev/null | tail -1 | bash 2>/dev/null || true
echo "   ✅ Backend running with PM2"

# --- Done! ---
echo ""
echo "============================================"
echo "🎉 DEPLOYMENT COMPLETE!"
echo "============================================"
echo ""
echo "🌐 Your website is live at:"
echo "   http://${EC2_PUBLIC_IP}"
echo ""
echo "📊 Useful commands:"
echo "   pm2 status          — Check backend status"
echo "   pm2 logs            — View backend logs"
echo "   pm2 restart all     — Restart backend"
echo "   sudo nginx -t       — Test Nginx config"
echo "   sudo systemctl restart nginx — Restart Nginx"
echo ""
echo "⚠️  IMPORTANT: Make sure your MongoDB Atlas"
echo "   has this IP whitelisted: ${EC2_PUBLIC_IP}"
echo "   (or 0.0.0.0/0 to allow all IPs)"
echo "============================================"
