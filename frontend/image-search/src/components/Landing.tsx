import { useNavigate } from "react-router-dom";
import { Button, Container, Grid, Typography, Box } from "@mui/material";

const Landing = () => {
    const navigate = useNavigate();
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
                    <Typography
                        variant="h3"
                        align="center"
                        color="primary"
                        gutterBottom
                        sx={{ mb: 8 }}
                    >
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
                                variant="h6"
                                align="center"
                                color="black"
                                gutterBottom
                            >
                                Please login or sign up to continue:
                            </Typography> */}
                            <Button
                                variant="contained"
                                fullWidth
                                size="large"
                                onClick={() => navigate("/login")}
                                sx={{
                                    bgcolor: "primary.main",
                                    color: "white",
                                    "&:hover": {
                                        bgcolor: "primary.dark",
                                    },
                                }}
                            >
                                Login
                            </Button>

                            <Button
                                variant="contained"
                                fullWidth
                                size="large"
                                onClick={() => navigate("/signup")}
                                sx={{
                                    bgcolor: "primary.main",
                                    color: "white",
                                    "&:hover": {
                                        bgcolor: "primary.dark",
                                    },
                                    mt: 2,
                                }}
                            >
                                Sign Up
                            </Button>
                        </Grid>
                    </Grid>
                </Container>
            </Box>
        </>
    );
};

export default Landing;
