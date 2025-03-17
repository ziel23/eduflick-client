import {useState, useEffect} from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import Divider from '@mui/material/Divider';
import { Grid2 as Grid, Paper } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { getLeadersBoard } from "../../util/service"


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
    const getLeadersBoardService = async() => {
      const res = await getLeadersBoard()
      setLeaderBoards(res.data)
    }

    getLeadersBoardService()
  }, [])

  const handleClick = (id) => {
    navigate(`/leaders-board/${id}`)
  }

  return (
    <Box sx={{width: '100%', paddingTop: 8 }}>
      <Box sx={{display: 'flex', width: '100%', justifyContent: 'space-between'}}>
        <Typography variant="h4" color="white">Leaderboard</Typography>
      </Box>
      <Box sx={{width: '100%', marginTop: 1}}>
        <Divider sx={{borderColor: "white"}}/>
      </Box>
      <Box sx={{flexGrow: 1, paddingTop: 4}}>
        <Grid container spacing={5}>
            {
                leaderBoards?.map((item) => {
                    return (
                        <Grid size={{xs: 12, sm: 6, md: 4, lg:3, xl: 3}} onClick={()=>handleClick(item.flash_card_id)}>
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
                                    #{item.ranking}
                                </Typography>
                                <Typography variant="h5" >
                                    in
                                </Typography>
                                <Typography 
                                  variant="h4" 
                                  noWrap
                                  sx={{
                                    width: '90%', // Ensures it takes most of the container width
                                    textOverflow: 'ellipsis', // Prevents text from overflowing
                                    whiteSpace: 'nowrap', // Forces text to stay on one line
                                    overflow: 'hidden', // Hides excess text
                                    fontSize: { xs: '1rem', sm: '1.2rem', md: '1.5rem', lg: '1.8rem' }, // Adjusts font size responsively
                                    textAlign: 'center' // Centers the text
                                  }}
                                >
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