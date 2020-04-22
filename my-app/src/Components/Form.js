import React from 'react';

import { makeStyles, withTheme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Grid } from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import BasicDatePicker from './FormDate';
import UploadButtons from './FormUpload';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: 'white',
    boxShadow: ' 0 4px 90px 0 rgba(0, 0, 0, 0.2)',
    borderRadius: '60px',
    marginTop: 20,
    textAlign: 'center',
    // direction: 'right',
    marginBottom: 20,
    '& .MuiTextField-root': {
      margin: theme.spacing(2),
      width: '20ch',
    },
  },
  try: {
    textAlign: 'right',
    direction: 'right',
  },
  grid: {
    marginBottom: 8,
    // direction: 'rtl',
  },
  end: { margin: 5 },
}));

const banks = [
  {
    name: 'אוצר החייל',
  },
  { name: 'לאומי' },
  { name: 'בנק הפועלים' },
];
const currencies = [
  {
    value: 'ILS',
    label: '₪',
  },
  {
    value: 'USD',
    label: '$',
  },
  {
    value: 'EUR',
    label: '€',
  },
  {
    value: 'BTC',
    label: '฿',
  },
  {
    value: 'JPY',
    label: '¥',
  },
];

export default function Form(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState('3900');
  const [bank, setBank] = React.useState('OsharHyal');
  const [currency, setCurrency] = React.useState('ILS');
  const [subject, setSubject] = React.useState('House');
  const [type, setType] = React.useState(props.type);
  const [file, setFile] = React.useState('null');
  const [timeHour, setTimeHour] = React.useState(new Date());
  const [timeDate, setDate] = React.useState(new Date());
  const [timeDateNow, setTimeDateNow] = React.useState(new Date());

  const updateFile = (file) => {
    setFile(file);
    return false;
  };
  const updateHour = (hour) => {
    setTimeHour(hour.getHours());
  };
  const updateDate = (item) => {
    setDate(item);
  };
  const updateDateNow = (date) => {
    setTimeDateNow(date);
  };

  const handleCurrency = (event) => {
    setCurrency(event.target.value);
  };
  const handleBank = (event) => {
    setBank(event.target.value);
  };
  const handleAmount = (event) => {
    setValue(event.target.value);
  };
  const handleSubject = (event) => {
    setSubject(event.target.value);
  };
  const handleType = (event) => {
    setType(event.target.value);
  };

  const send = (event) => {
    const transaction = {
      amount: Number(value),
      currency: currency,
      bank: bank,
      subject: subject,
      type: type,
      timeDate: timeDate,
      timeHour: timeHour,
      timeDateNow: timeDateNow,
      file: file,
    };
    let requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(transaction),
    };
    fetch('http://localhost:8000/saveData', requestOptions).then((res) => {
      // then print response status
      console.log('sucsess');
    });
    props.getTrans(transaction);
  };

  return (
    <Grid container className={classes.grid}>
      <Grid item xs={1} />
      <Grid item xs={10}>
        <form
          className={classes.root}
          noValidate
          onSubmit={send}
          autoComplete='off'
        >
          <Grid item xs={12}>
            <div>
              <TextField
                id='standard-multiline-flexible'
                label='סכום'
                multiline
                rowsMax='4'
                textAlign='center'
                value={value}
                className={classes.try}
                onChange={handleAmount}
              />
              <TextField
                textAlign='right'
                id='standard-select-currency'
                select
                label='בחירה מטבע'
                value={currency}
                onChange={handleCurrency}
                helperText='בחר את המטבע הרצוי'
              >
                {currencies.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                id='standard-select-currency'
                select
                label='בחר בנק'
                value={bank}
                onChange={handleBank}
                helperText='בחר את הבנק הרצוי'
              >
                {banks.map((bank) => (
                  <MenuItem key={bank.name} value={bank.name}>
                    {bank.name}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                id='standard-multiline-flexible'
                label='רשום נושא '
                multiline
                onChange={handleSubject}
              />
            </div>
          </Grid>
          <Grid item xs={12}>
            <div>
              <TextField
                disabled
                id='standard-multiline-flexible'
                label='סוג טרזנקציה'
                multiline
                rowsMax='4'
                value={props.type}
                onChange={handleType}
              />
              {/* <BasicDatePicker /> */}
              <BasicDatePicker
                updateHour={updateHour}
                updateDate={updateDate}
                updateDateNow={updateDateNow}
              />
            </div>
          </Grid>
          <Grid container className={classes.end}>
            <Grid item xs={4}>
              <Button
                variant='contained'
                color='secondary'
                onClick={() => {
                  send();
                  return false;
                }}
              >
                שלח
              </Button>
            </Grid>
            <UploadButtons updateFile={updateFile} />
            <Grid item xs={4}></Grid>
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
