import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import InsertDriveFileOutlinedIcon from '@mui/icons-material/InsertDriveFileOutlined';
import SignalCellularAltOutlinedIcon from '@mui/icons-material/SignalCellularAltOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import logo from "../images/logo.png"
import IconButton from '@mui/material/IconButton';
import { useLocation, useNavigate } from 'react-router-dom';
import Popper from '@mui/material/Popper';
import { Menu, MenuItem, Paper } from '@mui/material';

export default function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const handleClose = (event) => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popper' : undefined;

  const isPrivate = location.pathname != '/' && location.pathname != '/signup';

  const handleLogout = () => {
    navigate('/')
    localStorage.removeItem('token')
    handleClose()
  }

  const handleProfile = () => {
    navigate('/profile')
    handleClose()
  }
  
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
            onClick={()=>navigate('/home')}
          />     
          <Box sx={{display: isPrivate ? 'block' : 'none'}}>
            <IconButton sx={{color: 'black'}}>
              <SignalCellularAltOutlinedIcon onClick={()=>navigate('/leaders-board')} />
            </IconButton>
            <IconButton sx={{color: 'black'}} onClick={handleClick} aria-describedby={id}>
              <PersonOutlineOutlinedIcon/>
            </IconButton>
            <Paper>
              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                sx={{width: 250}}
              >
                <MenuItem onClick={handleProfile}>Profile</MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
            </Paper>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}