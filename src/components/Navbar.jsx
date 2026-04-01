import React, { useState } from 'react'
import { Link as ScrollLink } from 'react-scroll';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { GiHamburgerMenu } from 'react-icons/gi';
import { data } from '../restApi.json';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const Navbar = () => {
  const [show, setShow] = useState(false);
  const { user, isAuthenticated, setIsAuthenticated, setUser } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL || 'http://localhost:4000'}/api/v1/user/logout`, {
        withCredentials: true,
      });
      if (response.data.success) {
        toast.success(response.data.message);
        setIsAuthenticated(false);
        setUser(null);
        navigate('/login');
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <nav>
      <div className="logo">AYUSHI</div>
      <div className={show ? "navLinks showmenu" : "navLinks"}>
        <div className="links">
          <ScrollLink 
            to="heroSection" 
            spy={true} 
            smooth={true} 
            duration={500} 
            onClick={() => setShow(false)}
          >
            HOME
          </ScrollLink>
          {data[0].navbarLinks.slice(1).map((element) => {
            return (
              <ScrollLink
                to={element.link}
                key={element.id}
                spy={true}
                smooth={true}
                duration={500}
                onClick={() => setShow(false)}
              >
                {element.title}
              </ScrollLink>
            )
          })}
          {isAuthenticated && user?.role === 'admin' && (
            <RouterLink to="/admin/dashboard" onClick={() => setShow(false)}>ADMIN</RouterLink>
          )}
        </div>
        <div className="auth_btns">
          {!isAuthenticated ? (
            <>
              <RouterLink to="/login" className='loginBtn' onClick={() => setShow(false)}>LOGIN</RouterLink>
              <RouterLink to="/register" className='registerBtn' onClick={() => setShow(false)}>REGISTER</RouterLink>
            </>
          ) : (
            <button className='logoutBtn' onClick={handleLogout}>LOGOUT</button>
          )}
          <RouterLink to="/menu" className='menuBtn' onClick={() => setShow(false)}>OUR MENU</RouterLink>
        </div>
      </div>
      <div className="hamburger" onClick={() => setShow(!show)}>
        <GiHamburgerMenu />
      </div>
    </nav>
  )
}

export default Navbar
