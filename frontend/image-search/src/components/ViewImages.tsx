import React, { useEffect, useState } from "react";
import axios from "axios";

interface ImageData {
    filename: string;
    url: string;
    uploaded_at: string;
}

const ViewImages = () => {
    const [images, setImages] = useState<ImageData[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchImages = async () => {
            try {
                const response = await axios.get(`/api/view/my-images`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                            "token"
                        )}`,
                        "Content-Type": "application/json",
                    },
                });
                console.log("Response", response.data);
                if (response.data.success) {
                    setImages(response.data.images);
                } else {
                    console.log("error", response.data.message);
                    setError(response.data.message);
                }
            } catch (err) {
                setError("Failed to fetch images");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchImages();
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                Loading...
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex justify-center items-center h-screen">
                {error}
            </div>
        );
    }

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">User Uploaded Images</h1>
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
                                {new Date(image.uploaded_at).toLocaleString()}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ViewImages;
