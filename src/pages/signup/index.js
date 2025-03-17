import React,{useState} from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import logo from '../../images/logo.png'
import Card from '@mui/material/Card';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import { signup } from '../../util/service';
import { Grid2 } from '@mui/material';
import Snackbar from '@mui/material/Snackbar';


export default function SignUpPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    conpassword: ''
  });
  const [infoModal, setInfoModal] = useState({
      open: false,
      message: ""
    })

  const handleSignUp = async(e) => {
    try {
      e.preventDefault();
      if(formData.password == formData.conpassword){
        try {
          e.preventDefault();
          const response = await signup(formData)
          
          if(response.status != "200"){
            setInfoModal({open: true, message: response.message})
          } else{
            navigate('/home')
            localStorage.setItem("token", response.token);
          }
        } catch (error) {
          console.error("[LOGIN][ERROR]",error)
          setInfoModal({
            open: true,
            message: error
          })
        }
      }
    } catch (error) {
      console.error("[LOGIN][ERROR]",error)
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
            <form onSubmit={handleSignUp}>
              <Card sx={{minWidth: 300, maxWidth: 400, margin: 'auto', marginTop: 2, display: 'flex', flexDirection: 'column', padding: 2, gap: 2}}>
                <TextField label="Username" variant="outlined" name="name" onChange={handleChange}/>
                <TextField label="Email" variant="outlined" name="email" onChange={handleChange}/>
                <TextField label="Password" variant="outlined" name="password" type='password' onChange={handleChange}/>
                <TextField label="Confirm Password" variant="outlined" name="conpassword" type='password' onChange={handleChange}/>
                <Button variant="contained" type='submit'>Sign Up</Button>
                <Button variant="text" onClick={()=>navigate('/')}>Already Have An Account? Login</Button>
              </Card>
            </form>
          </Box>
        </Grid2>
      </Grid2>
    </Box>
  );
}