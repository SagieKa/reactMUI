import React from "react";

import { makeStyles, withTheme } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { Grid } from "@material-ui/core";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import BasicDatePicker from "./FormDate";
import UploadButtons from "./FormUpload";
import SaveIcon from "@material-ui/icons/Save";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "white",
    boxShadow: " 0 4px 90px 0 rgba(0, 0, 0, 0.2)",
    borderRadius: "60px",
    marginTop: 20,
    textAlign: "center",
    // direction: 'right',
    marginBottom: 20,
    "& .MuiTextField-root": {
      margin: theme.spacing(2),
      width: "20ch",
    },
  },
  try: {
    textAlign: "right",
    direction: "right",
  },
  grid: {
    marginBottom: 8,
    // direction: 'rtl',
  },
  end: { margin: 5 },
}));

const banks = [
  {
    name: "אוצר החייל",
  },
  { name: "לאומי" },
  { name: "בנק הפועלים" },
];
const currencies = [
  {
    value: "ILS",
    label: "₪",
    id: "0",
  },
  {
    value: "USD",
    label: "$",
    id: "01",
  },
  {
    value: "EUR",
    label: "€",
    id: "27",
  },
  {
    value: "GBP",
    label: "£",
    id: "02",
  },
  {
    value: "JPY",
    label: "¥",
    id: "03",
  },
];

export default function Form(props) {
  const classes = useStyles();
  const [amount, setAmount] = React.useState("0");
  const [ilsAmount, setIlsAmount] = React.useState("0");
  const [bank, setBank] = React.useState("אוצר החייל");
  const [currency, setCurrency] = React.useState("ILS");
  const [subject, setSubject] = React.useState("");
  const [type, setType] = React.useState(props.type);
  const [file, setFile] = React.useState("null");
  const [timeHour, setTimeHour] = React.useState(new Date());
  const [timeDate, setDate] = React.useState(new Date());
  const [getDate, setGetDate] = React.useState("null");
  const [idCurr, setIdCurr] = React.useState(0);
  const [timeDateNow, setTimeDateNow] = React.useState(new Date());

  const getDateToReq = (item) => {
    var year = item.getFullYear().toString();
    var month = item.getMonth() + 1;
    var day = item.getDate();
    if (month < 10) {
      var newMonth = "0" + month.toString();
    } else {
      var newMonth = month.toString();
    }
    if (day < 10) {
      var newDay = "0" + day.toString();
    } else {
      var newDay = day.toString();
    }

    // var day = item.getDate().toString();
    var str = year + newMonth + newDay;
    setGetDate(year + newMonth + day);
    return str;
  };
  const getDateToReqChange = (item) => {
    var year = item.getFullYear().toString();
    var month = item.getMonth() + 1;
    if (month < 10) {
      var newMonth = "0" + month.toString();
    } else {
      var newMonth = month.toString();
    }
    var day = (item.getDate() - 1).toString();
    var str = year + newMonth + day;
    setGetDate(year + newMonth + day);
    return str;
  };
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
  const findCurrID = (name) => {
    if (name.value === currency) {
      return name;
    }
  };
  const handleCurrency = async (event) => {
    setCurrency(event.target.value);
    var id = currencies.find((curr) => {
      if (curr.value === event.target.value) {
        return curr.id;
      }
    }).id;
    setIdCurr(id);
  };
  const handleBank = (event) => {
    setBank(event.target.value);
  };
  const handleAmount = (event) => {
    setAmount(event.target.value);
  };
  const handleSubject = (event) => {
    setSubject(event.target.value);
  };
  const handleType = (event) => {
    setType(event.target.value);
  };

  const send = async (event) => {
    var transaction;
    // console.log('tinedate-1:');
    // console.log((timeDate).getDate());
    var strDate = getDateToReq(timeDate);
    console.log(strDate);

    if (currency === "ILS") {
      setIlsAmount(amount);
      transaction = {
        amount: Number(amount).toFixed(2),
        ilsAmount: Number(amount).toFixed(2),
        currency: currency,
        bank: bank,
        subject: subject,
        type: type,
        timeDate: timeDate,
        timeHour: timeHour,
        timeDateNow: timeDateNow,
        file: file,
      };
    } else {
      let requestOptions = {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      };
      console.log("client currency:");

      var resultRate = false;
      var newDate = new Date(
        timeDate.getFullYear(),
        timeDate.getMonth(),
        timeDate.getDate() - 1
      );
      while (!resultRate) {
        var rate = await fetch(
          `http://localhost:8000/getCurrency/${strDate}/${idCurr}`,
          requestOptions
        )
          .then((res) => {
            return res.json();
          })
          .then(async (data) => {
            resultRate = data.result;

            newDate = new Date(
              newDate.getFullYear(),
              newDate.getMonth(),
              newDate.getDate() - 1
            );

            strDate = await getDateToReq(newDate);

            return data.rate;
          });
      }

      console.log("this is the rate:" + rate);

      transaction = {
        amount: Number(amount).toFixed(2),
        ilsAmount: (rate * Number(amount)).toFixed(2),
        currency: currency,
        bank: bank,
        subject: subject,
        type: type,
        timeDate: timeDate,
        timeHour: timeHour,
        timeDateNow: timeDateNow,
        file: file,
      };
    }
    let requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(transaction),
    };
    fetch("http://localhost:8000/saveData", requestOptions)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data.result) {
          alert("טרנזקציה נקלטה בהצלחה!");
        } else {
          alert("טרנקציה נכשלה , הינך יודע מדוע אולי?");
        }
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
          autoComplete="off"
        >
          <Grid item xs={12}>
            <div>
              <TextField
                label="סכום"
                type="number"
                rowsMax="8"
                textAlign="center"
                value={amount}
                className={classes.try}
                onChange={handleAmount}
              />
              <TextField
                textAlign="right"
                id="standard-select-currency"
                select
                label="בחירה מטבע"
                value={currency}
                onChange={handleCurrency}
                helperText="בחר את המטבע הרצוי"
              >
                {currencies.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                id="standard-select-currency"
                select
                label="בחר בנק"
                value={bank}
                onChange={handleBank}
                helperText="בחר את הבנק הרצוי"
              >
                {banks.map((bank) => (
                  <MenuItem key={bank.name} value={bank.name}>
                    {bank.name}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                id="standard-multiline-flexible"
                label="רשום נושא "
                multiline
                onChange={handleSubject}
              />
            </div>
          </Grid>
          <Grid item xs={12}>
            <div>
              <TextField
                disabled
                id="standard-multiline-flexible"
                label="סוג טרזנקציה"
                multiline
                rowsMax="4"
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
            <Grid item xs={1}></Grid>
            <Grid item xs={5}>
              <Button
                startIcon={<SaveIcon />}
                size="large"
                variant="contained"
                color="primary"
                onClick={() => {
                  send();
                  return false;
                }}
              >
                הוסף טרנזקציה
              </Button>
            </Grid>
            <UploadButtons updateFile={updateFile} />
            <Grid item xs={1}></Grid>
          </Grid>
          <Grid container className={classes.end}></Grid>
        </form>
      </Grid>
    </Grid>
  );
}
