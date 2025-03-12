import {useEffect, useState} from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import { Grid2 as Grid, Input, IconButton, Paper, Select, MenuItem, InputLabel } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { getCardInfo, postCheckAnswers } from "../../util/service"
import { useParams, useNavigate } from "react-router-dom";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Modal from '@mui/material/Modal';
import CloseIcon from '@mui/icons-material/Close';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  display: 'flex',
  gap: 2,
  flexDirection: 'column'
};

export default function TestPage(props) {
  const navigate = useNavigate();
  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.down('sm')); // Using 'sm' breakpoint
  const { id } = useParams(); // Extract `id` from URL
  const [cardName, setCardName] = useState("")
  const [questions, setQuestions] = useState([])
  const [questionIndex, setQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState([])
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    const getCardInfoService = async() => {
      const response = await getCardInfo(id);
      if (response){
        setCardName(response.data.flashCardName);
        setQuestions(response.data.questions);
        setAnswers(Array(response.data.questions.length).fill(""))
      }

    }
    getCardInfoService()
  }, [])

  const handleBackward = () => {
    if(questionIndex != 0){
      setQuestionIndex(questionIndex - 1)
    }
  }

  const handleForward = () => {
    if (questionIndex != questions.length - 1) {
      setQuestionIndex(questionIndex + 1)
    }else{
      handleOpen()
    }
  }

  const onAnswer = (e, idx) => {
    const tempAnswers = [...answers]
    tempAnswers[idx] = e.target.value
    setAnswers(tempAnswers)
  }

  const onSubmit = async() => {
    const sendData = questions.map((item, idx) => {
      return {
        ...item, 
        'answer': answers[idx]
      }
    })
    const response = await postCheckAnswers(sendData, id);
    if(response){
      console.log("[res]", response);
      const data = response.data;
      navigate("/score", { state: { data: data } });
    }
  }
  
  return (
    <Box>
      <Box sx={{width: "100%", display: 'flex', justifyContent: 'center'}}>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Paper sx={style}>
            <Box sx={{padding: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
              <Typography variant='h6'>Answers Summary</Typography>
              <IconButton onClick={handleClose}>
                <CloseIcon/>
              </IconButton>
            </Box>
            <Divider sx={{marginBlock: -2}}/>
            <Box sx={{p: 2}}>
              <Box sx={{display: 'flex', flexDirection: 'column', gap: 2}}>
                {
                  questions?.map((item, idx)=> {
                    return (
                      <Paper sx={{padding: 1}}>
                        <Typography>Q: {item.question}</Typography>
                        <Typography>A: {answers[idx]}</Typography>
                      </Paper>
                    )
                  })
                }
              </Box>
              <Box sx={{width: '100%', display: 'flex', justifyContent: 'space-around', mt: 2}}>
                <Button variant='contained' onClick={onSubmit}>Submit</Button>
              </Box>
            </Box>
          </Paper>
        </Modal>
        <Box sx={{width: isXs ? '100%' : '450px',  display: 'flex', flexDirection: 'column',   gap: 2, marginTop: 2}}>            
          <Box sx={{display: 'flex', justifyContent: 'center'}}>
            <Typography variant='h5' sx={{fontWeight: 700, color:'#fff'}}>{cardName}</Typography>
          </Box>
          <Box sx={{display: 'flex', alignItems: 'center'}} >
            <IconButton  onClick={handleBackward} disabled={questionIndex == 0}>
              <ArrowBackIosIcon />
            </IconButton>
            <Paper sx={{width: '100%', aspectRatio: '2/2.5'}}>
              <Box id="question" sx={{width: '100%', height: '100%'}}>
                <Box sx={{display: 'flex', justifyContent: 'center', borderBottom: '1px solid #c2c2c2'}}>
                  <Typography sx={{fontWeight: 700, padding: 1.5}}>Question</Typography>
                </Box>
                {
                  questions?.map((question, idx) => {
                    return (
                      <Box sx={{width: '100%', height: '100%', display: questionIndex === idx ? "block" : 'none', padding: 2}}>
                        <Typography variant={"h6"} sx={{display: 'flex', justifyContent: 'center', height: '40%'}}>{question.question}</Typography>
                        {
                          question.type == 1 ? (
                            <TextField 
                              sx={{width: 'calc(100% - 32px)'}} 
                              placeholder='Enter Answer here' 
                              label={'Answer'} 
                              value={answers[idx]}
                              onChange={(e)=>onAnswer(e, idx)}
                            />
                          ) : <></>
                        }
                        {
                          question.type == 2 ? (
                              <Box sx={{paddingInline: 4}}>
                                <FormControl>
                                  <FormLabel id="demo-radio-buttons-group-label">Answer</FormLabel>
                                  <RadioGroup
                                    aria-labelledby="demo-radio-buttons-group-label"
                                    name="radio-buttons-group"
                                    sx={{display: 'flex', flexDirection: 'row', gap: 1}}
                                    value={answers[idx]}
                                    onChange={(e)=>onAnswer(e, idx)}
                                  >
                                    <FormControlLabel value={true} control={<Radio />} label="True" />
                                    <FormControlLabel value={false} control={<Radio />} label="False" />
                                  </RadioGroup>
                                </FormControl>
                              </Box>
                          ) : <></>
                        }
                        {
                          question.type == 3 ? (
                              <Box sx={{paddingInline: 4}}>
                                <FormControl>
                                  <FormLabel id="demo-radio-buttons-group-label">Answer</FormLabel>
                                  <RadioGroup
                                    aria-labelledby="demo-radio-buttons-group-label"
                                    name="radio-buttons-group"
                                    sx={{display: 'flex', flexDirection: 'row'}}
                                    value={answers[idx]}
                                    onChange={(e)=>onAnswer(e, idx)}
                                  >
                                    {
                                      question?.options.map((option) => {
                                        return (
                                          <FormControlLabel value={option} control={<Radio />} label={option} />
                                        )
                                      })
                                    }
                                  </RadioGroup>
                                </FormControl>
                              </Box>
                          ) : <></>
                        }
                      </Box>
                    )
                  })
                }
              </Box>
            </Paper>
            <IconButton onClick={handleForward}>
              <ArrowForwardIosIcon />
            </IconButton>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}