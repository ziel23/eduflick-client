import React, { useEffect, useState } from "react";
import { Avatar, Button, Divider, Box, Typography, TextField, IconButton } from "@mui/material";
import { PhotoCamera, Edit } from "@mui/icons-material";
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import {jwtDecode} from "jwt-decode";
import { getUserInfo, updateUserInfo } from "../../util/service";

const ProfileSettings = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [conpassword, setConpassword] = useState("");
  const [infoModal, setInfoModal] = useState({
    open: false,
    message: ""
  })

  useEffect(()=>{
    
    getUserInfoService();
  },[])

  const getUserInfoService = async() => {
    const res = await getUserInfo()
    if(res){
      setUsername(res.data.username)
      setEmail(res.data.email)
    }
  }

  const onSave = async () => {

    if(conpassword !== "" || conpassword !== ""){
      if(password !== conpassword) {
        alert("Passwords do not match")
        return
      }
    }

    const sendData = {
      email: email,
      username: username,
      password: password,
    }
    console.log("[sendData]", sendData)
    const res = await updateUserInfo(sendData);
    setInfoModal({open: true, message: res.message })

  }

  const handleClose = () => {
    setInfoModal({
      open: false,
      message: ""
    })
  }
  

  return (
    <Box sx={{width: '100%', paddingTop: 4 }}>
      <Snackbar
        open={infoModal.open}
        autoHideDuration={5000}
      >
        <Alert
          onClose={handleClose}
          severity="success"
          variant="filled"
          sx={{ width: '100%' }}
        >
          {infoModal.message}
        </Alert>
      </Snackbar>
      <Box sx={{display: 'flex', width: '100%', justifyContent: 'space-between'}}>
        <Typography variant="h4" color="white">Profile</Typography>
      </Box>
      <Box sx={{width: '100%', marginTop: 1}}>
        <Divider sx={{borderColor: 'white'}}/>
      </Box>
      <Box sx={{ maxWidth: 400, p: 3, m: "auto", mt: 5, textAlign: "center", background: 'white', borderRadius: '25px' }}>
        <Typography variant="body1" sx={{ mt: 2 }}>Email</Typography>
        <TextField
          fullWidth
          variant="standard"
          value={email}
          disabled
        />
        <Typography variant="body1" sx={{ mt: 2 }}>Username</Typography>
        <TextField
          fullWidth
          variant="standard"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <Typography variant="body1" sx={{ mt: 2 }}>Password</Typography>
        <Typography sx={{fontSize: 11}}>Leave as blank if you dont need to change paswword</Typography>
        <TextField
          fullWidth
          variant="standard"
          type="password"
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
        />
        <Typography variant="body1" sx={{ mt: 2 }}>Confirm Password</Typography>
        <TextField
          fullWidth
          variant="standard"
          type="password"
          value={conpassword}
          onChange={(e)=>setConpassword(e.target.value)}
        />
        <Button variant="contained" sx={{ mt: 3, color: 'white' }} onClick={onSave}>
          Save
        </Button>
      </Box>
    </Box>
  );
};

export default ProfileSettings;
