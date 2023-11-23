import Head from 'next/head';
import React from 'react';
import WithdrawForm from "../app/WithdrawComponent"
import Cookies from 'js-cookie';
import "../app/globals.css"

const Withdraw = () => {
  const userEmail = Cookies.get('userEmail') || '';

  return (
    <div>
      <h1>Withdraw Funds</h1>
      <WithdrawForm userEmail={userEmail} />
    </div>
  );
};

export default Withdraw;
