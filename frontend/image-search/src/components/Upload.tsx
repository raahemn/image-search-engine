import { useState, useEffect } from "react";
import axios from "axios";
import { useDropzone } from "react-dropzone";
import { Container, Paper, Typography, Box, CircularProgress, Snackbar, Alert } from "@mui/material";

const Upload: React.FC = () => {
    const [message, setMessage] = useState<string>("");
    const [isUploading, setIsUploading] = useState<boolean>(false);
    const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);
    const [snackbarMessage, setSnackbarMessage] = useState<string>("");
    const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">("success");

    const onDrop = async (acceptedFiles: File[]) => {
        const file = acceptedFiles[0];
        const formData = new FormData();
        formData.append("file", file);

        setIsUploading(true);
        try {
            const response = await axios.post("/api/upload/", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
            console.log("response", response);
            setMessage(response.data.message);
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
                    localStorage.removeItem("token");
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
            setIsUploading(false);
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
        <Container maxWidth="sm" sx={{ mt: 16 }}>
            <Typography variant="h4" align="center" color="primary" gutterBottom>
                Upload Image Below
            </Typography>
            <Paper elevation={3} sx={{ p: 4, textAlign: "center" }}>
                <Box
                    {...getRootProps()}
                    sx={{
                        p: 5,
                        border: "2px dashed",
                        borderColor: isDragActive ? "primary.main" : "grey.500",
                        borderRadius: 1,
                        bgcolor: isDragActive ? "grey.100" : "background.paper",
                        cursor: "pointer",
                    }}
                >
                    <input {...getInputProps()} />
                    {isUploading ? (
                        <CircularProgress />
                    ) : isDragActive ? (
                        <Typography variant="body1">Drop the image here...</Typography>
                    ) : (
                        <Typography variant="body1">Drag 'n' drop an image here, or click to select an image</Typography>
                    )}
                </Box>
                {message && <Typography variant="body2" sx={{ mt: 2 }}>{message}</Typography>}
            </Paper>
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={3000}
                onClose={handleSnackbarClose}
            >
                <Alert onClose={handleSnackbarClose} severity={snackbarSeverity}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </Container>
    );
};

export default Upload;
