import React from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Container, TextField, Button, Typography, Box, IconButton, InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";



const Signup = () => {
    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleSignup = async (e: any) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        const name = formData.get("fullname") as string;
        const username = formData.get("username") as string;
        const password = formData.get("password") as string;
        const confirmpassword = formData.get("confirmpassword") as string;

        console.log(name, username, password, confirmpassword);

        if (password !== confirmpassword) {
            console.log("Passwords do not match");
            alert("Passwords do not match");
            return;
        }

        try {
            const response = await axios.post("/api/auth/signup/", {
                name,
                username,
                password,
            });

            if (response.data.success) {
                navigate("/login");
            }
            else
            {
                console.log(response.data.message);
            }
        } catch (error: any) {
            console.log(error.response.data.message);
        }
    };

    return (
        <Container maxWidth="sm">
            <Box 
                sx={{
                    mt: 10,
                    p: 6,
                    boxShadow: 3,
                    borderRadius: 2,
                    bgcolor: 'background.paper'
                }}
            >
                <Typography variant="h4" component="h1" gutterBottom>
                    Sign Up
                </Typography>
                <form onSubmit={handleSignup}>
                    <Box sx={{ mb: 3 }}>
                        <TextField
                            label="Full Name"
                            variant="outlined"
                            fullWidth
                            name="fullname"
                            id="fullname"
                            required
                        />
                    </Box>
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
                    <Box sx={{ mb: 3 }}>
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
                                            onClick={()=>{setShowPassword(!showPassword)}}
                                            edge="end"
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </Box>
                    <Box sx={{ mb: 4 }}>
                        <TextField
                            label="Confirm Password"
                            variant="outlined"
                            type={showConfirmPassword ? "text" : "password"}
                            fullWidth
                            name="confirmpassword"
                            id="confirmpassword"
                            required
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle confirm password visibility"
                                            onClick={()=>{setShowConfirmPassword(!showConfirmPassword)}}
                                            edge="end"
                                        >
                                            {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </Box>
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                    >
                        Sign Up
                    </Button>
                </form>
                <Typography component="h1" gutterBottom sx={{ mt: 2 }}>
                    Already have an account? <a href="/login" style={{ color: '#3f51b5', textDecoration: 'none', fontWeight: 'bold' }}>Login</a>
                </Typography>
            </Box>
        </Container>
    );
};

export default Signup;
