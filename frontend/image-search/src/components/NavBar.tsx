import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
    AppBar,
    Toolbar,
    Typography,
    Button,
    IconButton,
    Switch,
    useTheme,
} from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import LoginIcon from "@mui/icons-material/Login";
import HomeIcon from "@mui/icons-material/Home";

const NavBar = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    return (
        <AppBar position="static" color="primary">
            <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    <a
                        href="/home"
                        style={{
                            textDecoration: "none",
                            fontWeight: "bold",
                        }}
                    >
                        Image Search Engine
                    </a>
                </Typography>

                {localStorage.getItem("token") ? (
                    <>
                        <IconButton onClick={handleLogout} color="inherit">
                            <LogoutIcon />
                        </IconButton>
                    </>
                ) : (
                    <IconButton
                        onClick={() => navigate("/login")}
                        color="inherit"
                    >
                        <LoginIcon />
                    </IconButton>
                )}
            </Toolbar>
        </AppBar>
    );
};

export default NavBar;
