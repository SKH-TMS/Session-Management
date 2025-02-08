'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Profile() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userName, setUserName] = useState('');
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch('/api/auth/token', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        const data = await response.json();

        if (data.success) {
          setIsAuthenticated(true);
          setUserName(data.user.email);
        } else {
          setIsAuthenticated(false);
          setErrorMessage(data.message || 'Invalid token');
          console.log("is authenticated=",isAuthenticated);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        setErrorMessage('Failed to fetch user data. Please try again later.');
      }
      setLoading(false);
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push('/Login');
    }
  }, [isAuthenticated, loading, router]);

  // Log out the user
  // Example logout button handler in your Profile page
const handleLogout = async () => {
  try {
    const response = await fetch('/api/auth/logout', {
      method: 'GET',
    });
    const data = await response.json();
    if (data.success) {
      console.log('Logged out successfully');
      // Redirect to login or home page
      router.push('/Login');
    } else {
      console.error('Error logging out:', data.message);
    }
  } catch (error) {
    console.error('Error:', error);
  }
};

  

  if (loading) {
    return <div>Loading...</div>;
  }

  if (errorMessage) {
    return (
      <div>
        <h2>Error: {errorMessage}</h2>
        <p>Please log in again.</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div>
        <h2>No user credentials found</h2>
        <p>Please log in to view your profile.</p>
      </div>
    );
  }

  return (
    <div>
      <h2>Welcome, {userName}!</h2>
      <p>Your profile information goes here.</p>

      {/* Log Out Button */}
      <button onClick={handleLogout} style={{ padding: '10px', backgroundColor: 'red', color: 'white' }}>
        Log Out
      </button>
    </div>
  );
}
