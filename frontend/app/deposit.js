"use client";
import React, { useState } from 'react';
import axios from 'axios'; // Ensure Axios is installed

export default function DepositForm(props) {
    const email = props.userEmail;
    const [amount, setAmount] = useState('');
    const [depositMethod, setDepositMethod] = useState('paypal');
    const [paypalAccount, setPaypalAccount] = useState('');
    const [bankAccountHolder, setBankAccountHolder] = useState('');
    const [bankAccountNumber, setBankAccountNumber] = useState('');
    const [sortCode, setSortCode] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Fake bank check (for demonstration purposes)
        if (depositMethod === 'bank' && !fakeBankCheck(bankAccountNumber, sortCode)) {
            alert('Invalid bank details');
            return;
        }

        const depositDetails = {
            email: email, // Default email
            amount,
            method: depositMethod,
            paypalAccount: depositMethod === 'paypal' ? paypalAccount : null,
            bankDetails: depositMethod === 'bank' ? { bankAccountHolder, bankAccountNumber, sortCode } : null,
        };

        try {
            const response = await axios.post('http://localhost:8000/api/deposit', depositDetails);
            console.log('Deposit successful:', response.data);
            // Reset the form
            setAmount('');
            setPaypalAccount('');
            setBankAccountHolder('');
            setBankAccountNumber('');
            setSortCode('');
        } catch (error) {
            console.error('Error during deposit:', error);
            alert('Deposit failed');
        }
    };

    const fakeBankCheck = (accountNumber, sortCode) => {
        return accountNumber.length === 8 && sortCode.length === 6;
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-sm mx-auto my-8">
            {/* Amount input */}
            <div className="mb-6">
                <label htmlFor="amount" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                    Deposit Amount
                </label>
                <input
                    type="number"
                    id="amount"
                    name="amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    placeholder="0.00"
                    required
                />
            </div>

            {/* Deposit method selection */}
            <div className="mb-6">
                <span className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Deposit to:</span>
                <div className="flex items-center mb-4">
                    <input
                        id="paypal"
                        type="radio"
                        name="depositMethod"
                        value="paypal"
                        checked={depositMethod === 'paypal'}
                        onChange={() => setDepositMethod('paypal')}
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600"
                    />
                    <label htmlFor="paypal" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                        PayPal
                    </label>
                </div>
                <div className="flex items-center mb-4">
                    <input
                        id="bank"
                        type="radio"
                        name="depositMethod"
                        value="bank"
                        checked={depositMethod === 'bank'}
                        onChange={() => setDepositMethod('bank')}
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600"
                    />
                    <label htmlFor="bank" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                        Bank Account
                    </label>
                </div>
            </div>

            {/* PayPal account input */}
            {depositMethod === 'paypal' && (
                <div className="mb-6">
                    <label htmlFor="paypalAccount" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                        PayPal Account
                    </label>
                    <input
                        type="email"
                        id="paypalAccount"
                        name="paypalAccount"
                        value={paypalAccount}
                        onChange={(e) => setPaypalAccount(e.target.value)}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        placeholder="email@example.com"
                        required={depositMethod === 'paypal'}
                    />
                </div>
            )}

            {/* Bank account inputs */}
            {depositMethod === 'bank' && (
                <div>
                    <div className="mb-6">
                        <label htmlFor="bankAccountHolder" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                            Account Holder Name
                        </label>
                        <input
                            type="text"
                            id="bankAccountHolder"
                            name="bankAccountHolder"
                            value={bankAccountHolder}
                            onChange={(e) => setBankAccountHolder(e.target.value)}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            required={depositMethod === 'bank'}
                        />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="bankAccountNumber" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                            Account Number
                        </label>
                        <input
                            type="text"
                            id="bankAccountNumber"
                            name="bankAccountNumber"
                            value={bankAccountNumber}
                            onChange={(e) => setBankAccountNumber(e.target.value)}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            required={depositMethod === 'bank'}
                        />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="sortCode" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                            Sort Code
                        </label>
                        <input
                            type="text"
                            id="sortCode"
                            name="sortCode"
                            value={sortCode}
                            onChange={(e) => setSortCode(e.target.value)}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            required={depositMethod === 'bank'}
                        />
                    </div>
                </div>
            )}

            {/* Submit button */}
            <button
                type="submit"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
            >
                Deposit
            </button>
        </form>
    );
}
