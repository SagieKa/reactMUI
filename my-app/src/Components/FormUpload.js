import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import AttachFile from '@material-ui/icons/AttachFile';
import Description from '@material-ui/icons/Description';
import axios from 'axios';

const useStyles = makeStyles(theme => ({
  root: {
    '& > *': {
      margin: theme.spacing(0)
    }
  },
  input: {
    display: 'none'
  }
}));

export default function UploadButtons(props) {
  const classes = useStyles();
  const [file, setFile] = React.useState(null);
  const [upload, setUpload] = React.useState(null);
  const [loaded, setloaded] = React.useState(0);
  const nim = e => {
    console.warn(e.target.files);
    let file = e.target.files;
    setUpload(file[0]);
    // click();
  };
  const click = () => {
    const data = new FormData();
    data.append('file', upload);
    console.log(data);
    axios
      .post('http://localhost:8000/upload', data, {
        // receive two    parameter endpoint url ,form data
      })
      .then(res => {
        // then print response status

        console.log(res.data.filename);
        console.log(res.data.filename);
        console.log(res.data.filename);
        console.log(res.data.filename);
        console.log(res.data.filename);
        console.log(res.data.filename);
        console.log(res.data.filename);
        setFile(res.data.filename);
        console.log(res.data.filename);
        props.updateFile(res.data.filename);
      });
    return false;
  };
  return (
    <Grid item xs={4}>
      <input
        accept='image/*'
        className={classes.input}
        id='contained-button-file'
        multiple
        // type='file'
      />
      <label htmlFor='contained-button-file'>
        <Button
          variant='contained'
          color='primary'
          component='span'
          onClick={click}
        >
          Upload
        </Button>
      </label>
      <input
        // accept='*.pdf'
        className={classes.input}
        id='icon-button-file'
        type='file'
        onChange={e => {
          nim(e);
        }}
        // accept='image/*'

        accept='application/pdf'
        name='file'
      />
      <label htmlFor='icon-button-file'>
        <IconButton
          color='primary'
          aria-label='upload picture'
          component='span'
        >
          <Description />
        </IconButton>
      </label>
    </Grid>
  );
}
