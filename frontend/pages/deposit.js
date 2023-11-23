import React from 'react';
import DepositForm from '../app/DepositComponent'; // Adjust the path as needed
import Cookies from 'js-cookie';
import "../app/globals.css"


const Deposit = () => {
  const userEmail = Cookies.get('userEmail') || '';

  return (
    <div>
      <h1>Deposit Funds</h1>
      <DepositForm userEmail={userEmail} />
    </div>
  );
};

Deposit();
export default Deposit;
