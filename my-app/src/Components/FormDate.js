import 'date-fns';
import React from 'react';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker
} from '@material-ui/pickers';

export default function MaterialUIPickers() {
  // The first commit of Material-UI
  const [selectedDate, setSelectedDate] = React.useState(new Date());

  const handleDateChange = date => {
    setSelectedDate(date);
  };

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <KeyboardDatePicker
        disabled
        disableToolbar
        variant='inline'
        format='MM/dd/yyyy'
        margin='normal'
        id='date-picker-inline'
        label='Date Today'
        value={selectedDate}
        onChange={handleDateChange}
        KeyboardButtonProps={{
          'aria-label': 'change date'
        }}
      />
      <KeyboardDatePicker
        margin='normal'
        id='date-picker-dialog'
        label='Date Of Function'
        format='MM/dd/yyyy'
        value={selectedDate}
        onChange={handleDateChange}
        KeyboardButtonProps={{
          'aria-label': 'change date'
        }}
      />
      <KeyboardTimePicker
        margin='normal'
        id='time-picker'
        label='Time Of Function'
        value={selectedDate}
        onChange={handleDateChange}
        KeyboardButtonProps={{
          'aria-label': 'change time'
        }}
      />
    </MuiPickersUtilsProvider>
  );
}
