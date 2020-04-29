const data = [];

const columnsRev = [
  { title: 'סוג', field: 'type' },
  { title: " סכום שערוך בש''ח", field: 'ilsAmount' },
  { title: 'נושא', field: 'subject' },
  { title: 'סכום', field: 'amount' },
  { title: 'סוג מטבע', field: 'currency' },
  { title: 'בנק', field: 'bank' },
  { title: 'זמן העסקה', field: 'timeDate', type: 'date' },
  { title: 'שעת העסקה', field: 'timeHour', type: 'date' },
  { title: 'תאריך', field: 'timeDateNow', type: 'date' },
  // { title: 'File', field: 'file' },
];
const columns = columnsRev.reverse();
const result = [data, columns];

// export default result;
module.exports = {
  data: data,
  columns: columns,
};
