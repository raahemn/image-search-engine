import { useState, useEffect } from "react";
import axios from "axios";
import { useDropzone } from "react-dropzone";

const Upload = () => {
    const [message, setMessage] = useState<any>("");

    const onDrop = async (acceptedFiles: File[]) => {
        const file = acceptedFiles[0];
        const formData = new FormData();
        formData.append("file", file);

        try {
            const response = await axios.post("/api/upload/", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
            console.log("response", response);
            setMessage(response.data.message);
        } catch (error: any) {
            if (error.response) {
                if (error.response.status === 401) {
                    setMessage("Unauthorized. Please log in again.");
                    alert("Your session has expired. Please login again.");
                } else {
                    setMessage("An error occurred. Please try again.");
                }
            } else {
                setMessage("An error occurred. Please try again.");
            }
        }
    };

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
    });

    useEffect(() => {
        if (message) {
            const timer = setTimeout(() => {
                setMessage("");
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, [message]);

    return (
        <div className="max-w-md mx-auto p-6 bg-gray-200 rounded-lg shadow-md mt-7">
            <div
                {...getRootProps()}
                className={`p-10 text-center border-dashed border-2 ${
                    isDragActive ? "border-blue-500" : "border-gray-400"
                }`}
            >
                <input {...getInputProps()} />
                {isDragActive ? (
                    <p>Drop the image here...</p>
                ) : (
                    <p>
                        Drag 'n' drop an image here, or click to select an image
                    </p>
                )}
            </div>
            {message && <p className="mt-4 text-center">{message}</p>}
        </div>
    );
};

export default Upload;
