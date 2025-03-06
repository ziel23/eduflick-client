import {useEffect, useState} from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import logo from '../../images/logo.png'
import Card from '@mui/material/Card';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import Divider from '@mui/material/Divider';
import { Grid2 as Grid, Input, IconButton, Paper, Select, MenuItem, InputLabel, Radio, Switch } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import SaveIcon from '@mui/icons-material/Save';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

export default function CardPage() {
  const navigate = useNavigate();
  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.down('sm')); // Using 'sm' breakpoint
  const [cards, setCards] = useState([
    {
      question: "question",
      answer: "answer",
      answerType: 1,
      options: "" 
     },
     {
      question: "question2",
      answer: "answer2",
      answerType: 2,
      options: ["test1", "test2", "test3", "test4"]
     },
     {
      question: "question3",
      answer: "answer3",
      answerType: 3,
      options: ""
     },
  ]);
  const [screenType, setScreenType] = useState(0)
  const [cardIndex, setCardIndex] = useState(0)
  const [isFront, setIsFront] = useState(true);
  const [question, setQuestion] = useState("");
  const [answerType, setAnswerType] = useState(null)
  const [answer, setAnswer] = useState("");
  const [options, setOptions] = useState([]);
  const [value, setValue] = useState(options[0]?.value || null);
  const [valueToF, setValueToF] = useState(1);
  const [newOption, setNewOption] = useState("");

  const handleBack = () => {
    if (cardIndex != 0) {
      setCardIndex(cardIndex-1)
    }
  }

  const handleNext = () => {
    if (cardIndex != cards.length - 1) {
      setCardIndex(cardIndex+1)
    }
  }

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const handleLabelChange = (id, newLabel) => {
    setOptions((prevOptions) =>
      prevOptions.map((option) =>
        option.id === id ? { ...option, value: newLabel.toLowerCase() } : option
      )
    );
  };

  const handleAddOption = () => {
    const normalizedNewOption = newOption.trim().toLowerCase();
    if (normalizedNewOption === "") return;
  
    const isDuplicate = options.some(
      (option) => option.value.toLowerCase() === normalizedNewOption
    );
  
    if (isDuplicate) {
      alert("Option already exists!");
      return;
    }
  
    const newId = options.length + 1;
    const newEntry = { id: newId, label: newOption, value: normalizedNewOption };
    setOptions([...options, newEntry]);
    setNewOption("");
  };

  const handleChangeToF = () => {
    setValueToF()
  }

  const handleFlip = () => {
    setIsFront(!isFront);
  }

  const onChangeQuestion = (e) => {
    setQuestion(e.target.value)
  }

  const onChangeAnswer = (e) => {
    setAnswer(e.target.value)
  }

  const onChangeAnswerType = (type) => {
    setAnswerType(type)
    setAnswer("")
    setValue(null)
    setValueToF(null)
  }

  const onSave = () => {
   let sendData = {
    question: question,
    answer: answer,
    answerType: answerType,
    options: "" 
   } 
   if (answerType === 2) {
    sendData.options = options
    sendData.answer = value
   }else if(answerType === 3){
    sendData.options =[{id: 1, label: "True", value: true},{id: 2, label: "False", value: false}]
    sendData.answer = valueToF
   }
   let tempCards = [...cards]
   tempCards.push(sendData)
   setCards(tempCards)
  }

  const onAddCard = () => {
    setScreenType(1);
  }

  const onCancel = () => {
    setScreenType(0);
  }

  return (
    <Box sx={{width: '100%', paddingTop: 4, display: 'flex'}}>
      <Grid container spacing={3} sx={{width: '100%'}}>
        <Grid size={6} sx={{width: '100%'}}>
          <Box sx={{width: '100%'}}>
            <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
              <TextField label="Flashcard Name" variant='filled' color='white'/>
              <Box sx={{gap: 2, display: 'inline-flex', alignItems: 'center'}}>
                {isXs ? <IconButton onClick={onAddCard} sx={{background: '#fff', color: '#fede06'}}><AddIcon/></IconButton> : <Button onClick={onAddCard} variant='contained' startIcon={<AddIcon sx={{color: "#fede06"}}/>} sx={{background: 'white', color: 'black'}}>New Card</Button>}
                {isXs ? <IconButton sx={{background: '#fff', color: 'green'}}><SaveIcon/></IconButton> : <Button variant='contained' startIcon={<SaveIcon sx={{color: "green"}}/>} sx={{background: 'white', color: 'black'}}>Save</Button>}
              </Box>
            </Box>
          </Box>
        </Grid>
        <Grid size={12}>
          <Box sx={{width: "100%", display: 'flex', justifyContent: 'center'}}>
            {screenType ? <Box sx={{width: isXs ? '100%' : '350px',  display: 'flex', flexDirection: 'column', gap: 2}}>            
              <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
                <Button onClick={onCancel} variant='contained' sx={{width: 90}} disabled={cards.length <= 0}>Cancel</Button>
                <Box sx={{display: 'flex', alignItems: 'center', color: 'white !important'}}>
                  <Typography>Front</Typography><Switch value={isFront} onChange={handleFlip}/><Typography>Back</Typography>
                </Box>
                <Button variant='contained' sx={{width: 90}} onClick={onSave}>Save</Button>
              </Box>
              <Paper sx={{width: '100%', aspectRatio: '2/2.5'}}>
                {
                  isFront ? (
                    <Box id="question" sx={{width: '100%', height: '100%'}}>
                      <Box sx={{display: 'flex', justifyContent: 'center', borderBottom: '1px solid #c2c2c2'}}>
                        <Typography sx={{fontWeight: 700, padding: 1.5}}>Question</Typography>
                      </Box>
                      <Box sx={{width: '100%', height: '100%'}}>
                        <textarea value={question} name="question" onChange={onChangeQuestion} type="text" style={{width: '-webkit-fill-available', height: '100%', resize: 'none' }}/>
                      </Box>
                    </Box>
                  ) : (
                    <Box sx={{ height: '100%', width: '100%'}}>
                      {
                        answerType === null && (<>
                            <Box sx={{display: 'flex', justifyContent: 'center'}}>
                              <Typography sx={{fontWeight: 700, padding: 1.5}}>Answer Type</Typography>
                            </Box>
                            <Divider/>
                            <Button onClick={()=>onChangeAnswerType(1)} variant='contained' sx={{width: '100%', background: '#fff', color: 'black', border: 'none', boxShadow: 'none', paddingBlock: 1.5}}>
                              <Typography fontSize={14}>Fill in the Blank</Typography>
                            </Button>
                            <Divider/>
                            <Button onClick={()=>onChangeAnswerType(2)} variant='contained' sx={{width: '100%', background: '#fff', color: 'black', border: 'none', boxShadow: 'none', paddingBlock: 1.5}}>
                              <Typography fontSize={14}>Multiple Choice</Typography>
                            </Button>
                            <Divider/>
                            <Button onClick={()=>onChangeAnswerType(3)} variant='contained' sx={{width: '100%', background: '#fff', color: 'black', border: 'none', boxShadow: 'none', paddingBlock: 1.5}}>
                              <Typography fontSize={14}>True or False</Typography>
                            </Button>
                            <Divider/>
                          </>)
                      }
                      {
                        answerType === 1 && (<>
                            <Box sx={{display: 'flex'}}>
                              <IconButton onClick={()=>onChangeAnswerType(null)}>
                                <ArrowBackIosIcon/>
                              </IconButton>
                              <Typography sx={{fontWeight: 700, padding: 1.5}}>Fill in the Blank</Typography>
                            </Box>
                            <Box sx={{width: '100%', height: '100%'}}>
                              <textarea value={answer} name="answer" onChange={onChangeAnswer} type="text" style={{width: '-webkit-fill-available', height: '100%', resize: 'none' }}/>
                            </Box>
                          </>)
                      }
                      {
                        answerType === 2 && (<>
                            <Box sx={{display: 'flex'}}>
                              <IconButton onClick={()=>onChangeAnswerType(null)}>
                                <ArrowBackIosIcon/>
                              </IconButton>
                              <Typography sx={{fontWeight: 700, padding: 1.5}}>Multiple Choice</Typography>
                            </Box>
                            <Divider/>
                            <Box sx={{display: 'flex', width: '100%', paddingInline: 4, marginTop: 3}}>
                              <FormControl>
                                <RadioGroup value={value} onChange={handleChange}>
                                  {options.map((option) => (
                                    <Box key={option.id} display="flex" alignItems="center">
                                      <FormControlLabel
                                        value={option.value}
                                        control={<Radio />}
                                      />
                                      <TextField
                                        size="small"
                                        variant="outlined"
                                        value={option.label}
                                        onChange={(e) => handleLabelChange(option.id, e.target.value)}
                                        sx={{width: '100%'}}
                                      />
                                    </Box>
                                  ))}
                                </RadioGroup>
                                <Box mt={2} display="flex" gap={1}>
                                  <Button variant="contained" onClick={handleAddOption}>
                                    Add
                                  </Button>
                                  <TextField
                                    size="small"
                                    variant="outlined"
                                    placeholder="Add new option"
                                    value={newOption}
                                    onChange={(e) => setNewOption(e.target.value)}
                                  />
                                </Box>
                              </FormControl>
                            </Box>
                          </>)
                      }
                      {
                        answerType === 3 && (<>
                            <Box sx={{display: 'flex'}}>
                              <IconButton onClick={()=>onChangeAnswerType(null)}>
                                <ArrowBackIosIcon/>
                              </IconButton>
                              <Typography sx={{fontWeight: 700, padding: 1.5}}>True or False</Typography> 
                            </Box>
                            <Divider/>
                            <Box sx={{display: 'flex', width: '100%', paddingInline: 4, marginTop: 3}}>
                              <FormControl>
                                <RadioGroup value={valueToF} onChange={handleChangeToF}>
                                  {[{id: 1, label: "True", value: true},{id: 2, label: "False", value: false}].map((option) => (
                                    <Box key={option.id} display="flex" alignItems="center">
                                      <FormControlLabel
                                        value={option.value}
                                        control={<Radio />}
                                        label={option.label}
                                      />
                                    </Box>
                                  ))}
                                </RadioGroup>
                              </FormControl>
                            </Box>
                          </>)
                      }
                    </Box>
                  )
                }
              </Paper>
            </Box> : <Box sx={{width: isXs ? '100%' : '350px',  display: 'flex', flexDirection: 'column', gap: 2}}>
              <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
                <Button variant='contained' sx={{width: 90}} disabled={cards.length <= 0} onClick={handleBack}>Back</Button>
                <Box sx={{display: 'flex', alignItems: 'center', color: 'white !important'}}>
                  <Typography>Front</Typography><Switch value={isFront} onChange={handleFlip}/><Typography>Back</Typography>
                </Box>
                <Button variant='contained' sx={{width: 90}} onClick={handleNext} >Next</Button>
              </Box>
              { cards.map((card, idx) =>{
                console.log("[card]", idx, cardIndex, idx == cardIndex);
                
                return (
                  <Paper 
                    sx={{
                      width: '100%', 
                      aspectRatio: '2/2.5', 
                      display: idx == cardIndex ? "block" : "none",
                      transformStyle: "preserve-3d",
                      transition: "transform 1s",
                      transform: !isFront ? "rotateY(0deg)" : "rotateY(360deg)",
                    }}
                  >
                    <Box id="question" sx={{width: '100%', height: '100%'}}>
                      <Box sx={{display: 'flex', justifyContent: 'center', borderBottom: '1px solid #c2c2c2'}}>
                        <Typography sx={{fontWeight: 700, padding: 1.5}}>{isFront ? "Question" : "Answer"}</Typography>
                      </Box>
                      <Box sx={{width: '100%', height: '100%'}}>
                        <Typography>{isFront ? card.question : card.answer}</Typography>
                      </Box>
                    </Box>
                  </Paper>
                )
                })
              }
            </Box>}
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}