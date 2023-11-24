import React from 'react';
import DepositForm from '../components/DepositComponent'; // Adjust the path as needed
import Cookies from 'js-cookie';
import "../app/globals.css";
import MainMenu from '@/components/MainMenu'; // Ensure the path is correct
import withAuth from '@/components/WithAuth'; // Ensure the path is correct
const Deposit = () => {
  const userEmail = Cookies.get('userEmail') || '';

  return (
    <MainMenu> 
      <div className="flex flex-col h-screen justify-center items-center">
        <DepositForm userEmail={userEmail} />
      </div>
    </MainMenu>
  );
};

export default withAuth(Deposit);
