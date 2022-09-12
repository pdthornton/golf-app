import React from 'react'
import { initialCourse, initialPlayers, scorecard } from './initialValues'
import MainScorecardDisplay from './MainScorecardDisplay';
import NavBar from './NavBar';

import { Typography, Paper, AppBar, Toolbar, Grid, ListItem, Divider, Card, CardHeader, CardContent } from '@mui/material';

// need to keep a few things in state and a few things can be set to props(? - state or props for players names)
// State:
    // round info - set once and will not change until reset - wipe clean on reset
    //      - course
    //      - players
        // - 9 or 18 holes 
    // current hole
    // scores of previous holes - update as you submit the scores for the current hole
    // isRoundSetUp - starts as false and renders setup form. When the form is submitted we can set it to false 
    // isRoundFinished - will need to make a final scorecard component that will show up at the end after the last hole
    // probably want one at the end of the front nine



function GolfApp() {
    
    let currentHoleIndex = 3;

    return(
        <Paper
            style={{
                padding: 0,
                margin: 0,
                height: "100vh",
                backgroundColor: "#fafafa",
               
            }}
            elevation={0}
        >
            <NavBar />

            <MainScorecardDisplay 
            name={initialCourse.holes[currentHoleIndex].name} 
            par={initialCourse.holes[currentHoleIndex].par}
            strokeIndex={initialCourse.holes[currentHoleIndex].strokeIndex}
            tee={initialCourse.holes[currentHoleIndex].tee}
            players={initialPlayers}
            />

          
        </Paper>
    )
}

export default GolfApp;