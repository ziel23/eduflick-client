// src/AppRouter.js
import React from 'react';
import Header from './header'
import Container from '@mui/material/Container';
import { useNavigate, useLocation } from 'react-router-dom';

const Layout = (props) => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const {children} = props
  React.useEffect(() => {
    document.title = "Eduflick";
    const token = localStorage.getItem("token")
    if (token && (location.pathname == '/' || location.pathname == '/signup')) {
      navigate('/home')
    }
  })
  
  return (
    <div>
      <Header/>
      <Container maxWidth="xl">
        {children}
      </Container>
    </div>
  )
};

export default Layout;