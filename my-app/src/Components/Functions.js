import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import { Divider } from '@material-ui/core';
// background-color: #deebdd;
// background-image: linear-gradient(315deg, #deebdd 0%, #bbdbbe 74%);
// background-color: #3bb78f;
// background-image: linear-gradient(315deg, #3bb78f 0%, #0bab64 74%);
// background-color: #63a4ff;
// background-image: linear-gradient(315deg, #63a4ff 0%, #83eaf1 74%);
const useStyles = makeStyles(theme => ({
  paper: {
    backgroundColor: 'white',
    padding: theme.spacing(8),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    whiteSpace: 'nowrap',
    marginBottom: theme.spacing(1)
  },
  divider: {
    margin: theme.spacing(2, 0)
  }
}));

function Functions() {
  const classes = useStyles();
  return (
    <Grid container>
      <Grid item xs={4}>
        <Paper className={classes.paper}>Add</Paper>
      </Grid>
      <Grid item xs={4}>
        <Paper className={classes.paper}>Delete</Paper>
      </Grid>
      <Grid item xs={4}>
        <Paper className={classes.paper}>Another</Paper>
      </Grid>
      {/* <Grid item xs={3}>
        <Paper className={classes.paper}>Another</Paper>
      </Grid> */}
    </Grid>
  );
}

export default Functions;
