
import React from 'react';
import WithdrawForm from "../components/WithdrawComponent"
import Cookies from 'js-cookie';
import "../app/globals.css"
import MainMenu from '@/components/MainMenu';
import withAuth from '@/components/WithAuth';

const Withdraw = () => {
  const userEmail = Cookies.get('userEmail') || '';

  return (
    <MainMenu>
      <div className="flex flex-col h-screen justify-center items-center">
      <WithdrawForm userEmail={userEmail} />
     </div>
    </MainMenu>
  );
};

export default withAuth(Withdraw);
