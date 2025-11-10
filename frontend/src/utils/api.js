// /FuelUp/frontend/src/utils/api.js (New File)

const BASE_URL = 'http://localhost:8080';

export async function fetchProtectedData(endpoint) {
    // 1. Retrieve the saved token
    const token = localStorage.getItem('jwtToken'); 

    if (!token) {
        console.error("Authentication required. No token found.");
        // You might want to redirect the user to the login page here
        throw new Error("Unauthorized"); 
    }

    try {
        const response = await fetch(`${BASE_URL}${endpoint}`, {
            method: 'GET', // Or 'POST', 'PUT', etc.
            headers: {
                'Content-Type': 'application/json',
                // 2. The CRITICAL STEP: Attach the token to the Authorization header
                'Authorization': `Bearer ${token}`, 
            },
        });

        // 3. Handle token validation/expiration failure (HTTP 401)
        if (response.status === 401) {
             console.error("Token is invalid or expired. Redirecting to login.");
             localStorage.removeItem('jwtToken'); // Clear the bad token
             // Redirect logic goes here (e.g., window.location.href = '/login';)
             throw new Error("Token Expired or Invalid");
        }
        
        const data = await response.json();
        
        if (!response.ok) {
            throw new Error(data.message || `API call failed with status ${response.status}`);
        }

        return data; // The protected data from the backend

    } catch (error) {
        console.error("Error fetching protected data:", error);
        throw error;
    }
}