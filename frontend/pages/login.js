import React, { useState } from 'react';
import AuthForm from '../components/Auth';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import "../app/globals.css";

export default function Login() {
  const [userEmail, setUserEmail] = useState('');
  const router = useRouter();

  const handleAuthentication = (status, email) => {
    if (status) {
      setUserEmail(email);
      Cookies.set('auth', 'true', { expires: 1 / 144 }); // Expires in 10 minutes
      Cookies.set('userEmail', email, { expires: 1 / 144 }); // Store email in cookie
      router.push('/');
    }
  };

  return (
    <div className="items-center justify-center">
      <AuthForm onAuthenticate={handleAuthentication} />
    </div>
  );
}
