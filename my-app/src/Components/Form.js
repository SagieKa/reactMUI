import React from 'react';

import { makeStyles, withTheme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Grid } from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';
import Icon from '@material-ui/core/Icon';

import Button from '@material-ui/core/Button';
import BasicDatePicker from './FormDate';
import UploadButtons from './FormUpload';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: 'white',
    marginTop: 20,
    textAlign: 'center',
    marginBottom: 20,
    '& .MuiTextField-root': {
      margin: theme.spacing(2),
      width: '20ch'
    }
  },
  grid: {
    marginBottom: 8
  },
  end: { margin: 5 }
}));

const banks = [
  {
    name: 'OsharHyal'
  },
  { name: 'Leomi' },
  { name: 'Hapoalim' }
];
const currencies = [
  {
    value: 'ILS',
    label: '₪'
  },
  {
    value: 'USD',
    label: '$'
  },
  {
    value: 'EUR',
    label: '€'
  },
  {
    value: 'BTC',
    label: '฿'
  },
  {
    value: 'JPY',
    label: '¥'
  }
];

export default function Form() {
  const classes = useStyles();
  const [value, setValue] = React.useState('3900');
  const [bank, setBank] = React.useState('OsharHyal');

  const [currency, setCurrency] = React.useState('ILS');

  const handleChange2 = event => {
    setCurrency(event.target.value);
  };

  const handleBank = event => {
    setBank(event.target.value);
  };
  const handleChange = event => {
    setValue(event.target.value);
  };

  return (
    <Grid container className={classes.grid}>
      <Grid item xs={12}>
        <form className={classes.root} noValidate autoComplete='off'>
          <Grid item xs={12}>
            <div>
              <TextField
                id='standard-multiline-flexible'
                label='Amount'
                multiline
                rowsMax='4'
                value={value}
                onChange={handleChange}
              />
              <TextField
                id='standard-select-currency'
                select
                label='Select'
                value={currency}
                onChange={handleChange2}
                helperText='Please select your currency'
              >
                {currencies.map(option => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                id='standard-select-currency'
                select
                label='Select'
                value={bank}
                onChange={handleBank}
                helperText='Please select your Bank'
              >
                {banks.map(bank => (
                  <MenuItem key={bank.name} value={bank.name}>
                    {bank.name}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                id='standard-textarea'
                label='Subject of Amount'
                placeholder='Placeholder'
                multiline
              />
            </div>
          </Grid>
          <Grid item xs={12}>
            <div>
              <TextField
                disabled
                id='standard-multiline-flexible'
                label='Type'
                multiline
                rowsMax='4'
                value={'Add'}
                onChange={handleChange}
              />
              <BasicDatePicker />
            </div>
          </Grid>
          <Grid container className={classes.end}>
            <Grid xs={4}></Grid>
            <UploadButtons />
            <Grid item xs={4}>
              <Button
                variant='contained'
                color='secondary'
                // className={classes.button}
                // endIcon={<Icon>send</Icon>}
              >
                Send
              </Button>
            </Grid>
          </Grid>
          <Grid container></Grid>
        </form>
      </Grid>
    </Grid>

    /* <div>
            <TextField
              id='filled-multiline-flexible'
              label='Multiline'
              multiline
              rowsMax='4'
              value={value}
              onChange={handleChange}
              variant='filled'
            />
            <TextField
              id='filled-textarea'
              label='Multiline Placeholder'
              placeholder='Placeholder'
              multiline
              variant='filled'
            />
            <TextField
              id='filled-multiline-static'
              label='Multiline'
              multiline
              rows='4'
              defaultValue='Default Value'
              variant='filled'
            />
          </div> */
  );
}
