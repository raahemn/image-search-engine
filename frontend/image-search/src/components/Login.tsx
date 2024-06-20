import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
    Container,
    TextField,
    Button,
    Typography,
    Box,
    IconButton,
    InputAdornment,
    CircularProgress,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const LoginForm = () => {
    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState<boolean>(false);

    const handleLogin = async (e: any) => {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData(e.target);
        const username = formData.get("username") as string;
        const password = formData.get("password") as string;

        try {
            const response = await axios.post("/api/auth/login/", {
                username,
                password,
            });

            console.log(response.data);
            localStorage.setItem("token", response.data.token);
            navigate("/home");
        } catch (error: any) {
            console.log(error);
        }
        setLoading(false);
    };

    return (
        <Container maxWidth="sm">
            <Box
                sx={{
                    mt: 10,
                    p: 6,
                    boxShadow: 3,
                    borderRadius: 2,
                    bgcolor: "background.paper",
                }}
            >
                <Typography variant="h4" component="h1" gutterBottom>
                    Login
                </Typography>
                <form onSubmit={handleLogin}>
                    <Box sx={{ mb: 3 }}>
                        <TextField
                            label="Username"
                            variant="outlined"
                            fullWidth
                            name="username"
                            id="username"
                            required
                        />
                    </Box>
                    <Box sx={{ mb: 4 }}>
                        <TextField
                            label="Password"
                            variant="outlined"
                            type={showPassword ? "text" : "password"}
                            fullWidth
                            name="password"
                            id="password"
                            required
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={() => {
                                                setShowPassword(!showPassword);
                                            }}
                                            edge="end"
                                        >
                                            {showPassword ? (
                                                <VisibilityOff />
                                            ) : (
                                                <Visibility />
                                            )}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </Box>
                    {loading && (
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "center",
                                marginBottom: 1,
                            }}
                        >
                            <CircularProgress />
                        </Box>
                    )}
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                    >
                        Login
                    </Button>
                </form>
                <Typography
                    component="h1"
                    gutterBottom
                    sx={{ mt: 2 }}
                    color="primary"
                >
                    Don't have an account?{" "}
                    <a
                        href="/signup"
                        style={{
                            color: "primary",
                            textDecoration: "none",
                            fontWeight: "bold",
                        }}
                    >
                        Sign Up
                    </a>
                </Typography>
            </Box>
        </Container>
    );
};

export default LoginForm;
