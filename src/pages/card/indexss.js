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

export default function CardPage() {
  const navigate = useNavigate();
  const [cardOrientation, setCardOrientation] = useState(0)
  const [isCardFlipped, setIsCardFlipped] = useState(0)
  const [cardName, setCardName] = useState("")
  const [cards, setCards] = useState([])
  const [open, setOpen] = useState(false);
  const [modalForm, setModalForm] = useState({question: "", type: 0, answer: '', options: []})

  useEffect(() => {
    const sampleData = {
      cardName: 'Biology FlashCard',
      cards: [
        {
          question: 'What is the biggest animal?',
          type: 0,
          answer: 'Jawu',
          options: ['-']
        },
        {
          question: 'Are you a human?',
          type: 1,
          answer: 'true',
          options: ['true', 'false']
        },
        {
          question: 'What is my name?',
          type: 2,
          answer: 'Jawu',
          options: ['Jawu', 'Kendi', 'Nieziel', 'Wetiwew']
        },
      ]
    }
    setCardName(sampleData['cardName'])
    setCards(sampleData['cards'])
  }, [])

  const handleChange = (e) => {
    const { value } = e.target;
    cardName(value);
  };

  const handleLeft = () => {
    setCardOrientation(cardOrientation - 1)
    setIsCardFlipped(false)
  }

  const handleRight = () => {
    setCardOrientation(cardOrientation + 1)
    setIsCardFlipped(false)
  }

  const handleAddQuestion = () => {
    setOpen(true);
  }

  const handleCloseModal = () => {
    setOpen(false)
  }

  const handleChangeModalForm = (e) => {
    const {name, value} = e.target
    setModalForm((prev)=>({...prev, [name]: value}))
  }

  const handleFlipCard = () => {
    setIsCardFlipped(!isCardFlipped)
  }

  return (
    <Box sx={{width: '100%', paddingTop: 8 }}>
      <Modal
        open={open}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Add Question
          </Typography>
          <Box sx={{display: 'flex', flexDirection: 'column', gap: 2}}>
            <TextField 
              label="Enter Question" 
              variant="outlined" 
              sx={{width: '100%'}}
              value={modalForm.question}
              name={'question'}
              onChange={handleChangeModalForm}
            />
            <Select 
              label="Enter Question Type" 
              variant="outlined" 
              sx={{width: '100%'}}
              value={modalForm.type}
              name={'type'}
              onChange={handleChangeModalForm}
            >
              <MenuItem value="0">Fill in the blank</MenuItem>
              <MenuItem value="1">True or False</MenuItem>
              <MenuItem value="2">Multiple Choice</MenuItem>
            </Select>
            {
              modalForm.type == '0' && (
                <TextField 
                  label="Answer" 
                  variant="outlined" 
                  sx={{width: '100%'}}
                  value={modalForm.answer}
                  name={'answer'}
                  onChange={handleChangeModalForm}
                />
              )
            }
            
            {
              modalForm.type == '1' && (
                <FormControl fullWidth>
                  <Select 
                    labelId="demo-simple-select-label"
                    variant="outlined" 
                    sx={{width: '100%'}}
                    value={modalForm.answer}
                    name={'answer'}
                    onChange={handleChangeModalForm}
                  >
                    <MenuItem value="1">True</MenuItem>
                    <MenuItem value="0">False</MenuItem>
                  </Select>
                </FormControl>
              )
            }

            {
              modalForm.type == '2' && (
                <Select 
                  label="Enter Question" 
                  variant="outlined" 
                  sx={{width: '100%'}}
                  value={modalForm.answer}
                  name={'answer'}
                  onChange={handleChangeModalForm}
                >
                  <MenuItem value="a">True</MenuItem>
                  <MenuItem value="b">False</MenuItem>
                  <MenuItem value="c">False</MenuItem>
                  <MenuItem value="d">False</MenuItem>
                </Select>
              )
            }
            
          </Box>

        </Box>

      </Modal>
      <Grid container spacing={2}>
        <Grid 
          size={6} 
          sx={{
            height: 450, 
          }}>
            <Box
              sx={{
                display: 'flex', 
                justifyContent: 'center',
                flexDirection: 'column',
                alignItems: 'center'
              }}
            >
              <Paper
                sx={{
                  width: '50%',
                  aspectRatio: '2 / 3',
                  display: 'flex',
                  justifyContent: 'center',
                  padding: 3,
                  borderRadius: 8,
                  border: '3px solid',
                  borderColor: isCardFlipped && '#FFDE07',
                  background: isCardFlipped && '#3D3369',
                }}
                elevation={3}
              >
                <Box 
                  sx={{
                    border: '3px solid',
                    width: '100%', 
                    borderRadius: 5,
                    display: "flex",
                    justifyContent: 'center',
                    alignItems: 'center',
                    background: isCardFlipped && '#3D3369',
                    color: isCardFlipped && 'white',
                    borderColor: isCardFlipped &&'#FFDE07',
                  }}
                >
                  {
                    cardOrientation == 0 && <Typography variant='h5' sx={{fontWeight: 600}}>
                      {cardName ? cardName : "Flash Card Name"}
                    </Typography>
                  }
                  {
                    cards?.map((card, idx) => {
                      return (
                        <>
                          {
                            cardOrientation == idx+1 && <Typography variant='h6' sx={{fontWeight: 600}}>
                              {isCardFlipped ? card.answer : card.question}
                            </Typography>
                          }
                        </>
                      )
                    })
                  }
                </Box>
              </Paper>
              <Box sx={{width: '100%', display: 'flex', justifyContent: 'center'}}>
                <IconButton aria-label="arrow left" onClick={handleLeft} sx={{visibility: cardOrientation == 0 && 'hidden'}}>
                  <ArrowCircleLeftIcon sx={{fontSize: 44}}/>
                </IconButton>
                <IconButton aria-label="arrow left" onClick={handleFlipCard} sx={{visibility: cardOrientation == 0 && 'hidden'}}>
                  <FlipIcon sx={{fontSize: 44}}/>
                </IconButton>
                <IconButton aria-label="arrow right" onClick={handleRight} sx={{visibility: (cardOrientation > (cards.length - 1)) && 'hidden'}}>
                  <ArrowCircleRightIcon sx={{fontSize: 44}}/>
                </IconButton>
              </Box>
            </Box>
        </Grid>
        <Grid size={6}>
          
          <TableContainer component={Paper} sx={{marginTop: 2}}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell colSpan={3}>
                    <TextField 
                      label="Enter Flash Card Name" 
                      variant="outlined" 
                      value={cardName}
                      onChange={handleChange}
                      sx={{width: '100%'}}
                    />
                  </TableCell>
                  <TableCell align="right" colSpan={2}>
                    <Button variant="contained" onClick={handleAddQuestion}>Add Question</Button>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="left">No.</TableCell>
                  <TableCell>Question</TableCell>
                  <TableCell>QuestionType</TableCell>
                  <TableCell>Answer</TableCell>
                  <TableCell>Options</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {cards.map((row, idx) => (
                  <TableRow
                    key={idx+1}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {idx+1}
                    </TableCell>
                    <TableCell>{row.question}</TableCell>
                    <TableCell>
                      {row.type == 0 && "Fill in the blank"}
                      {row.type == 1 && "True or False"}
                      {row.type == 2 && "Multiple Choice"}
                    </TableCell>
                    <TableCell>{row.answer}</TableCell>
                    <TableCell>
                      {row.type == 0 && "-"}
                      {row.type == 1 && row.options.join(" ")}
                      {row.type == 2 && (
                        "(A) " + row.options[0] + "\n(B) " + row.options[1] + "\n(C) " + row.options[2] + "\n(D) " + row.options[3]
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </Box>
  );
}