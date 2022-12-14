import React, { useState, useEffect } from 'react'
import { Paper, TextField, Grid, Card, CardContent, Button, InputLabel, MenuItem, Select, FormControl } from '@mui/material';
import { Player, NumHoles, Course, RoundType } from './commonTypes'
import { courses } from './courses'


interface RoundSetUpFormProps {
    addPlayerToRound: (newPlayerName: Player ) => void,
    players: Player[],
    startNewRound: (numPlayers: number, numHoles: number) => void,
    generateNewScorecard: (numPlayers: number, numHoles: number) => void, 
    setRoundHoles: (roundType: string) => void,
    numHoles: NumHoles
    courseInfo: Course | undefined
    setNewCourse: (newCourse : Course) => void,
}


function RoundSetUpForm({ addPlayerToRound, players, startNewRound, generateNewScorecard, setRoundHoles, numHoles, courseInfo, setNewCourse }: RoundSetUpFormProps): JSX.Element {
    
    const [ playerFormContent, setPlayerFormContent ] = useState("")
    const [ roundContent, setRoundContent ]           = useState("")
    const [ selectedCourse, setSelectedCourse ]       = useState<Course>()
    const [ roundMessage, setRoundMessage]            = useState("")
    

// *************************************************************************************//  

    useEffect(() => {
        if (selectedCourse === undefined) {
            return
        } else {
        setNewCourse(selectedCourse)
        }
    }, [selectedCourse])

    useEffect(() => {
        changeRoundMessage(roundContent)
    }, [roundContent])

// *************************************************************************************//  

    const handlePlayerFormChange = (e : React.ChangeEvent<HTMLInputElement>) => {
        setPlayerFormContent(e.target.value)
    }

    const handleCourseChange = (e : any) => {
        console.log(e.target.value)
        let course = JSON.parse(e.target.value)
        setSelectedCourse(course)
    } 

    const handleRoundChange = (e : any) => {
        setRoundContent(e.target.value)
        console.log('round form changing')
        console.log(e.target.value)
    }

    const changeRoundMessage = (roundString: string) => {
        if (roundString === '9-once') {
            setRoundMessage('9 Holes')
        } else if (roundString === '18-twice') {
            setRoundMessage('18 Holes (round twice)')
        } else if (roundString === '9-front') {
            setRoundMessage('Front 9')
        } else if (roundString === '9-back') {
            setRoundMessage('Back 9')
        } else if (roundString === '18-fullround') {
            setRoundMessage('18 Holes')
        } else {
            setRoundMessage("")
        }
    }
    
    const handlePlayerFormSubmit = (e : React.FormEvent) => {
        e.preventDefault();
        addPlayerToRound(playerFormContent)
        setPlayerFormContent("")
        console.log('submitting player')
    }

    const handleBeginRoundSubmit = () => {
        // if (playerFormContent !== ""){
        //     addPlayerToRound(playerFormContent)
        // }
        if (!players.length) {
            return alert('need some players')
        }
        if (players.length > 4) {
            return alert('how did you select more than 4 players???')
        }
        if (roundContent === "") {
            return alert('need to select a round')
        }
        console.log("handle form submit")
        setRoundHoles(roundContent)
    }

// *************************************************************************************//

    const gridStyles1: React.CSSProperties = { 
        marginTop: "1rem",
        display: "flex",
        flexDirection: "column",
        justifyContent: 'flex-start',
        alignItems: "center",
    }
    
    const gridStyles2: React.CSSProperties = {
        display: "flex",
        flexDirection: "column",
        justifyContent: 'flex-start',
        alignItems: "stretch",
        width: '500px'
    }

    const cardStyles: React.CSSProperties = {
        marginBottom: '1rem', 
        display: "flex",
        flexDirection: "column",
        justifyContent: 'flex-start',
        alignItems: "center" 
    }

    
    const playerNamesStyles: React.CSSProperties = {
        paddingTop: '0',
        display:'block',
        textAlign: 'center',
        fontSize: '1.25rem',
    }

    const roundMessageStyles: React.CSSProperties = {
        paddingTop: '0', 
        display:'block',
        textAlign: 'center',
        fontSize: '1.5rem',
        fontWeight: '700'
    }

    const courseHeading: React.CSSProperties = {
        fontSize: '2.5rem',
    }
    
    const enjoy: React.CSSProperties = {
        textAlign: 'center',
    }
    
// *************************************************************************************//
// conditional redering logic for the form

    let playerForm : JSX.Element = (
            <Paper style={{ margin: "1rem 0", padding: "0.1rem 1rem" }}>
                <form onSubmit={handlePlayerFormSubmit} >
                    <TextField
                        // value={}
                        value={playerFormContent}
                        onChange={handlePlayerFormChange}
                        margin="normal"
                        label="Whose playing?"
                        fullWidth
                    />
                </form>
            </Paper>
        )
    
 
// *************************************************************************************//
// Conditional Menu Options

    let roundOptions
    if (courseInfo === undefined) {
        roundOptions = [
            {roundLabel : '', roundText: ''}, 
        ]
    }
    else if (courseInfo.numHoles === 9) {
        roundOptions = [
            {roundLabel : '9-once', roundText: '9 Holes'},
            {roundLabel : '18-twice', roundText: '18 Holes (twice round)'},
            
        ]
    } else {
        roundOptions = [
            {roundLabel : '18-fullround', roundText: '18 Holes'},
            {roundLabel : '9-front', roundText: 'Front 9'},
            {roundLabel : '9-back', roundText: 'Back 9'},
        ]
    }



const infoCard : JSX.Element = (
    <Card style={cardStyles}>
        <h2 style={courseHeading}>{courseInfo === undefined ? "" : courseInfo.name}</h2>
        <div style={{paddingBottom: "1rem"}}>
            {/* <CardContent style={{paddingTop: '0', display:'block'}}>Number of holes:</CardContent> */}
            <CardContent style={roundMessageStyles}>{ roundMessage === '' ? null : roundMessage }</CardContent>
            
            {players.map((player, i) => 
                <CardContent style={playerNamesStyles}>{i+1}: {player}</CardContent>
            )}
        </div>
    </Card>
)

const courseSelect : JSX.Element = (
                <Paper style={{ margin: "1rem 0", padding: "1rem 1rem" }}>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Select Course</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={selectedCourse}
                            label="Select Course"
                            onChange={handleCourseChange}
                        >
{/* 
                            {for (let course in courses) {
                                <MenuItem value={course}>{course.name}</MenuItem>
                            }} */}

                            {courses.map(course => 
                                <MenuItem value={JSON.stringify(course)}>{course.name}</MenuItem>    // if courses was an array this might work
                            )}
                            
                        </Select>
                    </FormControl>
                </Paper>
)

const holeSelect : JSX.Element = (
                <Paper style={{ margin: "1rem 0", padding: "1rem 1rem" }}>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">How many holes?</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={roundContent}
                            label="How many holes?"
                            onChange={handleRoundChange}
                        >

                            {roundOptions.map(r => 
                                <MenuItem value={r.roundLabel}>{r.roundText}</MenuItem>
                            )}
                            
                        </Select>
                    </FormControl>
                </Paper>
)


// *************************************************************************************//

    return(
        <Grid container style={gridStyles1}>
            <Grid item xs={11} md={8} lg={4} style={gridStyles2}>

                {courseInfo === undefined ? null : infoCard}
                
                {courseSelect}

                {holeSelect}

                {players.length < 4 ? playerForm : null}

                <Button style={{marginBottom: '1rem', marginTop: '1rem'}} variant="contained" onClick={handleBeginRoundSubmit}>
                    SAVE AND BEGIN ROUND
                </Button>

            </Grid>
        </Grid>
    )

}

export default RoundSetUpForm