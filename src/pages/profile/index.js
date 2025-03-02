import {useState, useEffect} from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import logo from '../../images/logo.png'
import Card from '@mui/material/Card';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import Divider from '@mui/material/Divider';
import { Grid2 as Grid, Paper } from '@mui/material';
import { makeStyles } from '@mui/styles';


const useStyles = makeStyles({
    clickablePaper: {
      cursor: 'pointer',
      '&:hover': {
        backgroundColor: '#f5f5f5',
      },
    },
  });

export default function LeadersBoardPage() {
    const classes = useStyles();


  return (
    <Box sx={{width: '100%', paddingTop: 4 }}>
      <Box sx={{display: 'flex', width: '100%', justifyContent: 'space-between'}}>
        <Typography variant="h4">Profile Page</Typography>
      </Box>
      <Box sx={{width: '100%', marginTop: 1}}>
        <Divider/>
      </Box>
      <Box sx={{flexGrow: 1, paddingTop: 4}}>
        <Grid container spacing={5}>
        </Grid>
      </Box>
    </Box>
  );
}