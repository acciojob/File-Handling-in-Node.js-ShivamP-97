const fs = require('fs');
const readline = require('readline');

const filePath = process.argv[2];
const columnName = process.argv[3];

let sum = 0;
let columnIndex = -1;
let isHeader = true;

if (!filePath || !columnName) {
  console.log('Invalid file path');
  process.exit(0);
}

const stream = fs.createReadStream(filePath);

stream.on('error', () => {
  console.log('Invalid file path');
  process.exit(0);
});

const rl = readline.createInterface({
  input: stream,
  crlfDelay: Infinity
});

rl.on('line', (line) => {
  const values = line.split(',');

  if (isHeader) {
    columnIndex = values.indexOf(columnName);
    isHeader = false;
    return;
  }

  if (columnIndex !== -1) {
    const value = parseFloat(values[columnIndex]);
    if (!isNaN(value)) {
      sum += value;
    }
  }
});

rl.on('close', () => {
  if (columnIndex === -1) {
    console.log(0);
  } else {
    console.log(sum);
  }
});
