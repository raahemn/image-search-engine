import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Search from "./components/Search";
import Upload from "./components/Upload";
import NavBar from "./components/NavBar";
import Login from "./components/Login";
import Signup from "./components/Signup";
import ViewImages from "./components/ViewImages";
import AuthorizedRoute from "./context/AuthroizedRoute";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./context/Theme";

function App() {


    return (
        <>
            <ThemeProvider theme={theme}>
                <BrowserRouter>
                    <NavBar />
                    <Routes>
                        <Route path="/" element={<AuthorizedRoute />}>
                            <Route path="/home" element={<Home />} />
                            <Route path="/upload-image" element={<Upload />} />
                            <Route path="/search-image" element={<Search />} />
                            <Route
                                path="/view-images"
                                element={<ViewImages />}
                            />
                        </Route>

                        <Route path="/login" element={<Login />} />
                        <Route path="/signup" element={<Signup />} />
                    </Routes>
                </BrowserRouter>
            </ThemeProvider>
        </>
    );
}

export default App;
