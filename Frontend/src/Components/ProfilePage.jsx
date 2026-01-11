import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // For logout/navigation
import './ProfilePage.css'; // Import CSS for styling

const ProfileSettings = () => {
    const [user, setUser] = useState({
        name: "Your Name",
        email: "yourname@gmail.com",
        phone: "", // Empty initially (e.g., "Add number")
        role: "",
        theme: "light",
        language: "Eng",
        avatar: "https://via.placeholder.com/80x80?text=User", // Placeholder avatar
        notificationsAllowed: false, // Toggle for notifications
    });
    const [editing, setEditing] = useState(false); // Toggle edit mode for main panel
    const [loading, setLoading] = useState(false);
    const [showSettingsModal, setShowSettingsModal] = useState(false); // For settings dropdown
    const navigate = useNavigate();

    // Fetch user data on mount (replace with real API call)
    useEffect(() => {
        const fetchUser = async () => {
            try {
                setLoading(true);
                const token = localStorage.getItem('token');
                if (token) {
                    const response = await fetch('http://localhost:4000/api/v1/profile', { // Assume endpoint for user profile
                        headers: { 'Authorization': `Bearer ${token}` },
                    });
                    const data = await response.json();
                    if (data.success) {
                        setUser(prev => ({ ...prev, ...data.user })); // Update with fetched data
                    }
                }
            } catch (error) {
                console.error("Error fetching user:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchUser();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUser(prev => ({ ...prev, [name]: value }));
    };

    const handleSaveChanges = async () => {
        setLoading(true);
        try {
            const token = localStorage.getItem('token');
            const response = await fetch('http://localhost:4000/api/v1/update-profile', { // Assume update endpoint
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(user),
            });

            const data = await response.json();
            if (data.success) {
                setEditing(false);
                alert("Changes saved successfully!"); // Or use toast/popup
            } else {
                throw new Error(data.message || 'Update failed');
            }
        } catch (error) {
            console.error("Update error:", error);
            alert(`Error: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    const toggleNotifications = () => {
        setUser(prev => ({ ...prev, notificationsAllowed: !prev.notificationsAllowed }));
    };

    return (
        <div className="profile-container">
            {/* Left Sidebar */}
            <div className="sidebar">
                <div className="user-header">
                    <img src={user.avatar} alt="User Avatar" className="avatar" />
                    <div className="user-info">
                        <h3>{user.name}</h3>
                        <p>{user.email}</p>
                    </div>
                </div>

                <nav className="nav-items">
                    <button className="nav-item active" onClick={() => {}}>
                        <span className="nav-icon">👤</span>
                        My Profile
                        <span className="nav-arrow">›</span>
                    </button>
                    <button className="nav-item" onClick={() => setShowSettingsModal(true)}>
                        <span className="nav-icon">⚙️</span>
                        Settings
                        <span className="nav-arrow">›</span>
                    </button>
                    <button className="nav-item" onClick={toggleNotifications}>
                        <span className="nav-icon">🔔</span>
                        Notification
                        <span className={`toggle ${user.notificationsAllowed ? 'active' : ''}`}>
                            Allow
                        </span>
                    </button>
                    <button className="nav-item logout" onClick={handleLogout}>
                        <span className="nav-icon">↩️</span>
                        Log out
                    </button>
                </nav>
            </div>

            {/* Right Main Panel */}
            <div className="main-panel">
                <div className="panel-header">
                    <h2>Your Name</h2>
                    <button className="close-btn" onClick={() => navigate('/dashboard')}>×</button>
                </div>

                <div className="profile-details">
                    <div className="detail-item">
                        <label>Name</label>
                        <input
                            type="text"
                            value={user.name}
                            onChange={handleInputChange}
                            name="name"
                            disabled={!editing}
                            placeholder="Your name"
                        />
                    </div>

                    <div className="detail-item">
                        <label>Email account</label>
                        <input
                            type="email"
                            value={user.email}
                            onChange={handleInputChange}
                            name="email"
                            disabled={!editing}
                            placeholder="yourname@gmail.com"
                        />
                    </div>

                    <div className="detail-item">
                        <label>Mobile number</label>
                        <input
                            type="tel"
                            value={user.phone}
                            onChange={handleInputChange}
                            name="phone"
                            disabled={!editing}
                            placeholder="Add number"
                        />
                    </div>

                    <div className="detail-item">
                        <label>Location</label>
                        <select
                            value={user.location}
                            onChange={handleInputChange}
                            name="location"
                            disabled={!editing}
                        >
                            <option value="USA">USA</option>
                            <option value="India">India</option>
                            <option value="UK">UK</option>
                            {/* Add more locations */}
                        </select>
                    </div>
                </div>

                <button 
                    className="save-btn" 
                    onClick={handleSaveChanges} 
                    disabled={!editing || loading}
                >
                    {loading ? "Saving..." : "Save Changes"}
                </button>
            </div>

            {/* Settings Modal (Bottom Sheet) */}
            {showSettingsModal && (
                <div className="settings-modal">
                    <div className="modal-header">
                        <h3>Settings</h3>
                        <button className="close-btn" onClick={() => setShowSettingsModal(false)}>×</button>
                    </div>
                    <div className="modal-content">
                        <div className="setting-item">
                            <label>Theme</label>
                            <select
                                value={user.theme}
                                onChange={handleInputChange}
                                name="theme"
                            >
                                <option value="light">Light</option>
                                <option value="dark">Dark</option>
                            </select>
                        </div>
                        <div className="setting-item">
                            <label>Language</label>
                            <select
                                value={user.language}
                                onChange={handleInputChange}
                                name="language"
                            >
                                <option value="Eng">Eng</option>
                                <option value="Esp">Esp</option>
                                <option value="Fr">Fr</option>
                            </select>
                        </div>
                    </div>
                    <button className="save-btn" onClick={() => setShowSettingsModal(false)}>
                        Save Changes
                    </button>
                </div>
            )}
        </div>
    );
};

export default ProfileSettings;