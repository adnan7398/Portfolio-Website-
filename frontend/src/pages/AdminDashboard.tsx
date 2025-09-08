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
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(!!getToken());
  const [loginError, setLoginError] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);
  const [projects, setProjects] = useState<any[]>([]);
  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [tab, setTab] = useState<'projects' | 'messages' | 'upload' | 'profile'>('projects');
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

  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [profileUploading, setProfileUploading] = useState(false);
  const [profileError, setProfileError] = useState("");
  const [profileSuccess, setProfileSuccess] = useState("");

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

  const handleLogout = () => {
    removeToken();
    setIsLoggedIn(false);
    setProjects([]);
    setMessages([]);
  };

  useEffect(() => {
    if (!isLoggedIn) return;
    setLoading(true);
    Promise.all([
      fetch(`${API_URL}/api/projects`).then(r => r.json()),
      fetch(`${API_URL}/api/messages`, {
        headers: { Authorization: `Bearer ${getToken()}` },
      }).then(r => r.json()),
    ])
      .then(([projectsData, messagesData]) => {
        setProjects(projectsData);
        setMessages(messagesData);
      })
      .catch(err => console.error("Error fetching data:", err))
      .finally(() => setLoading(false));
  }, [isLoggedIn]);

  const handleDeleteProject = async (id: string) => {
    try {
      await fetch(`${API_URL}/api/projects/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      setProjects(projects.filter(p => p._id !== id));
    } catch (err) {
      console.error("Error deleting project:", err);
    }
  };


  const handleDeleteMessage = async (id: string) => {
    try {
      await fetch(`${API_URL}/api/messages/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      setMessages(messages.filter(m => m._id !== id));
    } catch (err) {
      console.error("Error deleting message:", err);
    }
  };

  // Mark message as read/unread
  const handleMarkRead = async (id: string, read: boolean) => {
    try {
      await fetch(`${API_URL}/api/messages/${id}/read`, {
        method: "PATCH",
        headers: { 
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken()}` 
        },
        body: JSON.stringify({ read }),
      });
      setMessages(messages.map(m => 
        m._id === id ? { ...m, read } : m
      ));
    } catch (err) {
      console.error("Error updating message:", err);
    }
  };

  // Handle upload form changes
  const handleUploadChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    if (type === 'file') {
      const file = (e.target as HTMLInputElement).files?.[0];
      setUploadData(prev => ({ ...prev, image: file || null }));
    } else {
      setUploadData(prev => ({ ...prev, [name]: value }));
    }
  };

  // Handle project upload
  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    setUploading(true);
    setUploadError("");
    setUploadSuccess("");

    try {
      const formData = new FormData();
      formData.append("title", uploadData.title);
      formData.append("description", uploadData.description);
      formData.append("techStack", uploadData.techStack);
      formData.append("githubUrl", uploadData.githubUrl);
      formData.append("liveUrl", uploadData.liveUrl);
      if (uploadData.image) {
        formData.append("image", uploadData.image);
      }

      const res = await fetch(`${API_URL}/api/projects`, {
        method: "POST",
        headers: { Authorization: `Bearer ${getToken()}` },
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Upload failed");

      setUploadSuccess("Project uploaded successfully!");
      setUploadData({
        title: '',
        description: '',
        techStack: '',
        githubUrl: '',
        liveUrl: '',
        image: null,
      });
      
      // Refresh projects list
      const projectsRes = await fetch(`${API_URL}/api/projects`);
      const projectsData = await projectsRes.json();
      setProjects(projectsData);
    } catch (err: any) {
      setUploadError(err.message || "Upload failed");
    } finally {
      setUploading(false);
    }
  };

  // Handle profile image upload
  const handleProfileUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!profileImage) {
      setProfileError("Please select an image");
      return;
    }

    setProfileUploading(true);
    setProfileError("");
    setProfileSuccess("");

    try {
      const formData = new FormData();
      formData.append("profileImage", profileImage);

      const res = await fetch(`${API_URL}/api/profile/upload`, {
        method: "POST",
        headers: { Authorization: `Bearer ${getToken()}` },
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Upload failed");

      setProfileSuccess("Profile image uploaded successfully!");
      setProfileImage(null);
    } catch (err: any) {
      setProfileError(err.message || "Upload failed");
    } finally {
      setProfileUploading(false);
    }
  };

  // Handle profile image change
  const handleProfileImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setProfileImage(file || null);
  };

  if (!isLoggedIn) {
    return (
      <div className="max-w-md mx-auto mt-20 p-6 bg-white rounded shadow">
        <h2 className="text-2xl font-bold mb-4">{isRegistering? 'Admin Registration' : 'Admin Login'}</h2>
        <form onSubmit={isRegistering ? handleRegister : handleLogin} className="space-y-4">
          <input type="email" name="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} className="w-full border p-2 rounded" required />
          <input type="password" name="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} className="w-full border p-2 rounded" required />
          {loginError && <div className={`text-sm ${loginError.includes('successful') ? 'text-green-600' : 'text-red-600'}`}>{loginError}</div>}
          <button type="submit" className="w-full bg-brand-blue text-white py-2 rounded">
            {isRegistering ==false? 'Register' : 'Login'}
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
        <button onClick={() => setTab('profile')} className={`px-4 py-2 rounded ${tab === 'profile' ? 'bg-brand-blue text-white' : 'bg-gray-100'}`}>Profile Image</button>
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
      {tab === 'profile' && (
        <div>
          <h3 className="text-xl font-semibold mb-4">Upload Profile Image</h3>
          <form onSubmit={handleProfileUpload} className="space-y-4">
            <input 
              type="file" 
              accept="image/*" 
              onChange={handleProfileImageChange} 
              className="w-full" 
              required 
            />
            {profileError && <div className="text-red-600">{profileError}</div>}
            {profileSuccess && <div className="text-green-600">{profileSuccess}</div>}
            <button 
              type="submit" 
              className="w-full bg-brand-blue text-white py-2 rounded" 
              disabled={profileUploading}
            >
              {profileUploading ? 'Uploading...' : 'Upload Profile Image'}
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard; 