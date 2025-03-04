import {useEffect, useState} from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import logo from '../../images/logo.png'
import Card from '@mui/material/Card';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import Divider from '@mui/material/Divider';
import { Grid2 as Grid, Input, IconButton, Paper, Select, MenuItem, InputLabel } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeftOutlined';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRightOutlined';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Modal from '@mui/material/Modal';
import FormControl from '@mui/material/FormControl';
import FlipIcon from '@mui/icons-material/Flip';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,  
  p: 2,
};

export default function CardViewPage() {
  const navigate = useNavigate();
 
  return (
    <Box sx={{width: '100%', paddingTop: 4 }}>
      <Grid container spacing={2}>
        <Grid 
          size={6}
        >
          <Typography>Card</Typography>
        </Grid>
        <Grid 
          size={6}
        >
          
        </Grid>
      </Grid>
    </Box>
  );
}