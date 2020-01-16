const path = require('path');
const fs = require('fs');

const dataPath = path.join(__dirname, '../chirps.json');

let chirps = [
  {
    chirp: "Hello World!"
  },
  {
    chirp: "Testing......."
  },
  {
    chirp: "What is up?"
  },
  {
    chirp: "Hey, there!",
  },
  {
    chirp: "Woohoo!!!"
  }
];

fs.appendFileSync(dataPath, JSON.stringify(chirps));
let fileData = fs.readFileSync(dataPath, {encoding: "UTF-8"});
console.log(fileData);
