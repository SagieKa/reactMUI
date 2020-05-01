import React from 'react';
import {
  useState,
  useEffect,
  useRef,
  useImperativeHandle,
  forwardRef,
} from 'react';
import DisplayStatus from './DisplayStatus';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import DisplayTable from './DisplayTable';
import DisplayCurrency from './DisplayCurrency';

const useStyles = makeStyles((theme) => ({
  table: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  try: {
    background: 'linear-gradient(315deg, #63d471 0%, #233329 74%)',
  },
  container: {
    display: 'grid',
    gridTemplateColumns: 'repeat(12, 1fr)',
    gridGap: theme.spacing(3),
  },
  paper: {
    width: '400',
    minHeight: '500px',
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    whiteSpace: 'nowrap',
  },
  divider: {
    margin: theme.spacing(2, 0),
  },
  alerts: {
    marginRight: theme.spacing(1),
    marginLeft: theme.spacing(1),
    marginTop: theme.spacing(3),
    borderRadius: '25px',
    textAlign: 'center',
    height: '200px',
  },
}));

const Display = forwardRef((props, ref) => {
  const classes = useStyles();
  const [updateArr, setUpdateArr] = React.useState([]);
  const [sum, setSum] = React.useState({
    Add: 0,
    Minus: 0,
    Total: 0,
  });

  const updateSum = async (sum) => {
    console.log('hi you are in update sum');
    await setSum({ Add: sum.Add, Minus: sum.Minus, Total: sum.Total });
    console.log(sum);
  };

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
      <DisplayCurrency />
      <Grid item xs={8} className={classes.table}>
        <DisplayTable
          updateSum={updateSum}
          trans={props.transactionBody}
          updateArr={updateArr}
        />
      </Grid>
      <DisplayStatus sum={sum} />
    </Grid>
  );
});

export default Display;
