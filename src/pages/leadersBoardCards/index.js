import {useState, useEffect} from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import logo from '../../images/logo.png'
import Card from '@mui/material/Card';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useNavigate, useParams  } from 'react-router-dom';
import Divider from '@mui/material/Divider';
import { Grid2 as Grid, Paper } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { getLeadersBoardByFlashcard } from "../../util/service"


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
    const { id } = useParams();
  const navigate = useNavigate();
  const [ranks, setRanks] = useState([])

  // useEffect(() => {
  //   let sampleData = [
  //     {name: 'Kendi15', score: 92, total: 100},
  //     {name: 'Jawu67', score: 87, total: 100},
  //     {name: 'Neiziel23', score: 80, total: 100},
  //     {name: 'Rolyn123', score: 75, total: 100},
  //     {name: 'Test213', score: 73, total: 100},
  //   ]
  //   const getLeadersBoardByFlashcardService = async() => {
  //     const response = await getLeadersBoardByFlashcard(id)
  //     setRanks(response.data)
  //   }

  //   return getLeadersBoardByFlashcardService()
  // }, [])

   useEffect(() => {
      const getLeadersBoardByFlashcardService = async() => {
        const res = await getLeadersBoardByFlashcard(id)
        setRanks(res.data)
      }
  
      getLeadersBoardByFlashcardService()
    }, [])

  return (
    <Box sx={{width: '100%', paddingTop: 4, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2}}>
      <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
        <Typography variant="h4">Congratulations! You are</Typography>
        <Typography variant="h6">Rank</Typography>
        <Typography variant='h2' sx={{color: '#3D3369', fontWeight: 700}}>#3</Typography>
        <Typography variant='h6' sx={{color: '#DFC207'}}>Keep the flick going, and you might just click on a top score!</Typography>
      </Box>
      <Box sx={{display: 'flex', flexDirection: 'column', gap: 3, width: '66%', alignItems: 'center'}}>
        {
          ranks.map((rank, index) => (
            <Paper elevation={3} sx={{width: '100%', display: 'flex', justifyContent: 'space-between', height: 60, alignItems: 'center', paddingInline: 2, border: '1px solid', borderRadius: 5}}>
              <Box sx={{width: 50, borderRight: '1px solid'}}>
                <Typography sx={{fontWeight: 700, fontSize: 32, color: '#3D3369'}}>#{index+1}</Typography>
              </Box>
              <Box sx={{width: '75%'}}>
                <Typography sx={{fontSize: 22}}>{rank.username}</Typography>
              </Box>
              <Box sx={{display: 'flex', alignItems: 'center', gap: 1}}>  
                <Typography sx={{fontWeight: 500, fontSize: 18, color: '#3D3369'}}>Score:</Typography>
                <Typography sx={{fontWeight: 700, fontSize: 32, color: '#000'}}>{rank.score}/{rank.total}</Typography>
              </Box>
            </Paper>
          ))
        }
      </Box>
    </Box>
  );
}