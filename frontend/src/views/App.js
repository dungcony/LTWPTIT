import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import '../static/scss/App.scss';
import { Blog, BlogDetail } from "../Pages/Blogs";
import Home from '../Pages/Home'
import Login from '../Pages/Login'
import Navbar from './Navbar';
import ProtectedRoute from '../components/ProtectedRoute';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        {/* <navBar>
          <Link to="/">Blog</Link>
          <Link to='/Home'>Home</Link>
        </navBar> */}
        <Navbar />

        <Routes>
          <Route path="/login" element={<Login />} />

          <Route path="/" element={
            <ProtectedRoute>
              <Navigate to="/Home" replace />
            </ProtectedRoute>
          } />

          <Route path="/Home" element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          } />

          <Route path="/blog" element={
            <ProtectedRoute>
              <Blog />
            </ProtectedRoute>
          }>
            <Route path=":id" element={<BlogDetail />} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;

