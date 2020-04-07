import React from 'react';
import { useEffect } from 'react';
import MaterialTable from 'material-table';
import { SvgIconProps } from '@material-ui/core/SvgIcon';

import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
import SaveAlt from '@material-ui/icons/SaveAlt';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Add from '@material-ui/icons/Add';
import Check from '@material-ui/icons/Check';
import FilterList from '@material-ui/icons/FilterList';
import Remove from '@material-ui/icons/Remove';

const db = require('./DB');

export default function MaterialTableDemo(props) {
  var dataDb = [];
  const [state, setState] = React.useState({
    columns: db.columns,
    data: dataDb,
  });
  let requestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  };
  useEffect(() => {
    fetch('http://localhost:8000/getData', requestOptions)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        dataDb = data.result;
        setState({ columns: db.columns, data: dataDb });
      });
  }, []);

  useEffect(() => {
    console.log('hi i am in useafeect-table you change the props?');
    var arr = [...state.data];
    arr.push(...props.updateArr);
    setState({ columns: db.columns, data: arr });
  }, [props.updateArr]);

  return (
    <MaterialTable
      title='Transactions'
      columns={state.columns}
      data={state.data}
      options={{
        rowStyle: (rowData) => {
          if (rowData.type === 'Add') {
            return {
              // background: 'linear-gradient(315deg, #ddffef 0%, #7bed9f 74%)',
              background:
                ' linear-gradient(90deg, rgba(190,255,224,1) 31%, rgba(250,255,253,0.7987570028011204) 100%)',
            };
          }
          if (rowData.type === 'Minus') {
            return {
              background:
                'linear-gradient( 89.5deg,  rgba(246,114,128,1) 0.2%, rgba(248,177,149,1) 90.6% )',
            };
          }

          return {};
        },
      }}
      editable={{
        onRowAdd: (newData) =>
          new Promise((resolve) => {
            setTimeout(() => {
              resolve();
              setState((prevState) => {
                const data = [...prevState.data];
                data.push(newData);
                return { ...prevState, data };
              });
            }, 600);
          }),
        onRowUpdate: (newData, oldData) =>
          new Promise((resolve) => {
            setTimeout(() => {
              resolve();
              if (oldData) {
                setState((prevState) => {
                  const data = [...prevState.data];
                  data[data.indexOf(oldData)] = newData;
                  return { ...prevState, data };
                });
              }
            }, 600);
          }),
        onRowDelete: (oldData) =>
          new Promise((resolve) => {
            setTimeout(() => {
              resolve();
              setState((prevState) => {
                const data = [...prevState.data];
                data.splice(data.indexOf(oldData), 1);
                return { ...prevState, data };
              });
            }, 600);
          }),
      }}
    />
  );
}
