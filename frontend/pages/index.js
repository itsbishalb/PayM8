"use client";
import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import MainMenu from '../components/MainMenu'; // Adjust the path as needed
import Transactions from '../components/transactionUI'; // Adjust the path as needed
import axios from 'axios'; // Import Axios for API requests
const apiUrl = process.env.NEXT_PUBLIC_API_URL

import "../app/globals.css";

export default function Home() {
  const router = useRouter();
  const [userInfo, setUserInfo] = useState(null); // State to store user info

  useEffect(() => {
    const isAuthenticated = Cookies.get('auth') === 'true';
    if (!isAuthenticated) {
      router.push('/login'); // Redirect to login if not authenticated
    } else {
      // Fetch user information when authenticated
      fetchUserInfo();
    }
  }, [router]);
  
  // Function to fetch user information
  const fetchUserInfo = async () => {
    try {
      const userEmail = Cookies.get('userEmail') || '';
  
      const response = await axios.get(apiUrl + `/api/user/${userEmail}`);
      
      setUserInfo(response.data); // Set the user information from the response
    } catch (error) {
      console.error('Error fetching user info:', error);
    }
  };

  // Function to handle logout
  const handleLogout = () => {
    Cookies.remove('auth'); // Remove the authentication cookie
    router.push('/login'); // Redirect to login page
  };

  return (
    <div>
      {userInfo && (
        <div className="bg-teal-600 text-white p-4">
          <div className="container mx-auto flex justify-between items-center">
            <div>
              Welcome, {userInfo.firstName} {userInfo.lastName} | Balance: ${userInfo.balance}
            </div>
            <button
              onClick={handleLogout}
              className="text-white bg-primary-50 hover:bg-primary-100 px-3 py-1 rounded-md"
            >
              Logout
            </button>
          </div>
        </div>
      )}
      <MainMenu>
        <Transactions />
      </MainMenu>
    </div>
  );
}
