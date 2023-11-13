"use client";// components/AuthForm.js
// components/AuthForm.js
import React, { useState } from 'react';

const AuthForm = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        dob: '',
        phone: '',
        street: '',
        city: '',
        state: '',
        zip: '',
        country: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isLogin) {
            // post to localhost:8000/api/login with formData.email and formData.password in JSON format in ReportBody

            const response = await fetch('http://localhost:8000/api/login', {   
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: formData.email,
                    password: formData.password
                })
            });
        } else {

            const response = await fetch('http://localhost:8000/api/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    firstName: formData.firstName,
                    lastName: formData.lastName,
                    email: formData.email,
                    password: formData.password,
                    dob: formData.dob,
                    phone: formData.phone,
                    street: formData.street,
                    city: formData.city,
                    state: formData.state,
                    zip: formData.zip,
                    country: formData.country
                })
            });
        }

        response.json().then((data) => {
            console.log(data);
        });
    };

    const toggleForm = () => {
        setIsLogin(!isLogin);
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="px-8 py-6 mt-4 text-left bg-white shadow-lg">
                <h3 className="text-2xl font-bold text-center">{isLogin ? 'Login' : 'Signup'}</h3>
                <form onSubmit={handleSubmit} className="mt-4">
                    {!isLogin && (
                        <>
                            <div className="mt-4">
                                <label className="block" htmlFor="firstName">First Name</label>
                                <input type="text" placeholder="First Name" 
                                       className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                                       id="firstName" name="firstName" onChange={handleChange} />
                            </div>
                            <div className="mt-4">
                                <label className="block" htmlFor="lastName">Last Name</label>
                                <input type="text" placeholder="Last Name" 
                                       className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                                       id="lastName" name="lastName" onChange={handleChange} />
                            </div>
                            <div className="mt-4">
                                <label className="block" htmlFor="dob">Date of Birth</label>
                                <input type="date" 
                                       className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                                       id="dob" name="dob" onChange={handleChange} />
                            </div>
                            <div className="mt-4">
                                <label className="block" htmlFor="phone">Phone</label>
                                <input type="tel" placeholder="Phone Number" 
                                       className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                                       id="phone" name="phone" onChange={handleChange} />
                            </div>
                            <div className="mt-4">
                                <label className="block" htmlFor="street">Street</label>
                                <input type="text" placeholder="Street" 
                                       className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                                       id="street" name="street" onChange={handleChange} />
                            </div>
                            <div className="mt-4">
                                <label className="block" htmlFor="city">City</label>
                                <input type="text" placeholder="City" 
                                       className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                                       id="city" name="city" onChange={handleChange} />
                            </div>
                            <div className="mt-4">
                                <label className="block" htmlFor="state">State</label>
                                <input type="text" placeholder="State" 
                                       className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                                       id="state" name="state" onChange={handleChange} />
                            </div>
                            <div className="mt-4">
                                <label className="block" htmlFor="zip">Zip Code</label>
                                <input type="text" placeholder="Zip Code" 
                                       className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                                       id="zip" name="zip" onChange={handleChange} />
                            </div>
                            <div className="mt-4">
                                <label className="block" htmlFor="country">Country</label>
                                <input type="text" placeholder="Country" 
                                       className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                                       id="country" name="country" onChange={handleChange} />
                            </div>
                        </>
                    )}
                    <div className="mt-4">
                        <label className="block" htmlFor="email">Email</label>
                        <input type="email" placeholder="Email" 
                               className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                               id="email" name="email" onChange={handleChange} />
                    </div>
                    <div className="mt-4">
                        <label className="block" htmlFor="password">Password</label>
                        <input type="password" placeholder="Password" 
                               className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                               id="password" name="password" onChange={handleChange} />
                    </div>
                    <div className="flex items-center justify-between mt-4">
                        <button type="submit" className="px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-blue-700 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">
                            {isLogin ? 'Login' : 'Signup'}
                        </button>
                        <button type="button" onClick={toggleForm} className="text-sm text-blue-600 hover:underline">
                            {isLogin ? 'Create account' : 'Already have an account?'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AuthForm;
