import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LoginForm: React.FC = () => {
    const navigate = useNavigate();

    const handleLogin = async (e: any) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        const username = formData.get("username") as string;
        const password = formData.get("password") as string;
        

        try {
            const response = await axios.post("/api/auth/login/", {
                username,
                password,
            });

            console.log(response.data)


            navigate("/");
        } catch (error:any) {
            console.log(error);
        }
    };

    return (
        <div className="max-w-md mx-auto my-10 p-6 bg-white shadow-md rounded-md">
            <h1 className="text-2xl font-semibold mb-4">Login</h1>
            <form onSubmit={handleLogin}>
                
                <div className="mb-4">
                    <label
                        htmlFor="username"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Username
                    </label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        className="mt-1 p-2 w-full border rounded-md"
                        required
                    />
                </div>
                <div className="mb-6">
                    <label
                        htmlFor="password"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Password
                    </label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        className="mt-1 p-2 w-full border rounded-md"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
                >
                    Login
                </button>
            </form>
        </div>
    );
};

export default LoginForm;
