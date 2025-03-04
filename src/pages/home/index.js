import {useState} from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import logo from '../../images/logo.png'
import Card from '@mui/material/Card';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import Divider from '@mui/material/Divider';
import { Grid2 as Grid, IconButton, Paper } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import Popper from '@mui/material/Popper';


export default function HomePage() {
  const navigate = useNavigate();
  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.down('sm')); // Using 'sm' breakpoint
  const [hover, setHover] = useState(null);
  const [cards, setCards] = useState([
    {
      name: 'Card 1',
      id: 1
    },
    {
      name: 'Card 2',
      id: 2
    },
    {
      name: 'Card 3',
      id: 3
    },
    {
      name: 'Card 4',
      id: 4
    },
    {
      name: 'Card 5',
      id: 5
    },
    {
      name: 'Card 6',
      id: 6
    },
    {
      name: 'Card 7',
      id: 7
    }
  ])

  const [anchorEl, setAnchorEl] = useState(null);

  console.log('isXs:', isXs); // Log the value to check
  
  const handleClick = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popper' : undefined;

  return (
    <Box sx={{width: '100%', paddingTop: 8 }}>
      <Box sx={{display: 'flex', width: '100%', justifyContent: 'space-between'}}>
        <Typography variant="h4" color='white'>Recent Flashcards</Typography>
        
        <Box>
          {
            isXs ? <IconButton sx={{background: '#fff', color: '#3098c6'}}><AddIcon/></IconButton>
                 : <Button startIcon={<AddIcon/>} variant='contained' sx={{background: 'white', fontWeight: 700, color: '#3098c6'}}>{!isXs && "Create Flashcard"}</Button>
          }
        </Box>
      </Box>
      <Box sx={{width: '100%', marginTop: 1}}>
        <Divider/>
      </Box>
      <Box sx={{flexGrow: 1, paddingTop: 4}}>
        <Grid container spacing={2}>
          {
            cards?.map((card) => {
              return (
                <Grid 
                  size={{ xs: 12, sm: 6, md: 4, lg: 2, xl: 2 }}
                >
                  {/* <Button sx={{borderRadius: 3, background: '#fff',aspectRatio: "2/2.5", width: '100%'}}> */}
                    <Paper 
                      sx={{display: 'inline-flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', borderRadius: 3, background: '#fff', aspectRatio: "2/2.5", width: '100%'}}
                      onMouseEnter={() => setHover(card.id)}
                      onMouseLeave={() => {setHover(null); setAnchorEl(null)}}
                    >
                      {hover == card.id ? (
                        <Box
                          sx={{
                            width: '100%',
                            height: 'calc(100% - 10px)',
                            borderRadius: 3,
                            backgroundColor: 'rgba(255, 255, 255, 0.8)', // Semi-transparent background
                            position: 'relative',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}
                        >
                          <Box
                            sx={{
                              position: 'absolute',
                              borderRadius: 3,
                              display: 'flex',
                              flexDirection: 'column',
                              alignItems: 'center',
                              justifyContent: 'center',
                              gap: 2
                            }}
                          >
                            <Button variant='contained' sx={{width: '100px', background: '#3D3369'}}
                              onClick={()=>navigate(`/card?id=${card.id}`)}
                            >
                              Edit
                            </Button>
                            <Button 
                              variant='contained' 
                              sx={{width: '100px', background: '#fff', color: '#000'}}
                              aria-describedby={id} type="button" onClick={handleClick}
                            >
                              Share
                            </Button>
                            <Popper id={id} open={open} anchorEl={anchorEl} placement='right-start'>
                              <Paper elevation={3} sx={{ p: 2, display: 'flex', flexDirection: 'column', gap: 1}}>
                                <Typography>Link</Typography>
                                <TextField value={`https://localhost:3000/test/${card.id}`}/>
                                <Button variant='contained'>Copy Link</Button>
                              </Paper>
                            </Popper>
                            <Button variant='contained' sx={{width: '100px', background: '#DFC207'}}>
                              Test
                            </Button>
                          </Box>
                        </Box>
                      ) : <Typography>{card.name}</Typography>
                    }
                    </Paper>
                  {/* </Button> */}
                </Grid>
              )
            })
          }
          
          {/* <Grid size={{ xs: 12, sm: 6, md: 4, lg: 2, xl: 2 }}>
          <Paper sx={{color: 'black', background: '#fff', aspectRatio: "2/2.5", width: '100%', borderRadius: 5}}>
            </Paper>
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 4, lg: 2, xl: 2 }}>
          <Paper sx={{color: 'black', background: '#fff', aspectRatio: "2/2.5", width: '100%', borderRadius: 5}}>
            </Paper>
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 4, lg: 2, xl: 2 }}>
          <Paper sx={{color: 'black', background: '#fff', aspectRatio: "2/2.5", width: '100%', borderRadius: 5}}>
            </Paper>
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 4, lg: 2, xl: 2 }}>
          <Paper sx={{color: 'black', background: '#fff', aspectRatio: "2/2.5", width: '100%', borderRadius: 5}}>
            </Paper>
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 4, lg: 2, xl: 2 }}>
          <Paper sx={{color: 'black', background: '#fff', aspectRatio: "2/2.5", width: '100%', borderRadius: 5}}>
            </Paper>
          </Grid> */}
        </Grid>
      </Box>
    </Box>
  );
}