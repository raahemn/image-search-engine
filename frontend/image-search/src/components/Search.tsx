import { useState, useEffect } from "react";
import axios from "axios";
import { useDropzone } from "react-dropzone";
import {
    Container,
    Paper,
    Typography,
    Box,
    CircularProgress,
    Snackbar,
    Alert,
} from "@mui/material";

interface ImageData {
    filename: string;
    url: string;
    uploaded_at: string;
    similarity_score: any;
}

const Search = () => {
    const [message, setMessage] = useState<any>("");
    const [images, setImages] = useState<ImageData[]>([]);
    const [isUploading, setIsUploading] = useState<boolean>(false);
    const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);
    const [snackbarMessage, setSnackbarMessage] = useState<string>("");
    const [snackbarSeverity, setSnackbarSeverity] = useState<
        "success" | "error"
    >("success");
    const [requested, setRequested] = useState<boolean>(false);

    const onDrop = async (acceptedFiles: File[]) => {
        const file = acceptedFiles[0];
        const formData = new FormData();
        formData.append("file", file);

        setIsUploading(true); // Start uploading, show CircularProgress
        
        try {
            const response = await axios.post("/api/search/", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
            console.log("response", response);
            setRequested(true);
            setMessage(response.data.message);
            if (response.data.success) {
                setImages(response.data.images);
            }
            setSnackbarMessage(response.data.message);
            setSnackbarSeverity("success");
            setSnackbarOpen(true);
        } catch (error: any) {
            if (error.response) {
                if (error.response.status === 401) {
                    setMessage("Unauthorized. Please log in again.");
                    setSnackbarMessage("Unauthorized. Please log in again.");
                    setSnackbarSeverity("error");
                    alert("Your session has expired. Please login again.");
                } else {
                    setMessage("An error occurred. Please try again.");
                    setSnackbarMessage("An error occurred. Please try again.");
                    setSnackbarSeverity("error");
                }
            } else {
                setMessage("An error occurred. Please try again.");
                setSnackbarMessage("An error occurred. Please try again.");
                setSnackbarSeverity("error");
            }
            setSnackbarOpen(true);
        } finally {
            setIsUploading(false); // End uploading, hide CircularProgress
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

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    return (
        <>
            <Container maxWidth="sm" sx={{ mt: 7 }}>
                <Paper elevation={3} sx={{ p: 4, textAlign: "center" }}>
                    <Box
                        {...getRootProps()}
                        sx={{
                            p: 5,
                            border: "2px dashed",
                            borderColor: isDragActive
                                ? "primary.main"
                                : "grey.500",
                            borderRadius: 1,
                            bgcolor: isDragActive
                                ? "grey.100"
                                : "background.paper",
                            cursor: "pointer",
                            minHeight: 200, // Ensure the box has enough height for CircularProgress
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <input {...getInputProps()} />
                        {isUploading ? (
                            <CircularProgress />
                        ) : isDragActive ? (
                            <Typography variant="body1">
                                Drop the image here...
                            </Typography>
                        ) : (
                            <Typography variant="body1">
                                Drag 'n' drop an image here, or click to select
                                an image
                            </Typography>
                        )}
                    </Box>
                    {message && (
                        <Typography variant="body2" sx={{ mt: 2 }}>
                            {message}
                        </Typography>
                    )}
                </Paper>
                <Snackbar
                    open={snackbarOpen}
                    autoHideDuration={3000}
                    onClose={handleSnackbarClose}
                >
                    <Alert
                        onClose={handleSnackbarClose}
                        severity={snackbarSeverity}
                    >
                        {snackbarMessage}
                    </Alert>
                </Snackbar>
            </Container>

            <div className="container mx-auto p-4">
                <Typography variant="h4" component="h1" gutterBottom>
                    Returned Images
                </Typography>
                <div className="flex flex-wrap -mx-2">
                    {images.length === 0 ? (
                        requested == true ? (
                            <div className="w-full text-center">
                                No images found.
                            </div>
                        ) : (
                            <div className="w-full text-center">
                                Upload an image to get search results!
                            </div>
                        )
                    ) : (
                        images.map((image) => (
                            <div
                                key={image.filename}
                                className="w-1/4 px-2 mb-4"
                            >
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
                                    <p className="text-xs text-gray-600">
                                        Similarity Score: {image.similarity_score.toFixed(2)}
                                    </p>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </>
    );
};

export default Search;
