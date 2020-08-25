const csv = require("csv-parser");
const fs = require("fs");
const results = [];
const path = require("path");

const csvFile = path.join(__dirname, "MOCK_DATA.csv");
const titlesTxt = path.join(__dirname, "./titles.txt");

fs.createReadStream(csvFile)
  .pipe(csv([]))
  .on("data", (data) => results.push(data))
  .on("end", () => {
    console.log(results.length);
    let poop = results.forEach((obj) => {
      console.log(obj[3]);
    });
    console.log(poop);
    fs.appendFile(titlesTxt, poop, (err) => {
      if (err) throw err;
      console.log('The "data to append" was appended to file!');
    });
  });
