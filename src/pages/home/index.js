import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import logo from '../../images/logo.png'
import Card from '@mui/material/Card';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import Divider from '@mui/material/Divider';
import { Grid2 as Grid, Paper } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

export default function HomePage() {
  const navigate = useNavigate();
  return (
    <Box sx={{width: '100%', paddingTop: 8 }}>
      <Box sx={{display: 'flex', width: '100%', justifyContent: 'space-between'}}>
        <Typography variant="h4">Recent Flashcards</Typography>
      </Box>
      <Box sx={{width: '100%', marginTop: 1}}>
        <Divider/>
      </Box>
      <Box sx={{flexGrow: 1, paddingTop: 4}}>
        <Grid container spacing={2}>
          <Grid size={2}>
            <Button sx={{padding: 0}} onClick={()=>navigate('/card')}>
              <Paper elevation={3} sx={{color: 'black', background: '#fff', height: 300, width: '100%'}}>
                <Box sx={{display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'center'}}>
                  <AddIcon sx={{alignSelf: 'center', fontSize: 72, marginBottom: 5}} />
                  <Typography variant="h5" sx={{alignSelf: 'center'}}>Create Flashcard</Typography>
                </Box>
              </Paper>
            </Button>
          </Grid>
          <Grid size={2}>
            <Paper sx={{color: 'black', background: '#D9D9D9', height: 300, width: '100%'}}>
            </Paper>
          </Grid>
          <Grid size={2}>
            <Paper sx={{color: 'black', background: '#D9D9D9', height: 300, width: '100%'}}>
               
            </Paper>
          </Grid>
          <Grid size={2}>
            <Paper sx={{color: 'black', background: '#D9D9D9', height: 300, width: '100%'}}>
            </Paper>
          </Grid>
          <Grid size={2}>
            <Paper sx={{color: 'black', background: '#D9D9D9', height: 300, width: '100%'}}>
            </Paper>
          </Grid>
          <Grid size={2}>
            <Paper sx={{color: 'black', background: '#D9D9D9', height: 300, width: '100%'}}>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}