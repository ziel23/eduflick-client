import {useEffect, useState} from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import logo from '../../images/logo.png'
import Card from '@mui/material/Card';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useNavigate, useSearchParams  } from 'react-router-dom';
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
import EditIcon from '@mui/icons-material/Edit';
import { motion } from "framer-motion";
import { createCard, getCardInfo } from "../../util/service"


export default function CardPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id"); // Get 'filter' from URL
  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.down('sm')); // Using 'sm' breakpoint
  const [name, setName] = useState("");
  const [cards, setCards] = useState(
    [
      // {
      //   question: "",
      //   answer: "",
      //   answerType: 1,
      //   options: "" 
      // },
    //  {
    //   question: "question2",
    //   answer: "answer2",
    //   answerType: 2,
    //   options: ["test1", "test2", "test3", "test4"]
    //  },
    //  {
    //   question: "question3",
    //   answer: "answer3",
    //   answerType: 3,
    //   options: ""
    //  },
    ]
  );
  const [screenType, setScreenType] = useState(1)
  const [cardIndex, setCardIndex] = useState(0)
  const [isFront, setIsFront] = useState(() => false);
  const [editIndex, setEditIndex] = useState(null)
  const [question, setQuestion] = useState("");
  const [answerType, setAnswerType] = useState(null)
  const [answer, setAnswer] = useState("");
  const [options, setOptions] = useState([]);
  const [value, setValue] = useState(options[0]?.value || null);
  const [valueToF, setValueToF] = useState(1);
  const [newOption, setNewOption] = useState("");

  useEffect(() => {
    const getCardInfoService = async () => {
      const res = await getCardInfo(id);
      console.log("[res][getCardInfo]", id, res);
      if(res){
        setName(res.data.flashCardName);
        setCards(res.data.questions)
        setScreenType(0)
      }
    }
    if(id){
      getCardInfoService()
    }
  }, [])
  
  const handleBack = () => {
    if (cardIndex != 0) {
      setCardIndex(cardIndex-1)
    }
  }

  const handleNext = () => {
    if (cardIndex != cards.length - 1) {
      setCardIndex(cardIndex+1)
      setIsFront(false)
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
    console.log("oppt", typeof options);
    
    setOptions([...options, newEntry]);
    setNewOption("");
  };

  const handleChangeToF = (e) => {
    setValueToF(e.target.value)
  }

  const handleFlip = (e) => {
    console.log("[e.target.checked]", e.target.checked);
    
    setIsFront(e.target.checked);
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
    type: answerType,
    options: []
   } 

   if (answerType === 2) {
    sendData.options = options
    sendData.answer = value
   }else if(answerType === 3){
    sendData.options =[{id: 1, label: "True", value: true},{id: 2, label: "False", value: false}]
    sendData.answer = valueToF
   }

   console.log("[sendData]", sendData);
   if (!sendData.question || !sendData.answer) {
    
    alert("Please fill up question completely.")
    return
   }

   let tempCards = [...cards]
   if(editIndex != null) {
    tempCards[editIndex] = sendData
   }else{
    tempCards.push(sendData)
   }
   setCards(tempCards);
   setQuestion("");
   setAnswer("");
   setAnswerType(null);
   setOptions([])
   setIsFront(true)
   setEditIndex(null)
   onCancel();
  }

  const onAddCard = () => {
    setScreenType(1);
    setIsFront(false)
  }

  const onEditCard = (card, index) => {
    setScreenType(1);
    console.log("[card]", card);
    
    setEditIndex(index)
    setQuestion(card.question);
    setAnswerType(card.type);
    if(card.type === 1) {
      setAnswer(card.answer);
    }else if(card.type === 2){
      setOptions(card.options)
      setValue(card.answer)
    }else if(card.type === 2){
      setOptions(card.options)
      setValueToF(card.answer)
    }
  }

  const onCancel = () => {
    setIsFront(false)
    setScreenType(0);
    setQuestion("");
    setAnswer("");
    setAnswerType(null);
    setEditIndex(null)
  }

  const onSaveFlashCard = async () => {
    let sendData = {
      id: id || "",
      name: name,
      questions: cards.map((item) => {
        console.log("[item]", typeof item.options, item.options);
        return {
          ...item,
          options: item.options == "" ? [] : item.options
        }
      })
    }
    
    console.log("[sendData]", sendData);
    const res = await createCard(sendData)
    console.log("[res][createCard]", res);
  }

  console.log("[isFront]", isFront);
  

  return (
    <Box sx={{width: '100%', paddingTop: 4, display: 'flex'}}>
      <Grid container spacing={3} sx={{width: '100%'}}>
        <Grid size={6} sx={{width: '100%'}}>
          <Box sx={{width: '100%'}}>
            <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
              <TextField label="Flashcard Name" variant='filled' color='white' sx={{background: 'white'}} value={name} onChange={(e)=>setName(e.target.value)}/>
              <Box sx={{gap: 2, display: 'inline-flex', alignItems: 'center'}}>
                {isXs 
                  ? <IconButton disabled={screenType === 1} onClick={onAddCard} sx={{background: '#fff', color: '#fede06'}}><AddIcon/></IconButton> 
                  : <Button disabled={screenType === 1} onClick={onAddCard} variant='contained' startIcon={<AddIcon sx={{color: "#fede06"}}/>} sx={{background: 'white', color: 'black'}}>New Card</Button>}
                {isXs 
                ? <IconButton onClick={onSaveFlashCard} disabled={screenType === 1} sx={{background: '#fff', color: 'green'}}><SaveIcon/></IconButton> 
                : <Button onClick={onSaveFlashCard} disabled={screenType === 1} variant='contained' startIcon={<SaveIcon sx={{color: "green"}}/>} sx={{background: 'white', color: 'black'}}>Save</Button>}
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
                  <Typography>Front</Typography>
                  <Switch 
                    checked={isFront} onChange={handleFlip}
                  />
                  <Typography>Back</Typography>
                </Box>
                <Button variant='contained' sx={{width: 90}} onClick={onSave}>Save</Button>
              </Box>
              <Paper sx={{width: '100%', aspectRatio: '2/2.5'}}>
                {
                  !isFront ? (
                    <Box id="question" sx={{width: '100%', height: '100%'}}>
                      <Box sx={{display: 'flex', justifyContent: 'center', borderBottom: '1px solid #c2c2c2'}}>
                        <Typography sx={{fontWeight: 700, padding: 1.5}}>Question</Typography>
                      </Box>
                      <Box sx={{width: '100%', height: '100%'}}>
                        <textarea value={question} placeholder={"Enter your question here."} name="question" onChange={onChangeQuestion} type="text" style={{width: '-webkit-fill-available', height: '100%', resize: 'none' }}/>
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
                <Button variant='contained' sx={{width: 90, visibility: cardIndex <= 0 ? 'hidden' : 'visible'}}onClick={handleBack}>Back</Button>
                <Box sx={{display: 'flex', alignItems: 'center', color: 'white !important'}}>
                  <Typography>Front</Typography>
                  
                  <Switch
                    checked={isFront}
                    onChange={(e) => setIsFront(e.target.checked)}
                    inputProps={{ "aria-label": "controlled" }}
                  />
                  <Typography>Back</Typography>
                </Box>
                <Button variant='contained' sx={{width: 90, visibility: cards.length === cardIndex+1 ? 'hidden' : 'visible'}} onClick={handleNext} >Next</Button>
              </Box>
              <motion.div
                style={{
                  position: "relative",
                  perspective: 1000,
                }}
              >
                <motion.div
                  animate={{ rotateY: isFront ? 180 : 0 }}
                  transition={{ duration: 0.6 }}
                  style={{
                    width: "100%",
                    height: "100%",
                    position: "absolute",
                    transformStyle: "preserve-3d",
                  }}
                >
              { cards.map((card, idx) =>{
                return (
                  <>
                  <Paper 
                    sx={{
                      width: '100%', 
                      aspectRatio: '2/2.5', 
                      display: idx == cardIndex ? "block" : "none",
                      backfaceVisibility: "hidden",
                      position: "absolute",
                    }}
                  >
                    <Box id="question" sx={{width: '100%', height: '100%'}}>
                      <Box sx={{display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #c2c2c2'}}>
                        <Box sx={{width: 40}}/>
                        <Typography sx={{fontWeight: 700, padding: 1.5}}>{"Question"}</Typography>
                        <IconButton onClick={()=>onEditCard(card, idx)}><EditIcon/></IconButton>
                      </Box>
                      <Box sx={{padding: 1.5, width: 'calc(100% - 24px)', height: 'calc(100% - 49px - 24px)', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                        <Typography variant='h6'>{card.question}</Typography>
                      </Box>
                    </Box>
                  </Paper>
                  <Paper 
                    sx={{
                      width: '100%', 
                      aspectRatio: '2/2.5', 
                      display: idx == cardIndex ? "block" : "none",
                      transform: "rotateY(180deg)",
                      backfaceVisibility: "hidden",
                      position: "absolute",
                    }}
                  >
                    <Box id="question" sx={{width: '100%', height: '100%'}}>
                      <Box sx={{display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #c2c2c2'}}>
                        <Box sx={{width: 40}}/>
                        <Typography sx={{fontWeight: 700, padding: 1.5}}>{"Answer"}</Typography>
                        <IconButton onClick={()=>onEditCard(card, idx)}><EditIcon/></IconButton>
                      </Box>
                      <Box sx={{padding: 1.5, width: 'calc(100% - 24px)', height: 'calc(100% - 49px - 24px)', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                        <Typography variant='h6'>{card.answer}</Typography>
                      </Box>
                    </Box>
                  </Paper>
                  </>
                )
                })
              }
               </motion.div>
              </motion.div>
            </Box>}
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}