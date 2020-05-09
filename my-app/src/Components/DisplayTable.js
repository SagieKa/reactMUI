import React from "react";
import { useEffect } from "react";
import MaterialTable from "material-table";

const db = require("./DB");

export default function MaterialTableDemo(props) {
  var dataDb = [];
  var sumAdd = 0;
  var sumMinus = 0;
  var sumTotal = 0;
  const funcEditTable = async (newData) => {
    let response = await fetch("http://localhost:8000/updateData", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newData),
    });

    let data = await response.json();
    return data;
  };
  const funcDeleteTable = async (id, file) => {
    let response = await fetch(
      `http://localhost:8000/deleteData/${id}/${file}`,
      {
        method: "Delete",
        headers: { "Content-Type": "application/json" },
      }
    );

    let data = await response.json();
    return data;
  };
  const [flagUpdate, setFlagUpdate] = React.useState(0);
  const [state, setState] = React.useState({
    columns: db.columns,
    data: dataDb,
  });

  let requestOptions = {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  };
  let requestOptionsPost = {
    method: "Post",
    headers: { "Content-Type": "application/json" },
  };

  useEffect(() => {
    console.log("hi you in useafeect this is the data:");
    console.log(state.data);
    state.data.map((x) => {
      if (x.type === "הכנסה") sumAdd += Number(x.ilsAmount);
      if (x.type === "הוצאה") sumMinus += Number(x.ilsAmount);
    });
    sumTotal = sumAdd - sumMinus;

    var sum = { Add: sumAdd, Minus: sumMinus, Total: sumTotal };
    props.updateSum(sum);
  }, [state]);
  useEffect(() => {
    fetch("http://localhost:8000/getData", requestOptions)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        dataDb = data.result;
        console.log(dataDb);
        dataDb.map((x) => {
          x.amount = x.amount.toFixed(2);
          x.ilsAmount = x.ilsAmount.toFixed(2);
          if (x.type === "Add") sumAdd += Number(x.ilsAmount);
          if (x.type === "Minus") sumMinus += Number(x.ilsAmount);
        });
        sumTotal = sumAdd - sumMinus;

        var sum = { Add: sumAdd, Minus: sumMinus, Total: sumTotal };
        props.updateSum(sum);

        setState({ columns: db.columns, data: dataDb.reverse() });
      });
  }, []);

  useEffect(() => {
    console.log("hi i am in useafeect-table you change the props?");
    var arr = [...props.updateArr];
    arr.push(...state.data);
    setState({ columns: db.columns, data: arr });
  }, [props.updateArr]);

  return (
    <MaterialTable
      style={{
        borderRadius: "25px",
        padding: "20px",
        boxShadow: " 0 4px 90px 0 rgba(0, 0, 0, 0.2)",
        direction: "right",
        textAlign: "right",
      }}
      localization={{
        body: {
          editRow: {
            deleteText: "?האם הינך בטוח במחיקת הטרנזקציה",
          },
        },
        pagination: {
          labelRowsSelect: "שורות",
          labelDisplayedRows: "{count} of {to}-{from} ",
        },
        header: { actions: "פעולות" },
        toolbar: { searchPlaceholder: "...חפש" },
      }}
      title="טרנזקציות"
      columns={state.columns}
      data={state.data}
      options={{
        showTitle: false,
        search: true,
        searchFieldAlignment: "left",

        rowStyle: (rowData) => {
          if (rowData.type === "הכנסה" || rowData.type === "Add") {
            return {
              background:
                " linear-gradient(90deg, rgba(81,255,156,0.4489146000196954) 55%, rgba(81,255,156,0.2612395299916842) 80%)",
            };
          }
          if (rowData.type === "הוצאה" || rowData.type === "Minus") {
            return {
              background:
                "linear-gradient(90deg, rgba(250,78,78,1) 55%, rgba(250,78,78,0.7906512946975666) 80%)",
            };
          }

          return {};
        },
      }}
      actions={[
        {
          icon: "save_alt",
          tooltip: "Download File",
          onClick: (event, rowData) => {
            if (rowData.file === "null") alert("אין קובץ בטרנזקציה זו ");
            else
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
                  funcEditTable(newData).then((data) => {
                    console.log(data);
                  });

                  const data = [...prevState.data];
                  data[data.indexOf(oldData)] = newData;
                  let num = newData.amount;
                  newData.amount = Number(num);
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
                funcDeleteTable(oldData._id, oldData.file).then((data) => {
                  console.log(data);
                });
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
