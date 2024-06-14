import React, { useState, useEffect } from "react";
import {
    AppBar,
    Toolbar,
    Typography,
    Button,
    IconButton,
    Switch,
    useTheme,
} from "@mui/material";
import { Brightness4, Brightness7 } from "@mui/icons-material";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";

const NavBar = ({ toggleDarkMode }: { toggleDarkMode: any }) => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(true); 
  const theme = useTheme();

 
  return (
      <AppBar position="static" color={isDarkMode ? "default" : "primary"}>
          <Toolbar>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                  Image Search Engine
              </Typography>
              <IconButton onClick={toggleDarkMode} color="inherit">
                    {theme.palette.mode === "dark" ? <Brightness7Icon /> : <Brightness4Icon />}
                </IconButton>
             
          </Toolbar>
      </AppBar>
  );
};

export default NavBar;