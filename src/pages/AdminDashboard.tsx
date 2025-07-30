import { useState, useEffect } from "react";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3001";

function getToken() {
  return localStorage.getItem("admin_token");
}
function setToken(token: string) {
  localStorage.setItem("admin_token", token);
}
function removeToken() {
  localStorage.removeItem("admin_token");
}

const AdminDashboard = () => {
  // Auth state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(!!getToken());
  const [loginError, setLoginError] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);

  // Data state
  const [projects, setProjects] = useState<any[]>([]);
  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [tab, setTab] = useState<'projects' | 'messages' | 'upload'>('projects');

  // Project upload state
  const [uploadData, setUploadData] = useState({
    title: '',
    description: '',
    techStack: '',
    githubUrl: '',
    liveUrl: '',
    image: null as File | null,
  });
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const [uploadSuccess, setUploadSuccess] = useState("");

  // Login handler
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");
    try {
      const res = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Login failed");
      setToken(data.token);
      setIsLoggedIn(true);
      setEmail("");
      setPassword("");
    } catch (err: any) {
      setLoginError(err.message || "Login failed");
    }
  };

  // Registration handler
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");
    try {
      const res = await fetch(`${API_URL}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Registration failed");
      setLoginError("Registration successful! You can now login.");
      setIsRegistering(false);
      setEmail("");
      setPassword("");
    } catch (err: any) {
      setLoginError(err.message || "Registration failed");
    }
  };

  // Logout
  const handleLogout = () => {
    removeToken();
    setIsLoggedIn(false);
    setProjects([]);
    setMessages([]);
  };

  // Fetch projects/messages
  useEffect(() => {
    if (!isLoggedIn) return;
    setLoading(true);
    Promise.all([
      fetch(`${API_URL}/api/projects`).then(r => r.json()),
      fetch(`${API_URL}/api/messages`, {
        headers: { Authorization: `Bearer ${getToken()}` },
      }).then(r => r.json()),
    ])
      .then(([projects, messages]) => {
        setProjects(projects);
        setMessages(messages);
      })
      .finally(() => setLoading(false));
  }, [isLoggedIn]);

  // Project delete
  const handleDeleteProject = async (id: string) => {
    if (!window.confirm("Delete this project?")) return;
    await fetch(`${API_URL}/api/projects/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${getToken()}` },
    });
    setProjects(projects.filter(p => p._id !== id));
  };

  // Message delete
  const handleDeleteMessage = async (id: string) => {
    if (!window.confirm("Delete this message?")) return;
    await fetch(`${API_URL}/api/messages/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${getToken()}` },
    });
    setMessages(messages.filter(m => m._id !== id));
  };

  // Mark message read/unread
  const handleMarkRead = async (id: string, read: boolean) => {
    await fetch(`${API_URL}/api/messages/${id}/read`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`,
      },
      body: JSON.stringify({ read }),
    });
    setMessages(messages.map(m => m._id === id ? { ...m, read } : m));
  };

  // Project upload
  const handleUploadChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, files } = e.target as any;
    if (name === "image" && files && files[0]) {
      setUploadData(d => ({ ...d, image: files[0] }));
    } else {
      setUploadData(d => ({ ...d, [name]: value }));
    }
  };
  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    setUploadError("");
    setUploadSuccess("");
    setUploading(true);
    try {
      const form = new FormData();
      form.append("title", uploadData.title);
      form.append("description", uploadData.description);
      form.append("techStack", uploadData.techStack);
      form.append("githubUrl", uploadData.githubUrl);
      form.append("liveUrl", uploadData.liveUrl);
      if (uploadData.image) form.append("image", uploadData.image);
      const res = await fetch(`${API_URL}/api/projects`, {
        method: "POST",
        headers: { Authorization: `Bearer ${getToken()}` },
        body: form,
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Upload failed");
      setProjects([data, ...projects]);
      setUploadSuccess("Project uploaded!");
      setUploadData({ title: '', description: '', techStack: '', githubUrl: '', liveUrl: '', image: null });
    } catch (err: any) {
      setUploadError(err.message || "Upload failed");
    } finally {
      setUploading(false);
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="max-w-md mx-auto mt-20 p-6 bg-white rounded shadow">
        <h2 className="text-2xl font-bold mb-4">{isRegistering ? 'Admin Registration' : 'Admin Login'}</h2>
        <form onSubmit={isRegistering ? handleRegister : handleLogin} className="space-y-4">
          <input type="email" name="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} className="w-full border p-2 rounded" required />
          <input type="password" name="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} className="w-full border p-2 rounded" required />
          {loginError && <div className={`text-sm ${loginError.includes('successful') ? 'text-green-600' : 'text-red-600'}`}>{loginError}</div>}
          <button type="submit" className="w-full bg-brand-blue text-white py-2 rounded">
            {isRegistering ? 'Register' : 'Login'}
          </button>
        </form>
        <div className="mt-4 text-center">
          <button 
            onClick={() => {
              setIsRegistering(!isRegistering);
              setLoginError("");
              setEmail("");
              setPassword("");
            }}
            className="text-brand-blue hover:underline"
          >
            {isRegistering ? 'Already have an account? Login' : 'Need an account? Register'}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto mt-10 p-6 bg-white rounded shadow">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Admin Dashboard</h2>
        <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded">Logout</button>
      </div>
      <div className="mb-6 flex gap-4">
        <button onClick={() => setTab('projects')} className={`px-4 py-2 rounded ${tab === 'projects' ? 'bg-brand-blue text-white' : 'bg-gray-100'}`}>Projects</button>
        <button onClick={() => setTab('messages')} className={`px-4 py-2 rounded ${tab === 'messages' ? 'bg-brand-blue text-white' : 'bg-gray-100'}`}>Messages</button>
        <button onClick={() => setTab('upload')} className={`px-4 py-2 rounded ${tab === 'upload' ? 'bg-brand-blue text-white' : 'bg-gray-100'}`}>Upload Project</button>
      </div>
      {loading && <div>Loading...</div>}
      {tab === 'projects' && !loading && (
        <div>
          <h3 className="text-xl font-semibold mb-4">Projects</h3>
          <ul>
            {projects.map(p => (
              <li key={p._id} className="mb-2 flex justify-between items-center border-b pb-2">
                <div>
                  <div className="font-bold">{p.title}</div>
                  <div className="text-sm text-gray-600">{p.description}</div>
                </div>
                <button onClick={() => handleDeleteProject(p._id)} className="bg-red-500 text-white px-2 py-1 rounded">Delete</button>
              </li>
            ))}
          </ul>
        </div>
      )}
      {tab === 'messages' && !loading && (
        <div>
          <h3 className="text-xl font-semibold mb-4">Messages</h3>
          <ul>
            {messages.map(m => (
              <li key={m._id} className="mb-2 border-b pb-2">
                <div className="flex justify-between items-center">
                  <div>
                    <div className="font-bold">{m.name} ({m.email})</div>
                    <div className="text-sm text-gray-600">{m.message}</div>
                    <div className="text-xs text-gray-400">{new Date(m.createdAt).toLocaleString()}</div>
                  </div>
                  <div className="flex gap-2 items-center">
                    <button onClick={() => handleMarkRead(m._id, !m.read)} className={`px-2 py-1 rounded ${m.read ? 'bg-gray-300' : 'bg-green-500 text-white'}`}>{m.read ? 'Mark Unread' : 'Mark Read'}</button>
                    <button onClick={() => handleDeleteMessage(m._id)} className="bg-red-500 text-white px-2 py-1 rounded">Delete</button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
      {tab === 'upload' && (
        <div>
          <h3 className="text-xl font-semibold mb-4">Upload New Project</h3>
          <form onSubmit={handleUpload} className="space-y-4">
            <input type="text" name="title" placeholder="Title" value={uploadData.title} onChange={handleUploadChange} className="w-full border p-2 rounded" required />
            <textarea name="description" placeholder="Description" value={uploadData.description} onChange={handleUploadChange} className="w-full border p-2 rounded" required />
            <input type="text" name="techStack" placeholder="Tech Stack (comma separated)" value={uploadData.techStack} onChange={handleUploadChange} className="w-full border p-2 rounded" required />
            <input type="text" name="githubUrl" placeholder="GitHub URL" value={uploadData.githubUrl} onChange={handleUploadChange} className="w-full border p-2 rounded" />
            <input type="text" name="liveUrl" placeholder="Live URL" value={uploadData.liveUrl} onChange={handleUploadChange} className="w-full border p-2 rounded" />
            <input type="file" name="image" accept="image/*" onChange={handleUploadChange} className="w-full" required />
            {uploadError && <div className="text-red-600">{uploadError}</div>}
            {uploadSuccess && <div className="text-green-600">{uploadSuccess}</div>}
            <button type="submit" className="w-full bg-brand-blue text-white py-2 rounded" disabled={uploading}>{uploading ? 'Uploading...' : 'Upload'}</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard; 