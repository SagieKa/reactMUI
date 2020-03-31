import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import AttachFile from '@material-ui/icons/AttachFile';
import Description from '@material-ui/icons/Description';

const useStyles = makeStyles(theme => ({
  // root: {
  //   '& > *': {
  //     margin: theme.spacing(0)
  //   }
  // },
  input: {
    display: 'none'
  }
}));

export default function UploadButtons() {
  const classes = useStyles();

  return (
    <Grid item xs={4}>
      <input
        accept='image/*'
        className={classes.input}
        id='contained-button-file'
        multiple
        type='file'
      />
      <label htmlFor='contained-button-file'>
        <Button variant='contained' color='primary' component='span'>
          Upload
        </Button>
      </label>
      <input
        accept='image/*'
        className={classes.input}
        id='icon-button-file'
        type='file'
      />
      <label htmlFor='icon-button-file'>
        <IconButton
          color='primary'
          aria-label='upload picture'
          component='span'
        >
          {/* <AttachFile /> */}
          <Description />
        </IconButton>
      </label>
    </Grid>
  );
}
