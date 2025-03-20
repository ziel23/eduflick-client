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
import {jwtDecode} from "jwt-decode";
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

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
  const [myRank, setMyRank] = useState(null)
  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.down('sm')); // Using 'sm' breakpoint


   useEffect(() => {
      const getLeadersBoardByFlashcardService = async() => {
        const res = await getLeadersBoardByFlashcard(id)
        setRanks(res.data)
        const token = localStorage.getItem('token');
        console.log("[token]", token);
        if (token) {
          try {
            const decodedToken = jwtDecode(token);
            const myUsername = decodedToken.username
            const rank = res.data.findIndex(item => item.username === myUsername);
            if(rank != -1) {
              setMyRank(rank+1)
            }
          } catch (error) {
            console.error("Invalid token", error);
          }
        }
        
      }
  
      getLeadersBoardByFlashcardService()
    }, [])

  return (
    <Box sx={{width: '100%', paddingTop: 4, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2}}>
      <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
        <Typography 
          variant="h4"
          noWrap
          sx={{
            width: '90%', // Ensures it takes most of the container width
            textOverflow: 'ellipsis', // Prevents text from overflowing
            whiteSpace: 'nowrap', // Forces text to stay on one line
            overflow: 'hidden', // Hides excess text
            fontSize: { xs: '1.2rem', sm: '1.4rem', md: '1.8rem', lg: '1.9rem' }, // Adjusts font size responsively
            textAlign: 'center', // Centers the text
            color: 'white'
          }}
        >
          Congratulations! You are Rank
        </Typography>
        {/* <Typography variant="h6"></Typography> */}
        <Typography variant='h2' sx={{color: '#3D3369', fontWeight: 700}}>#{myRank}</Typography>
        <Typography variant='h6' sx={{color: '#DFC207'}}>Keep the flick going, and you might just click on a top score!</Typography>
      </Box>
      <Box sx={{display: 'flex', flexDirection: 'column', gap: 3, width: isXs ? 'calc(100% - 24px)' : '66%', alignItems: 'center'}}>
        {
          ranks.map((rank, index) => (
            <Paper elevation={3} sx={{width: '100%', display: 'flex', justifyContent: 'space-between', height: 60, alignItems: 'center', paddingInline: 2, border: '1px solid', borderRadius: 5}}>
              <Box sx={{width: 50, borderRight: '1px solid'}}>
                <Typography sx={{fontWeight: 700, fontSize: 32, color: '#3D3369'}}>#{index+1}</Typography>
              </Box>
              <Box sx={{width: '75%'}}>
                <Typography 
                  variant="h4" 
                  noWrap
                  sx={{
                    width: '100%', // Ensures it takes most of the container width
                    textOverflow: 'ellipsis', // Prevents text from overflowing
                    whiteSpace: 'nowrap', // Forces text to stay on one line
                    overflow: 'hidden', // Hides excess text
                    fontSize: { xs: '1rem', sm: '1.2rem', md: '1.5rem', lg: '1.8rem' }, // Adjusts font size responsively
                    paddingLeft: 1,
                  }}
                >
                {rank.username}
                </Typography>
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