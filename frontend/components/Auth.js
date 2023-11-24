"use client";
import React, { useState } from 'react';
import axios from 'axios';
const apiUrl = process.env.NEXT_PUBLIC_API_URL
const AuthForm = (props) => {
    const onAuthenticate = props.onAuthenticate;
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
        try {
            let response;
            if (isLogin) {
                // Login request
                response = await axios.post(apiUrl + '/api/login', {
                    email: formData.email,
                    password: formData.password
                });

             
   
            } else {
                // Signup request
                response = await axios.post(apiUrl + '/api/signup', {
                    firstName: formData.firstName,
                    lastName: formData.lastName,
                    email: formData.email,
                    password: formData.password,
                    dob: formData.dob,
                    phone: formData.phone,
                    address: {
                        street: formData.street,
                        city: formData.city,
                        state: formData.state,
                        zip: formData.zip,
                        country: formData.country
                    }
                });
            }

            // Handle response here
            // For example, you might want to store the received token or user data
            console.log(response.data);
            onAuthenticate(true, formData.email);

            // You might also want to redirect the user or update the UI in some way

        } catch (error) {
            // Handle errors here
            // For example, you might want to show an error message to the user
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.error('Error data:', error.response.data);
                console.error('Error status:', error.response.status);
                console.error('Error headers:', error.response.headers);
            } else if (error.request) {
                // The request was made but no response was received
                console.error('Error request:', error.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                console.error('Error message:', error.message);
            }
            console.error('Error config:', error.config);
        }
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
                            <div className="mb-6">
                                <label htmlFor="firstName" className="block mb-2 text-sm font-medium text-gray-900">First Name</label>
                                <input type="text" id="firstName" name="firstName" onChange={handleChange}
                                    className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600 text-gray-900"
                                    required />
                            </div>
                            <div className="mb-6">
                                <label htmlFor="lastName" className="block mb-2 text-sm font-medium text-gray-900">Last Name</label>
                                <input type="text" id="lastName" name="lastName" onChange={handleChange}
                                    className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600 text-gray-900"
                                    required />
                            </div>
                            <div className="mb-6">
                                <label htmlFor="dob" className="block mb-2 text-sm font-medium text-gray-900">Date of Birth</label>
                                <input type="date" id="dob" name="dob" onChange={handleChange}
                                    className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600 text-gray-900"
                                    required />
                            </div>
                            <div className="mb-6">
                                <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900">Phone Number</label>
                                <input type="tel" id="phone" name="phone" onChange={handleChange}
                                    className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600 text-gray-900"
                                    required />
                            </div>
                            <div className="mb-6">
                                <label htmlFor="street" className="block mb-2 text-sm font-medium text-gray-900">Street</label>
                                <input type="text" id="street" name="street" onChange={handleChange}
                                    className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600 text-gray-900"
                                    required />
                            </div>
                            <div className="mb-6">
                                <label htmlFor="city" className="block mb-2 text-sm font-medium text-gray-900">City</label>
                                <input type="text" id="city" name="city" onChange={handleChange}
                                    className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600 text-gray-900"
                                    required />
                            </div>
                            <div className="mb-6">
                                <label htmlFor="state" className="block mb-2 text-sm font-medium text-gray-900">State</label>
                                <input type="text" id="state" name="state" onChange={handleChange}
                                    className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600 text-gray-900"
                                    required />
                            </div>
                            <div className="mb-6">
                                <label htmlFor="zip" className="block mb-2 text-sm font-medium text-gray-900">Zip Code</label>
                                <input type="text" id="zip" name="zip" onChange={handleChange}
                                    className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600 text-gray-900"
                                    required />
                            </div>
                            <div className="mb-6">
                                <label htmlFor="country" className="block mb-2 text-sm font-medium text-gray-900">Country</label>
                                <input type="text" id="country" name="country" onChange={handleChange}
                                    className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600 text-gray-900"
                                    required />
                            </div>
                        </>
                    )}
                    <div className="mb-6">
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">Email</label>
                        <input type="email" id="email" name="email" onChange={handleChange}
                            className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600 text-gray-900"
                            required />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">Password</label>
                        <input type="password" id="password" name="password" onChange={handleChange}
                            className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600 text-gray-900"
                            required />
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
