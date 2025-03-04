import {useEffect, useState} from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import Divider from '@mui/material/Divider';
import { Grid2 as Grid, Input, IconButton, Paper, Select, MenuItem, InputLabel } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeftOutlined';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRightOutlined';
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

export default function CardPage(props) {

  return (
    <Box
        sx={{
        display: 'flex', 
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center',
        width: "100%"
        }}
    >
        <Paper
        sx={{
            width: "70%",
            aspectRatio: '2 / 3',
            display: 'flex',
            justifyContent: 'center',
            padding: 3,
            borderRadius: 8,
            border: '3px solid',
        }}
        elevation={3}
        >
        <Box
            sx={{
            borderRadius: 5,
            width: '100%',
            border: '3px solid',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            }}
        >
            {
                props?.cardName
            }
        </Box>
        </Paper>
    </Box>
  );
}