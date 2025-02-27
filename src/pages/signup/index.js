import React,{useState} from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import logo from '../../images/logo.png'
import Card from '@mui/material/Card';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import { signup } from '../../util/service';
import bcrypt from 'bcryptjs';


export default function SignUpPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    conpassword: ''
  });

  const handleSignUp = async(e) => {
    alert("asd")
    try {
      e.preventDefault();
      if(formData.password == formData.conpassword){
        // const salt = bcrypt.genSaltSync(10);
        // const encryptedPassword = bcrypt.hashSync(formData.password, salt);
        // const encryptedFormData = {
        //   ...formData,
        //   password: encryptedPassword
        // };
        delete formData['conpassword']
        console.log("[Login]", formData);
        const response = await signup(formData)
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

  return (
    <Box sx={{ display: 'flex',  width: '100%' }}>
      <Box sx={{width: '100%', paddingLeft: 10, paddingTop: 8}}>
        <Typography variant="h2" gutterBottom>
          Welcome to
        </Typography>
        <Box
          component="img"
          sx={{
              height: 155,
          }}
          alt="Your Image Description"
          src={logo}
        />  
        <Typography variant="h4" gutterBottom sx={{maxWidth: 550}}>
          A fast and easy flashcard generator to help students study smarter!
        </Typography>
      </Box>
      <Box sx={{width: '100%', paddingTop: 8}}>
        <form onSubmit={handleSignUp}>
          <Card sx={{minWidth: 300, maxWidth: 400, margin: 'auto', marginTop: 2, display: 'flex', flexDirection: 'column', padding: 2, gap: 2}}>
            <TextField label="Username" variant="outlined" name="username" onChange={handleChange}/>
            <TextField label="Email" variant="outlined" name="email" onChange={handleChange}/>
            <TextField label="Password" variant="outlined" name="password" type='password' onChange={handleChange}/>
            <TextField label="Confirm Password" variant="outlined" name="conpassword" type='password' onChange={handleChange}/>
            <Button variant="contained" type='submit'>Sign Up</Button>
            <Button variant="text" onClick={()=>navigate('/')}>Already Have An Account? Login</Button>
          </Card>
        </form>
      </Box>
    </Box>
  );
}