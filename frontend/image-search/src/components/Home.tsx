import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";

const Home = () => {
    const navigate = useNavigate();

    const uploadImage = () => {
        navigate("/upload-image");
    };

    const searchImage = () => {
        navigate("/search-image");
    };

    // useEffect(() => {
    //     document.documentElement.classList.remove("dark");
    // }, []);

    return (
        <div className="min-h-screen flex flex-col items-center justify-center dark:bg-gray-900 dark:text-white">
            <div className="flex flex-col items-center space-y-4 mt-4">
                <button
                    onClick={uploadImage}
                    className="btn btn-md p-2 hover:scale-105 transform transition mt-2 bg-gray-100 text-black dark:bg-blue-500 dark:text-white rounded-lg"
                >
                    Upload Image
                </button>
                <button
                    onClick={searchImage}
                    className="btn btn-info btn-md p-2 hover:scale-105 transform transition mt-2 bg-gray-100 text-black dark:bg-blue-500 dark:text-white rounded-lg"
                >
                    Search Image
                </button>
            </div>
        </div>
    );
};

export default Home;
