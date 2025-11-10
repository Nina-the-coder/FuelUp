// /FuelUp/frontend/src/pages/ProfilePage.jsx (Example)
import React, { useState, useEffect } from 'react';
import { fetchProtectedData } from '../utils/api'; // Import your new function

const ProfilePage = () => {
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadProfile = async () => {
            try {
                // Call the utility function with your protected endpoint
                const data = await fetchProtectedData('/api/user/profile');
                setUserData(data);
            } catch (err) {
                // Handle 401 redirection or other errors
                setError("Failed to load profile. Please log in again."); 
            } finally {
                setLoading(false);
            }
        };

        loadProfile();
    }, []);

    if (loading) return <div>Loading Profile...</div>;
    if (error) return <div className="text-red-500">{error}</div>;

    return (
        <div>
            <h2>Welcome back, {userData.name}!</h2>
            <p>Your email: {userData.email}</p>
            {/* Display other user data */}
        </div>
    );
};

export default ProfilePage;