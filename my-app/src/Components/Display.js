import React from 'react';
import {
  useState,
  useEffect,
  useRef,
  useImperativeHandle,
  forwardRef,
} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import DisplayTable from './DisplayTable';
import Form from './Form';
import Functions from './Functions';
import { Button, Box } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  try: {
    background: 'linear-gradient(315deg, #63d471 0%, #233329 74%)',
  },
  container: {
    display: 'grid',
    gridTemplateColumns: 'repeat(12, 1fr)',
    gridGap: theme.spacing(3),
  },
  paper: {
    width: '900',
    height: '500px',
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    whiteSpace: 'nowrap',
    marginBottom: theme.spacing(50),
  },
  divider: {
    margin: theme.spacing(2, 0),
  },
}));

const Display = forwardRef((props, ref) => {
  const classes = useStyles();
  const [updateArr, setUpdateArr] = useState([]);

  useImperativeHandle(ref, () => ({
    setDisplay(trans) {
      setUpdateArr([...trans]);
    },
  }));

  useEffect(() => {
    console.log('hi i am a user effect in display');
  }, [props.transactionBody]);

  return (
    <Grid container>
      <Grid item xs={1}>
        <Paper className={classes.paper}>updates</Paper>
      </Grid>
      <Grid item xs={10}>
        <DisplayTable trans={props.transactionBody} updateArr={updateArr} />
        {/* <Paper className={classes.paper}>
          what you add is here
          <button type='button' onClick={clicki}>
            clicki
          </button>
          <h1>
            here: {trans}
            {props.transactionBody.map((item) => (
              <h3>{item.type}</h3>
            ))}
          </h1>
          <h1>
            here: {trans}
            {updateArr.map((item) => (
              <h3>{item.amount}</h3>
            ))}
          </h1>
        </Paper> */}
      </Grid>
      <Grid item xs={1}>
        <Paper className={classes.paper}>updates</Paper>
      </Grid>
    </Grid>
  );
});

export default Display;
