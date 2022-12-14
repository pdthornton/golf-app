# Golf Scorecard App

You can view the deployed app here - https://pdthornton.github.io/golf-app/

## Purpose of the App

This app was created to practise using React.

It was created after completing the **The Modern React Bootcamp (Hooks, Context, NextJS, Router)** by Colt Steele. 

https://www.udemy.com/course/modern-react-bootcamp/.

If was also a good chance to start encorporating some newly learned TypeScript skills covered in **Mastering TypeScript - 2022 Edition** by Colt Steele.

https://www.udemy.com/course/learn-typescript/

## Skills Learned/Practised

- React Basics
- props and state with React hooks
- React state management patterns
- DOM events in React
- create forms in React
- using the useEffect hook
- using TypeScript with React
- using Material UI Library

## App Features

The idea was to make a basic golf scorecard app to keep track of scores while playing a round with friends

It has three simple parts to it:

### Setup Form
This is the setup form when it is first opened or after it has been reset from the reset button in the navbar.
  - set the course being played
  - set number of holes (9 or 18, front 9 or back 9)
  - add 1-4 players names
  
### Main Scorecard
When the setup form is completed it will take you to the main functioning scorecard page.

This main scorecard page which will:
  - show the current hole and hole info (par, distance, etc)
  - list the players and have buttons to select the number of shots each has taken on the hole

When scores from all players have been selected there is a button to save scores and jump to the next hole.
  
### Final Scorecard
This is the summary scorecard showing the scores for the all the holes. 

It will automatically show when the round is finished or can be toggled from the Scorecard button on the NavBar
