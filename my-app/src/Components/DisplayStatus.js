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
import { Alert, AlertTitle } from '@material-ui/lab';
import ImportExportIcon from '@material-ui/icons/ImportExport';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';

import Grid from '@material-ui/core/Grid';

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
    height: '100px',
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    whiteSpace: 'nowrap',
    // marginBottom: theme.spacing(50),
  },
  divider: {
    margin: theme.spacing(2, 0),
  },
  alerts: {
    marginRight: theme.spacing(1),
    marginLeft: theme.spacing(1),
    marginTop: theme.spacing(3),
    borderRadius: 3,
    borderRadius: '25px',
    textAlign: 'center',
    border: 0,
    borderRadius: 3,
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    height: '120px',
  },
}));

export default function DisplayStatus(props) {
  const classes = useStyles();
  const [updateArr, setUpdateArr] = useState([]);

  return (
    <Grid item xs={2}>
      <Alert severity='info' className={classes.alerts}>
        <AlertTitle>מצב חשבון</AlertTitle>
        <Typography variant='h5' gutterBottom>
          <ImportExportIcon fontSize='large' />
          <strong>{props.sum.Total.toLocaleString()}‏ ₪</strong>
        </Typography>
      </Alert>
      <Alert severity='success' className={classes.alerts}>
        <AlertTitle>הכנסות</AlertTitle>
        <Typography variant='h5' gutterBottom>
          <ThumbUpIcon fontSize='large' />{' '}
          <strong>{props.sum.Add.toLocaleString()} ₪</strong>
        </Typography>
      </Alert>
      <Alert severity='error' className={classes.alerts}>
        <AlertTitle>הוצאות</AlertTitle>
        <Typography variant='h5' gutterBottom>
          <ThumbDownIcon fontSize='large' />{' '}
          <strong>{props.sum.Minus.toLocaleString()} ₪</strong>
        </Typography>
      </Alert>
    </Grid>
  );
}
