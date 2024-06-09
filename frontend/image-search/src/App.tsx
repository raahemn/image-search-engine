import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Search from "./components/Search";
import Upload from "./components/Upload";
import NavBar from "./components/NavBar";



function App() {
  

  return (
    <>
      
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          
          <Route path="/upload-image" element={< Upload />} />
          <Route path="/search-image" element={<Search />} />
        </Routes>
      </BrowserRouter>
     
    </>
  )
}

export default App
