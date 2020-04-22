import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import TrendingUp from '@material-ui/icons/TrendingUp';
import TrendingDown from '@material-ui/icons/TrendingDown';
import BuildIcon from '@material-ui/icons/Build';
import Form from './Form';

const useStyles = makeStyles({
  root: {
    padding: '20px',
    borderRadius: '25px',
    marginBottom: 10,
    marginTop: 20,
  },
});

function Functions(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState(2);
  const [showMEPlus, setshowMEPlus] = React.useState(false);
  const [showMEMinus, setshowMEMinus] = React.useState(false);
  const [transaction, setTransaction] = React.useState('');

  function handelPlus(e) {
    if (!showMEPlus) {
      setshowMEMinus(false);
      setshowMEPlus(true);
    } else {
      setshowMEPlus(false);
    }
  }
  function handelMinus(e) {
    if (!showMEMinus) {
      setshowMEPlus(false);
      setshowMEMinus(true);
    } else {
      setshowMEMinus(false);
    }
  }
  const getTrans = (trans) => {
    setTransaction(trans);
    props.getTransBody(trans);
  };

  return (
    <Grid container>
      <Grid item xs={2}></Grid>
      <Grid item xs={8}>
        <BottomNavigation
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
          showLabels
          className={classes.root}
        >
          <BottomNavigationAction
            label='אחר'
            onClick={handelPlus}
            icon={<BuildIcon />}
          />

          <BottomNavigationAction
            label='הוצאה'
            onClick={handelMinus}
            icon={<TrendingDown />}
          />
          <BottomNavigationAction
            onClick={handelPlus}
            label='הכנסה'
            icon={<TrendingUp />}
          />
        </BottomNavigation>
      </Grid>
      <Grid item xs={2}></Grid>
      {showMEPlus ? (
        <Grid item xs={12}>
          <Form getTrans={getTrans} type={'Add'} />
        </Grid>
      ) : (
        ''
      )}
      {showMEMinus ? (
        <Grid item xs={12}>
          <Form getTrans={getTrans} type={'Minus'} />
        </Grid>
      ) : (
        ''
      )}
    </Grid>
  );
}

export default Functions;
