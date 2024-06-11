import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Search from "./components/Search";
import Upload from "./components/Upload";
import NavBar from "./components/NavBar";
import Login from "./components/Login";
import Signup from "./components/Signup";
import AuthorizedRoute from "./context/AuthroizedRoute";

function App() {
    return (
        <>
            <BrowserRouter>
                <NavBar />
                <Routes>
                    <Route path="/" element={<AuthorizedRoute />}>
                        <Route path="/home" element={<Home />} />
                        <Route path="/upload-image" element={<Upload />} />
                        <Route path="/search-image" element={<Search />} />
                    </Route>

                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
