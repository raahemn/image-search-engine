import React from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signup = () => {
    const navigate = useNavigate();

    const handleSignup = async (e: any) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        const name = formData.get("fullname") as string;
        const username = formData.get("username") as string;
        const password = formData.get("password") as string;
        const confirmpassword = formData.get("confirmpassword") as string;

        console.log(name, username, password, confirmpassword);

        if (password !== confirmpassword) {
            console.log("Passwords do not match");
            alert("Passwords do not match");
            return;
        }

        try {
            const response = await axios.post("/api/auth/signup/", {
                name,
                username,
                password,
            });

            if (response.data.success) {
                navigate("/login");
            }
            else
            {
                console.log(response.data.message);
            }
        } catch (error: any) {
            console.log(error.response.data.message);
        }
    };

    return (
        <div className="max-w-md mx-auto my-10 p-6 bg-white shadow-md rounded-md">
            <h1 className="text-2xl font-semibold mb-4">Sign Up</h1>
            <form onSubmit={handleSignup}>
                <div className="mb-4">
                    <label
                        htmlFor="fullname"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Full Name
                    </label>
                    <input
                        type="text"
                        id="fullname"
                        name="fullname"
                        className="mt-1 p-2 w-full border rounded-md"
                        required
                    />
                </div>

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

                <div className="mb-6">
                    <label
                        htmlFor="confirmpassword"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Confirm Password
                    </label>
                    <input
                        type="password"
                        id="confirmpassword"
                        name="confirmpassword"
                        className="mt-1 p-2 w-full border rounded-md"
                        required
                    />
                </div>

                <button
                    type="submit"
                    className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
                >
                    Sign Up
                </button>
            </form>
        </div>
    );
};

export default Signup;
