import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import Form from './Form';
import Functions from './Functions';
import Display from './Display';
import { Button, Box } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  try: {
    // height: 100%,
    // height: 100% ,
    background: 'linear-gradient(315deg, #63d471 0%, #233329 74%)'
  },
  container: {
    display: 'grid',
    gridTemplateColumns: 'repeat(12, 1fr)',
    gridGap: theme.spacing(3)
  },
  paper: {
    width: '900',
    height: '500px',
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    whiteSpace: 'nowrap',
    marginBottom: theme.spacing(50)
  },
  divider: {
    margin: theme.spacing(2, 0)
  }
}));

function Body() {
  const classes = useStyles();
  return (
    <Grid>
      <Functions />

      <Display />
    </Grid>
  );
}

export default Body;