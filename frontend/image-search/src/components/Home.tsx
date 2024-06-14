import React from "react";
import { useNavigate } from "react-router-dom";
import {
    Button,
    Container,
    Grid,
    Typography,
    AppBar,
    Toolbar,
} from "@mui/material";

const Home = () => {
    const navigate = useNavigate();

    const uploadImage = () => {
        navigate("/upload-image");
    };

    const searchImage = () => {
        navigate("/search-image");
    };

    const viewImages = () => {
        navigate("/view-images");
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    return (
        <Container maxWidth="md" sx={{ mt: 30 }}>
            <Grid container spacing={2} direction="column" alignItems="center" justifyContent="center">
                <Grid item xs={12} md={12}>
                    <Button
                        variant="contained"
                        fullWidth
                        size="large"
                        onClick={uploadImage}
                        sx={{
                            bgcolor: "primary.main",
                            color: "white",
                            "&:hover": {
                                bgcolor: "primary.dark",
                            },
                        }}
                    >
                        Upload Image
                    </Button>
                </Grid>
                <Grid item xs={12} md={12}>
                    <Button
                        variant="contained"
                        fullWidth
                        size="large"
                        onClick={searchImage}
                        sx={{
                            bgcolor: "primary.main",
                            color: "white",
                            "&:hover": {
                                bgcolor: "primary.dark",
                            },
                        }}
                    >
                        Search Image
                    </Button>
                </Grid>
                <Grid item xs={12} md={12}>
                    <Button
                        variant="contained"
                        fullWidth
                        size="large"
                        onClick={viewImages}
                        sx={{
                            bgcolor: "primary.main",
                            color: "white",
                            "&:hover": {
                                bgcolor: "primary.dark",
                            },
                        }}
                    >
                        View Images
                    </Button>
                </Grid>
                <Grid item xs={12} md={12}>
                    <Button
                        variant="contained"
                        fullWidth
                        size="large"
                        onClick={handleLogout}
                        sx={{
                            bgcolor: "error.main",
                            color: "white",
                            "&:hover": {
                                bgcolor: "error.dark",
                            },
                        }}
                    >
                        Logout
                    </Button>
                </Grid>
            </Grid>
        </Container>
    );
};

export default Home;

