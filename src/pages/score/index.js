import { Box, Grid2 as Grid, Typography, Paper, Button } from "@mui/material";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import DonutChart from "./DonutChart";
import { postAddLeaderBoard } from "../../util/service"

function ScoreScreen() {
	const navigate = useNavigate();
	const location = useLocation();
	const score = location.state?.score ?? 0;
	const [cardName, setCardName] = useState("")
	const [cardId, setCardId] = useState("")
	const [questions, setQuestions] = useState([])
	const [data, setData] = useState([])
	console.log("[testxxxx]", location.state);

	useEffect(()=>{
		let tempData = location.state.data
		setCardName(tempData.flashCardName)
		setCardId(tempData.id)
		setQuestions(tempData.results)
		setData({
			correct: tempData.results.filter((item) => item.isCorrect).length,
			incorrect: tempData.results.filter((item) => !item.isCorrect).length
		})
	}, [location.state])

	const handleAddLeaderBoard = async () => {
		try {
			const sendData = {
				flashcardId: cardId,
				score: data.correct,
			}
			
			const response = await postAddLeaderBoard(sendData)
			if (response) {
				navigate(`/leaders-board/${cardId}`)
			}
		} catch (error) {
			console.log("[error]", error);
			
		}
	}
	

	return (
    <Box sx={{width: '100%', paddingBlock: 8 }}>
			<Grid container>
				<Grid size={{sm:12, md: 5}}>
					<Typography variant="h4" sx={{fontWeight: 700, marginBottom: 2, color: 'white'}}>{cardName + "'s Summary"}</Typography>
					<DonutChart chartData={data}/>
				</Grid>
				<Grid size={{sm:12, md: 7}}>
					<Box sx={{marginBottom: 2, color: 'white'}}>
						<Typography variant="h4" sx={{fontWeight: 700, maxWidth: 500}}>You have completed the Test. Good Job!</Typography>
					</Box>
					<Box sx={{display: 'flex', width: '100%', justifyContent: 'flex-end'}}>
						<Button variant="contained" sx={{background: '#3d3369'}} onClick={handleAddLeaderBoard}>Add Score to Leaderboard</Button>
					</Box>
					<Box sx={{display: 'flex', flexDirection: 'column', gap: 2, maxHeight: 450, overflowY: questions.length > 5 ? 'scroll' : 'auto', mt: 2}}>
						<Typography sx={{color: 'white'}}>Let's see how you did</Typography>
						{
							questions?.map((item, idx)=> {
								return (
									<Paper sx={{padding: 1}}>
										<Typography>Question: {item.question}</Typography>
										<Box sx={{display: 'flex', justifyContent: 'space-between'}}>
											<Typography>Your Answer: {item.answer}</Typography>
											<Typography sx={{width: 200}}>Correct Answer: {item.correctAnswer}</Typography>
										</Box>
									</Paper>
								)
							})
						}
					</Box>
				</Grid>
			</Grid>
		</Box>
	);
}

export default ScoreScreen;
