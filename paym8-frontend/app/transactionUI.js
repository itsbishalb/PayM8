"use client";// components/AuthForm.js

import Image from 'next/image';
import transactionsData from './transactions.json';

const TransactionItem = ({ transaction }) => {
  const amountStyle = transaction.type === 'sent' ? 'text-red-500' : 'text-green-500';
  const sign = transaction.type === 'sent' ? '-' : '+';

  return (
    <div className="mb-4">
      <div className="rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30">
        <h2 className={`mb-3 text-2xl font-semibold ${amountStyle}`}>{sign}${transaction.amount}</h2>
        <p className="text-gray-700 mb-2">
          {transaction.type === 'sent' ? `Receiver: ${transaction.receiver}` : `Sender: ${transaction.sender}`} | Amount: ${transaction.amount} | Date: {transaction.date} | Status: {transaction.status}
        </p>
      </div>
    </div>
  );
};

export default function TransactionHistory() {
  return (
    <main className="flex min-h-screen items-center justify-center p-24">
      {/* Logo section */}
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

      {/* Transaction history section */}
      <div className="text-center">
        <div>
          <h2 className={`mb-6 text-2xl font-semibold`}>Transaction History</h2>
          {transactionsData.transactions.map((transaction) => (
            <TransactionItem key={transaction.id} transaction={transaction} />
          ))}
        </div>
      </div>
    </main>
  );
}
