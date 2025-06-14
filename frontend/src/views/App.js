import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import '../static/scss/App.scss';
import { Blog, BlogDetail } from "../Pages/Blogs";
import Home from '../Pages/Home'
import Login from '../Pages/Login'
import Navbar from './Navbar';
import ProtectedRoute from '../components/ProtectedRoute';
import { Novels, NovelDetail } from '../Pages/Novels';
import NewNovels from '../Pages/NewNovels';
import EditBlog from '../Pages/EditBlog';
import { Users, Userr } from '../Pages/Users';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
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
            <Route path="edit/:id" element={<EditBlog />} />

          </Route>

          <Route path="/novel" element={<ProtectedRoute>
            <Novels />
          </ProtectedRoute>
          }>
            <Route path=":id" element={<NovelDetail />} />
          </Route>

          <Route path="/new_novel" element={<ProtectedRoute>
            <NewNovels />
          </ProtectedRoute>
          } />

          <Route path="/user" element={<ProtectedRoute>
            <Users />
          </ProtectedRoute>}>
            <Route path=":id" element={<Userr />} />
          </Route>

        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;

