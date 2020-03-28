import React from 'react';
import logo from './logo.svg';
import './App.css';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import Header from './Components/Header';
import { Button, Box } from '@material-ui/core';
import Functions from './Components/Functions';
import Body from './Components/Body';
// background-color: #63d471;
// background-image: linear-gradient(315deg, #63d471 0%, #233329 74%);
// background-color: #0cbaba;
// background-image: linear-gradient(315deg, #0cbaba 0%, #380036 74%);

const useStyles = makeStyles(theme => ({
  try: {
    // height: 100%,
    // height: 100% ,
    background: 'linear-gradient(315deg, #0cbaba 0%, #380036 74%)'
  },
  container: {
    display: 'grid',
    gridTemplateColumns: 'repeat(12, 1fr)',
    gridGap: theme.spacing(3)
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    whiteSpace: 'nowrap',
    marginBottom: theme.spacing(1)
  },
  divider: {
    margin: theme.spacing(2, 0)
  }
}));

function App() {
  const classes = useStyles();
  return (
    <div>
      <Box height='100%' className={classes.try}>
        <Grid container>
          <Header />
        </Grid>

        <Functions />

        <Grid container>
          <Typography variant='subtitle1'>Material-UI Grid:</Typography>
        </Grid>

        <Body />
      </Box>
    </div>
  );
}

// function App() {
//   return (
//     <div className='App'>
//       <Button fullWidth>this is the first button</Button>
//     </div>
//   );
// }

export default App;
