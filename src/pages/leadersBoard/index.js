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

  const navigate = useNavigate();
  const [leaderBoards, setLeaderBoards] = useState([])

  useEffect(() => {
    let sampleData = [
        {id: 1, name: 'Biology Cards', rank: '1', score: 100, total: 100},
        {id: 2, name: 'Science Cards', rank: '4', score: 80, total: 85},
        {id: 3, name: 'Math Cards', rank: '3', score: 99, total: 100},
        {id: 4, name: 'Engineering Cards', rank: '1', score: 75, total: 80},
        {id: 5, name: 'Programmer Cards', rank: '4', score: 69, total: 75},
        {id: 6, name: 'Foods Cards', rank: '5', score: 40, total: 50},
    ]

    setLeaderBoards(sampleData)
  }, [])

  const handleClick = (id) => {
    navigate(`/leaders-board/${id}`)
  }

  return (
    <Box sx={{width: '100%', paddingTop: 8 }}>
      <Box sx={{display: 'flex', width: '100%', justifyContent: 'space-between'}}>
        <Typography variant="h4">Leaderboard</Typography>
      </Box>
      <Box sx={{width: '100%', marginTop: 1}}>
        <Divider/>
      </Box>
      <Box sx={{flexGrow: 1, paddingTop: 4}}>
        <Grid container spacing={5}>
            {
                leaderBoards?.map((item) => {
                    return (
                        <Grid size={3} onClick={()=>handleClick(item.id)}>
                            <Paper 
                                elevation={3} 
                                className={classes.clickablePaper}
                                sx={{
                                    color: 'black', 
                                    height: 380, 
                                    width: '100%', 
                                    display: 'flex', 
                                    flexDirection: 'column', 
                                    alignItems: 'center', 
                                    gap: 2, 
                                    paddingBlock: 1.5,
                                    borderRadius: '25px',
                                    borderColor: 'black',
                                    border: '1px solid'
                                }}>
                                <Typography variant="h3" >
                                    Rank
                                </Typography>
                                <Typography variant="h1" sx={{color: '#3D3369'}}>
                                    #{item.rank}
                                </Typography>
                                <Typography variant="h5" >
                                    in
                                </Typography>
                                <Typography variant="h4" >
                                    {item.name}
                                </Typography>
                                <Typography variant="h3" sx={{fontWeight: 700, color: '#DFC207'}}>
                                    {item.score} / {item.total}
                                </Typography>
                            </Paper>
                        </Grid>
                    )
                })
            }
        </Grid>
      </Box>
    </Box>
  );
}