"use client";
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import AuthForm from './Auth';
import WithdrawForm from './withdraw'; // Import the WithdrawForm component
import DepositForm from './deposit'; // Import the DepositForm component
import Cookies from 'js-cookie';

export default function Login() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [selectedOption, setSelectedOption] = useState(null);

  useEffect(() => {
    // Check if the user is authenticated
    const authCookie = Cookies.get('auth');
    if (authCookie) {
      setIsAuthenticated(true);
      // Optionally, retrieve the user's email from the cookie or local storage
      const email = Cookies.get('userEmail');
      if (email) {
        setUserEmail(email);
      }
      // Set a timeout to automatically log out after 10 minutes
      setTimeout(() => {
        Cookies.remove('auth');
        setIsAuthenticated(false);
      }, 600000); // 10 minutes in milliseconds
    }
  }, []);

  const handleAuthentication = (status, email) => {
    setIsAuthenticated(status);
    if (status) {
      setUserEmail(email);
      Cookies.set('auth', 'true', { expires: 1 / 144 }); // Expires in 10 minutes
      Cookies.set('userEmail', email, { expires: 1 / 144 }); // Store email in cookie
    } else {
      Cookies.remove('auth');
      Cookies.remove('userEmail');
      setUserEmail('');
    }
  };

  const handleOptionClick = (option) => {
    setSelectedOption(option);
  };

  return (
    <div>
      {/* Top Menu */}
      <nav className="bg-blue-500 p-4">
        <ul className="flex space-x-4">
          <li>
            <a href="#" onClick={() => handleOptionClick("withdraw")}>Option 1</a>
          </li>
          <li>
            <a href="#" onClick={() => handleOptionClick("deposit")}>Option 2</a>
          </li>
          <li>
            <a href="#">Option 3</a>
          </li>
        </ul>
      </nav>

      <main className="flex min-h-screen items-center justify-center p-24">
        {/* Next.js logo section */}
        <div className="relative flex place-items-center mb-8">
          <Image
            className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
            src="/paylogo.png"
            alt="Next.js Logo"
            width={180}
            height={37}
            priority
          />
        </div>

        {!isAuthenticated && <AuthForm onAuthenticate={handleAuthentication} />}
        {isAuthenticated && selectedOption === "withdraw" && <WithdrawForm userEmail={userEmail} />}
        {isAuthenticated && selectedOption === "deposit" && <DepositForm userEmail={userEmail} />}
      </main>
    </div>
  );
}
