import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import iceCreamIcon from '../assets/logo.png';
import './ProfilePage.css';

const ProfilePage = () => {
    const [user, setUser] = useState(null);
    const [addresses, setAddresses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [editing, setEditing] = useState(false);
    const [editForm, setEditForm] = useState({ name: '', email: '' });
    const navigate = useNavigate();

    // Fetch user profile and addresses on mount
    useEffect(() => {
        const fetchProfile = async () => {
            try {
                setLoading(true);
                setError(null);
                const token = localStorage.getItem('token');
                if (!token) {
                    setError('No authentication token found. Please log in.');
                    navigate('/login');
                    return;
                }

                // Fetch user profile - Use /profile endpoint
                const userResponse = await fetch('https://frozenfeast.onrender.com/api/v1/user/profile', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                    credentials: 'include',
                });

                if (!userResponse.ok) {
                    if (userResponse.status === 401) {
                        localStorage.removeItem('token'); // Clear invalid token
                        throw new Error('Session expired. Please log in again.');
                    } else if (userResponse.status === 404) {
                        throw new Error('Profile endpoint not found. Ensure backend has /api/v1/user/profile route.');
                    } else {
                        throw new Error(`HTTP error! Status: ${userResponse.status}`);
                    }
                }

                const userData = await userResponse.json();
                if (userData.success) {
                    const userInfo = userData.user || userData.data || userData;
                    setUser(userInfo);
                    setEditForm({ name: userInfo.name || '', email: userInfo.email || '' });
                } else {
                    throw new Error(userData.message || 'Failed to fetch user profile');
                }

                // Fetch addresses (optional - skip if endpoint issues)
                try {
                    const addressResponse = await fetch('https://frozenfeast.onrender.com/api/v1/deliveries', {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`,
                        },
                        credentials: 'include',
                    });

                    if (addressResponse.ok) {
                        const addressData = await addressResponse.json();
                        if (addressData.success) {
                            setAddresses(addressData.deliveries || []);
                        }
                    }
                } catch (addrErr) {
                    console.warn('Addresses fetch failed (non-critical):', addrErr);
                    // Don't set error for addresses - keep profile functional
                }
            } catch (err) {
                console.error('Profile fetch error:', err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, [navigate]);

    const handleEdit = () => {
        if (user) {
            setEditForm({ name: user.name || '', email: user.email || '' });
        }
        setEditing(true);
    };

    const handleSave = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) throw new Error('No token found');

            const response = await fetch('https://frozenfeast.onrender.com/api/v1/user/profile', { // ✅ Match GET endpoint
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(editForm),
                credentials: 'include',
            });

            if (!response.ok) {
                throw new Error(`Update failed: ${response.status}`);
            }

            const updatedData = await response.json();
            const updatedUser = updatedData.user || updatedData.data || updatedData;
            setUser(updatedUser);
            setEditing(false);
            alert('Profile updated successfully!');
        } catch (err) {
            console.error('Update error:', err);
            alert(`Error: ${err.message}`);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        navigate('/');
    };

    if (loading) {
        return (
            <div className="profile-loading">
                <img src={iceCreamIcon} alt="Loading..." className="logo" />
                <p>Loading your profile...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="profile-error">
                <h2>{error}</h2>
                <p>Check the browser console (F12) for more details.</p>
                <button onClick={() => navigate('/login')}>Go to Login</button>
                <button onClick={() => window.location.reload()}>Retry</button>
            </div>
        );
    }

    if (!user) {
        return (
            <div className="profile-error">
                <h2>No profile data found</h2>
                <button onClick={() => navigate('/login')}>Go to Login</button>
            </div>
        );
    }

    return (
        <div className="profile-container">
            <div className="profile-header">
                <img src={iceCreamIcon} alt="FrozenFeast" className="logo" />
                <h1>My Profile</h1>
            </div>

            <div className="profile-content">
                <div className="profile-section">
                    <h2>Personal Information</h2>
                    {editing ? (
                        <div className="edit-form">
                            <input
                                type="text"
                                placeholder="Full Name"
                                value={editForm.name}
                                onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                            />
                            <input
                                type="email"
                                placeholder="Email"
                                value={editForm.email}
                                onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                            />
                            <div className="edit-buttons">
                                <button onClick={handleSave}>Save Changes</button>
                                <button onClick={() => setEditing(false)}>Cancel</button>
                            </div>
                        </div>
                    ) : (
                        <div className="profile-info">
                            <p><strong>Name:</strong> {user.name || 'N/A'}</p>
                            <p><strong>Email:</strong> {user.email || 'N/A'}</p>
                            {user.phone && <p><strong>Phone:</strong> {user.phone}</p>}
                            <p><strong>Role:</strong> {user.role || 'Customer'}</p>
                            <button onClick={handleEdit} className="edit-btn">Edit Profile</button>
                        </div>
                    )}
                </div>

                {addresses.length > 0 && (
                    <div className="profile-section">
                        <h2>Saved Addresses ({addresses.length})</h2>
                        <div className="addresses-list">
                            {addresses.map((address, index) => (
                                <div key={address._id || index} className="address-item">
                                    <p>{address.streetAdd}, {address.city}, {address.district}, {address.pin}</p>
                                    {address.phone && <p className="address-phone">Phone: {address.phone}</p>}
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                <div className="profile-section">
                    <h2>Account Actions</h2>
                    <button onClick={handleLogout} className="logout-btn">Logout</button>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;