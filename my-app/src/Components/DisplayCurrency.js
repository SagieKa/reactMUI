import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { Alert, AlertTitle } from '@material-ui/lab';
import Divider from '@material-ui/core/Divider';
import Avatar from '@material-ui/core/Avatar';

var img1 = '20161128_223548.jpg';
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
    currency = data.result.slice(0, 4);
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
    maxHeight: '550px',
    borderRadius: 3,
    borderRadius: '25px',
    textAlign: 'center',
    border: 0,
    position: 'sticky',
    borderRadius: 3,
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    // borderRadius: '40px',
  },
  alerts: {
    marginRight: theme.spacing(1),
    marginLeft: theme.spacing(1),
    marginTop: theme.spacing(3),
  },
}));

export default function DisplayCurrency() {
  const classes = useStyles();
  var count = 0;
  var name = '';
  var name2 = '';
  var imgMap = '';
  return (
    // <React.Fragment>
    <Grid item xs={2}>
      {currency.map(({ NAME, RATE, CURRENCYCODE }) => (
        <Alert icon={false} severity='warning' className={classes.alerts}>
          <AlertTitle>
            <Avatar alt='Remy Sharp' src={'img/' + { NAME }.NAME + '.png'} />
          </AlertTitle>
          <Divider />
          {NAME} - {CURRENCYCODE}:<strong>{RATE}</strong>
        </Alert>
      ))}
    </Grid>

    /* <Paper square className={classes.paper}>
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
    </React.Fragment> */
  );
}
