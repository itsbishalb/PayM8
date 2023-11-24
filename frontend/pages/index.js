"use client";
import React, { useEffect } from 'react';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import MainMenu from '../components/MainMenu'; // Adjust the path as needed
import Transactions from '../components/transactionUI'; // Adjust the path as needed

import "../app/globals.css";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const isAuthenticated = Cookies.get('auth') === 'true';
    if (!isAuthenticated) {
      router.push('/login'); // Redirect to login if not authenticated
    }
  }, [router]);

  return (
    <div>
      <MainMenu>
        <Transactions />
      </MainMenu>
    </div>
  );
}
