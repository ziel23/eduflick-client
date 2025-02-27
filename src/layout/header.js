import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import InsertDriveFileOutlinedIcon from '@mui/icons-material/InsertDriveFileOutlined';
import SignalCellularAltOutlinedIcon from '@mui/icons-material/SignalCellularAltOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import logo from "../images/logo.png"
import IconButton from '@mui/material/IconButton';
import { useLocation } from 'react-router-dom';


export default function Header() {
  const location = useLocation();

  const isPrivate = location.pathname != '/' && location.pathname != '/signup';
  console.log("[location.pathname]", location.pathname, isPrivate);
  
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" style={{background: '#fff', color: 'black'}}>
        <Toolbar sx={{display: 'flex', justifyContent: 'space-between'}}>
          <Box
            component="img"
            sx={{
              height: 35,
            }}
            alt="Your Image Description"
            src={logo}
          />     
          <Box sx={{display: isPrivate ? 'block' : 'none'}}>
            <IconButton sx={{color: 'black'}}>
              <InsertDriveFileOutlinedIcon/>
            </IconButton>
            <IconButton sx={{color: 'black'}}>
              <SignalCellularAltOutlinedIcon/>
            </IconButton>
            <IconButton sx={{color: 'black'}}>
              <PersonOutlineOutlinedIcon/>
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}