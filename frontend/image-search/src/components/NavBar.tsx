import { useNavigate } from "react-router-dom";
import { AppBar, Toolbar, Typography, IconButton, Tooltip } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import LoginIcon from "@mui/icons-material/Login";

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
                    <Tooltip title="Logout">
                        <IconButton onClick={handleLogout} color="inherit">
                            <LogoutIcon />
                        </IconButton>
                    </Tooltip>
                </>
            ) : (
                <Tooltip title="Login">
                    <IconButton onClick={() => navigate("/login")} color="inherit">
                        <LoginIcon />
                    </IconButton>
                </Tooltip>
            )}
            </Toolbar>
        </AppBar>
    );
};

export default NavBar;
