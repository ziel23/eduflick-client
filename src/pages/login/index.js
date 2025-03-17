import React,{useState} from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import logo from '../../images/logo.png'
import Card from '@mui/material/Card';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import { login } from '../../util/service';
import Snackbar from '@mui/material/Snackbar';
import { Grid2, Paper } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

export default function LoginPage() {
  const navigate = useNavigate();
  const theme = useTheme();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [infoModal, setInfoModal] = useState({
    open: false,
    message: ""
  })
  const isSm = useMediaQuery(theme.breakpoints.down('md')); 

  const handleLogin = async (e) => {
    try {
      e.preventDefault();
      const loginInfo = await login(formData)
      console.log("[loginInfo]", loginInfo);
      
      if(loginInfo.status != "200"){
        setInfoModal({open: true, message: loginInfo.message})
      } else{
        navigate('/home')
        localStorage.setItem("token", loginInfo.token);
      }
    } catch (error) {
      console.error("[LOGIN][ERROR]",error)
      setInfoModal({
        open: true,
        message: error
      })
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  const handleClose = () => {
    setInfoModal({
      open: false,
      message: ""
    })
  }

  return (
    <Box sx={{ width: '100%' }}>
      <Snackbar
        open={infoModal.open}
        onClose={handleClose}
        message={infoModal.message}
      />
      <Grid2 container sx={{width: '100%'}}>
        <Grid2 size={{xl: 7, lg: 7, md: 6, sm: 12, xs: 12}} >

          <Box 
            sx={{ 
              width: 'calc(100% - 100px)', // Adjusts dynamically with 50px padding on both sides
              maxWidth: 600, // Prevents the text from stretching too wide
              color: 'white',
              paddingTop: 8 ,

            }}
          >
            <Typography variant="h3" gutterBottom>
              Welcome to
            </Typography>

            <Box
              component="img"
              sx={{
                width: '100%', // Adjusts within the container
                maxWidth: 500, // Limits the image size for better balance
                height: 'auto', // Maintains aspect ratio
                display: 'block', // Prevents unwanted spacing
                marginBottom: 2
              }}
              alt="Your Image Description"
              src={logo}
            />

            <Typography variant="h5" gutterBottom sx={{ maxWidth: 550 }}>
              A fast and easy flashcard generator to help students study smarter!
            </Typography>
          </Box>
        </Grid2>
        <Grid2 size={{xl: 5, lg: 5, md: 6, sm: 12, xs: 12}}>
          <Box sx={{width: '100%', paddingTop: 8}}>
            <form onSubmit={handleLogin} >
              <Card sx={{minWidth: 300, maxWidth: 400, margin: 'auto', marginTop: 2, display: 'flex', flexDirection: 'column', padding: 2, gap: 2}}>
                <TextField 
                  label="Email" 
                  variant="outlined" 
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
                <TextField 
                  label="Password" 
                  variant="outlined" 
                  type='password'
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                />
                <Button type="submit" variant="contained">Login</Button>
                <Button variant="text" onClick={()=> navigate('/signup')} >Don’t Have an Account? Sign Up</Button>
              </Card>
            </form>
          </Box>
        </Grid2>
      </Grid2>
    </Box>
  );
}