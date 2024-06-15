import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, Container, Grid, Typography, Box } from "@mui/material";

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

    return (
        <>
            <Box
                sx={{
                    background: `url('/path/to/your/hero-image.jpg')`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    height: "calc(100vh - 64px)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <Container maxWidth="md">
                    <Typography variant="h3" align="center" color="primary" gutterBottom sx={{mb: 8}}>
                        Welcome to your Image Search Engine!
                    </Typography>
                    <Grid
                        container
                        spacing={3}
                        justifyContent="center"
                        alignItems="center"
                    >
                        <Grid item xs={12} md={6}>
                            {/* <Typography
                                variant="h3"
                                align="center"
                                color="primary"
                                gutterBottom
                            >
                                Welcome to your Image Search Engine!
                            </Typography> */}
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
                                    mt: 2,
                                }}
                            >
                                Search Image
                            </Button>
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
                                    mt: 2,
                                }}
                            >
                                View Library
                            </Button>
                        </Grid>
                    </Grid>
                </Container>
            </Box>
        </>
    );
};

export default Home;
