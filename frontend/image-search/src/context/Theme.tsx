import { createTheme } from "@mui/material/styles";
import { useState } from "react";

const Theme = () => {
    const [mode, setMode] = useState<any>("dark"); 

    const toggleDarkMode = () => {
        setMode((prevMode:any) => (prevMode === "light" ? "dark" : "light"));
    };

    // Create and return the theme object
    const theme = createTheme({
        palette: {
            mode: mode,
            primary: {
                main: "#1d1c31",
            },
            secondary: {
                main: "#549580",
            },
        },
        typography: {
            fontFamily: "Roboto, sans-serif",
        },
    });

    return { theme, toggleDarkMode }; // Return the theme object and toggle function
};

export default Theme;
