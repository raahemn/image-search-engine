import { useState } from "react";
import axios from "axios";
import { useDropzone } from "react-dropzone";

interface ImageData {
    filename: string;
    url: string;
    uploaded_at: string;
}

const Search = () => {
    const [message, setMessage] = useState<any>("");
    const [images, setImages] = useState<ImageData[]>([]);

    const onDrop = async (acceptedFiles: File[]) => {
        const file = acceptedFiles[0];
        const formData = new FormData();
        formData.append("file", file);

        try {
            const response = await axios.post("/api/search/", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
            console.log("response", response);
            setMessage(response.data.message);

            if (response.data.success) {
                setImages(response.data.images);
            }
        } catch (error: any) {
            if (error.response) {
                if (error.response.status === 401) {
                    setMessage("Unauthorized. Please log in again.");
                    alert("Your session has expired. Please login again.")
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

    return (
        <>
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
                            Drag 'n' drop an image here, or click to select an
                            image
                        </p>
                    )}
                </div>
                {message && <p className="mt-4 text-center">{message}</p>}
            </div>

            <div className="container mx-auto p-4">
                <h1 className="text-2xl font-bold mb-4">Returned Images</h1>
                <div className="flex flex-wrap -mx-2">
                    {images.map((image) => (
                        <div key={image.filename} className="w-1/4 px-2 mb-4">
                            <div className="bg-white p-4 rounded-lg shadow">
                                <img
                                    src={image.url}
                                    alt={image.filename}
                                    className="w-full h-auto rounded mb-2"
                                />
                                <p className="text-sm font-semibold">
                                    {image.filename}
                                </p>
                                <p className="text-xs text-gray-600">
                                    {new Date(
                                        image.uploaded_at
                                    ).toLocaleString()}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default Search;
