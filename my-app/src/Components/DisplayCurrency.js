import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import MoneyIcon from '@material-ui/icons/Money';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import AccountBalanceRoundedIcon from '@material-ui/icons/AccountBalanceRounded';
import Fab from '@material-ui/core/Fab';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import Avatar from '@material-ui/core/Avatar';
import MenuIcon from '@material-ui/icons/Menu';
import AddIcon from '@material-ui/icons/Add';
import SearchIcon from '@material-ui/icons/Search';
import MoreIcon from '@material-ui/icons/MoreVert';
import axios from 'axios';

let requestOptions = {
  method: 'GET',
  headers: { 'Content-Type': 'application/json' },
};
const text = {
  color: 'red',
};
var currency = [];
const getCurrency = fetch('http://localhost:8000/getCurrency', requestOptions)
  .then((res) => {
    return res.json();
  })
  .then((data) => {
    currency = data.result.slice(0, 7);
    console.log(data.result);
  });

const useStyles = makeStyles((theme) => ({
  text: {
    padding: theme.spacing(2, 2, 0),
  },
  text: { color: '#808080' },
  paper: {
    backgroundColor: '#ffd699',
    marginRight: theme.spacing(1),
    marginLeft: theme.spacing(1),
    marginTop: theme.spacing(3),

    // color: '#ffa31a',
    minHeight: '650px',
    borderRadius: 3,
    borderRadius: '25px',
    textAlign: 'center',
    border: 0,
    position: 'sticky',
    borderRadius: 3,
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    // borderRadius: '40px',
  },
  list: {
    marginBottom: theme.spacing(2),
  },
}));

export default function DisplayCurrency() {
  const classes = useStyles();
  var count = 0;

  return (
    <React.Fragment>
      {/* <CssBaseline /> */}
      <Paper square className={classes.paper}>
        <Typography className={classes.text} variant='h5' gutterBottom>
          <strong>
            Currency-News <AccountBalanceRoundedIcon />
          </strong>
        </Typography>
        <List className={classes.list}>
          {currency.map(({ NAME, RATE, CURRENCYCODE, person }) => (
            <React.Fragment>
              <ListItem button>
                <ListItemAvatar>
                  <Avatar alt='Profile Picture' src={person} />
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Typography variant='h6' style={{ color: '#cc7a00' }}>
                      <strong>
                        {' '}
                        {NAME}-{CURRENCYCODE}
                      </strong>
                    </Typography>
                  }
                  secondary={
                    <Typography style={{ color: '#cc7a00' }}>{RATE}</Typography>
                  }
                />
              </ListItem>
              <Divider />
            </React.Fragment>
          ))}
        </List>
      </Paper>
    </React.Fragment>
  );
}
