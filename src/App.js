import { Blog } from "./Page/Blog";
import Home from "./Page/Home";
import { BrowserRouter, Route, Routes, Navigate, Link } from "react-router-dom";

function App() {
    return (
        <BrowserRouter>
            <nav>
                <Link to="/home">Home</Link>
                <Link to="/blog" style={{ marginLeft: "10px" }}>Blog</Link>
            </nav>
            <Routes>
                <Route path="/home" element={<Home />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/" element={<Navigate to="/home" replace />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App; 