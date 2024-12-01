import { BrowserRouter, Routes, Route } from "react-router";
import { Outlet } from "react-router";
import Register from './pages/Register';
import Login from './pages/Login';
import Write from './pages/Write';
import Home from './pages/Home';
import Single from './pages/Single';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import './style.scss';

const Layout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
}

function App() {
  return (
    <div className="app">
      <div className="container">
        <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />} > 
            <Route path="/" element={<Home />} />  
            <Route path="post/:id" element={<Single />} />  
            <Route path="write" element={<Write />} />  
          </Route>
          <Route path="register" element={<Register />} />
          <Route path="login" element={<Login />} />
        </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
