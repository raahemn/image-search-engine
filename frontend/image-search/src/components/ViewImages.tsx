import { useEffect, useState } from "react";
import axios from "axios";
import { Typography, CircularProgress } from "@mui/material";

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
            } catch (error: any) {
                if (error.response) {
                    if (error.response.status === 401) {
                        setError("Unauthorized. Please log in again.");
                        alert("Your session has expired. Please login again.");
                    } else {
                        setError("An error occurred. Please try again.");
                    }
                } else {
                    setError("An error occurred. Please try again.");
                }
            } finally {
                setLoading(false);
            }
        };

        fetchImages();
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <CircularProgress />
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
        <div className="container mx-auto p-4 mt-8">
            <Typography variant="h4" component="h1" gutterBottom>
                Your Images:
            </Typography>
            <div className="flex flex-wrap -mx-2">
                {images.length === 0 ? (
                    <div className="w-full text-center">No images found.</div>
                ) : (
                    images.map((image) => (
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
                    ))
                )}
            </div>
        </div>
    );
};

export default ViewImages;
