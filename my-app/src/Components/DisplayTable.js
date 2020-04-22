import React from 'react';
import { useEffect } from 'react';
import MaterialTable from 'material-table';

const db = require('./DB');

export default function MaterialTableDemo(props) {
  var dataDb = [];
  var sumAdd = 0;
  var sumMinus = 0;
  var sumTotal = 0;
  const [flagUpdate, setFlagUpdate] = React.useState(0);
  const [state, setState] = React.useState({
    columns: db.columns,
    data: dataDb,
  });

  useEffect(() => {
    console.log('hi you in useafeect this is the data:');
    console.log(state.data);
    state.data.map((x) => {
      if (x.type === 'Add') sumAdd += x.amount;
      if (x.type === 'Minus') sumMinus += x.amount;
    });
    sumTotal = sumAdd - sumMinus;

    var sum = { Add: sumAdd, Minus: sumMinus, Total: sumTotal };
    props.updateSum(sum);
  }, [state]);

  let requestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  };
  let requestOptionsPost = {
    method: 'Post',
    headers: { 'Content-Type': 'application/json' },
  };
  useEffect(() => {
    fetch('http://localhost:8000/getData', requestOptions)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        dataDb = data.result;
        console.log(dataDb);
        dataDb.map((x) => {
          if (x.type === 'Add') sumAdd += x.amount;
          if (x.type === 'Minus') sumMinus += x.amount;
        });
        sumTotal = sumAdd - sumMinus;

        var sum = { Add: sumAdd, Minus: sumMinus, Total: sumTotal };
        props.updateSum(sum);

        setState({ columns: db.columns, data: dataDb.reverse() });
      });
  }, []);

  useEffect(() => {
    console.log('hi i am in useafeect-table you change the props?');
    var arr = [...props.updateArr];
    arr.push(...state.data);
    setState({ columns: db.columns, data: arr });
  }, [props.updateArr]);

  return (
    <MaterialTable
      style={{
        borderRadius: '25px',
        padding: '20px',
        boxShadow: ' 0 4px 90px 0 rgba(0, 0, 0, 0.2)',
        direction: 'right',
        textAlign: 'right',
      }}
      icons={
        {
          // Add: (props) => {
          //   return (
          //     <div>
          //       <i className='fa fa-plus'></i> add cheack
          //     </div>
          //   );
          // },
        }
      }
      localization={{
        pagination: {
          labelRowsSelect: 'שורות',
          labelDisplayedRows: '{count} of {to}-{from} ',
        },
        header: { actions: 'פעולות' },
        toolbar: { searchPlaceholder: '...חפש' },
      }}
      title='טרנזקציות'
      columns={state.columns}
      data={state.data}
      options={{
        showTitle: false,
        search: true,
        searchFieldAlignment: 'left',

        // actionsColumnIndex: -1,

        rowStyle: (rowData) => {
          if (rowData.type === 'Add') {
            return {
              background:
                ' linear-gradient(90deg, rgba(81,255,156,0.4489146000196954) 55%, rgba(81,255,156,0.2612395299916842) 80%)',
              // ' linear-gradient(90deg, rgba(190,255,224,1) 31%, rgba(250,255,253,0.7987570028011204) 100%)',
            };
          }
          if (rowData.type === 'Minus') {
            return {
              background:
                'linear-gradient(90deg, rgba(250,78,78,1) 55%, rgba(250,78,78,0.7906512946975666) 80%)',
              //   'linear-gradient(90deg, rgba(250,78,78,1) 55%, rgba(250,78,78,0.7234244039412641) 80%)',
              // background:
              //   'linear-gradient( 89.5deg,  rgba(246,114,128,1) 0.2%, rgba(248,177,149,1) 90.6% )',
            };
          }

          return {};
        },
      }}
      actions={[
        {
          icon: 'save_alt',
          tooltip: 'Download File',
          onClick: (event, rowData) => {
            window.open(`http://localhost:8000/downloadFile/${rowData.file}`);
          },
        },
      ]}
      editable={{
        onRowUpdate: (newData, oldData) =>
          new Promise((resolve) => {
            setTimeout(() => {
              resolve();
              if (oldData) {
                setState((prevState) => {
                  const data = [...prevState.data];
                  data[data.indexOf(oldData)] = newData;
                  console.log('this is newdata:');
                  console.log(newData.amount);
                  let num = newData.amount;
                  newData.amount = Number(num);
                  fetch('http://localhost:8000/updateData', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(newData),
                  });
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
                fetch(`http://localhost:8000/deleteData/${oldData._id}`, {
                  method: 'Delete',
                  headers: { 'Content-Type': 'application/json' },
                });
                data.splice(data.indexOf(oldData), 1);
                setFlagUpdate(1);
                console.log(flagUpdate);
                return { ...prevState, data };
              });
            }, 600);
          }),
      }}
    />
  );
}
