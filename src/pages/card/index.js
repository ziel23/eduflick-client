import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import logo from '../../images/logo.png'
import Card from '@mui/material/Card';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import Divider from '@mui/material/Divider';
import { Grid2 as Grid, Input, Paper } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

export default function CardPage() {
  const navigate = useNavigate();
  const [flashCardName, setFlashCardName] = React.useState("")

  const handleChange = (e) => {
    const { value } = e.target;
    setFlashCardName(value);
  };
  return (
    <Box sx={{width: '100%', paddingTop: 8 }}>
      <Box sx={{display: 'flex', flexDirection: 'row'}}> 
        <Box sx={{flexGrow: 1, display: 'flex', justifyContent: 'center'}}>
          <Paper
            sx={{
              width: 250,
              height: 300,
              display: 'flex',
              justifyContent: 'center',
              padding: 3
            }}
            elevation={3}
          >
            <Typography>
              {flashCardName ? flashCardName : "Flash Card Name"}
            </Typography>
          </Paper>
        </Box>
        <Box sx={{flexGrow: 2}}>
          <Box
            sx={{
              width: '100%',
              height: 300,
              background: '#fff'
            }}
          >
            <TextField 
              label="Enter Flash Card Name" 
              variant="outlined" 
              value={flashCardName}
              onChange={handleChange}
            />
            <Input type='color' sx={{width:24, height: 24}} />

          </Box>
        </Box>
      </Box>
    </Box>
  );
}