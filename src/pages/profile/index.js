import React, { useState } from "react";
import { Avatar, Button, Divider, Box, Typography, TextField, IconButton } from "@mui/material";
import { PhotoCamera, Edit } from "@mui/icons-material";

const ProfileSettings = () => {
  const [profilePic, setProfilePic] = useState(null);
  const [username, setUsername] = useState("Example Username");
  const [email, setEmail] = useState("example@email.com");

  const handlePhotoChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePic(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Box sx={{width: '100%', paddingTop: 4 }}>
      <Box sx={{display: 'flex', width: '100%', justifyContent: 'space-between'}}>
        <Typography variant="h4" color="white">Profile</Typography>
      </Box>
      <Box sx={{width: '100%', marginTop: 1}}>
        <Divider sx={{borderColor: 'white'}}/>
      </Box>
      <Box sx={{ maxWidth: 400, p: 3, m: "auto", mt: 5, textAlign: "center", background: 'white', borderRadius: '25px' }}>
        <Typography variant="h6">Profile Photo</Typography>
        <label htmlFor="upload-photo">
          <input
            style={{ display: "none" }}
            id="upload-photo"
            name="upload-photo"
            type="file"
            accept="image/*"
            onChange={handlePhotoChange}
          />
          <IconButton color="primary" component="span">
            <Avatar
              src={profilePic}
              sx={{ width: 80, height: 80, m: 1 }}
            >
              {!profilePic && <PhotoCamera />}
            </Avatar>
          </IconButton>
        </label>
        <br />
        <Button variant="outlined" component="label" sx={{ m: 1 }}>
          Change Photo
          <input hidden accept="image/*" type="file" onChange={handlePhotoChange} />
        </Button>
        <Button variant="text" color="error" onClick={() => setProfilePic(null)}>
          Remove Photo
        </Button>
        <br />
        <Typography variant="body1" sx={{ mt: 2 }}>Username</Typography>
        <TextField
          fullWidth
          variant="standard"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          InputProps={{
            endAdornment: (
              <IconButton>
                <Edit fontSize="small" />
              </IconButton>
            ),
          }}
        />
        <Typography variant="body1" sx={{ mt: 2 }}>Email</Typography>
        <TextField
          fullWidth
          variant="standard"
          value={email}
          disabled
        />
        <Button variant="contained" sx={{ mt: 3, color: 'white' }}>
          Save
        </Button>
      </Box>
    </Box>
  );
};

export default ProfileSettings;
