
import React from 'react';
import SendMoneyForm from '@/components/SendComponent';
import "../app/globals.css"
import MainMenu from '@/components/MainMenu';
import withAuth from '@/components/WithAuth';

const Send = () => {
  return (
    <MainMenu>
        <div className="flex flex-col h-screen justify-center items-center">
        <SendMoneyForm />
        </div>
    </MainMenu>
  );
};

export default withAuth(Send);
