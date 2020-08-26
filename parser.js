const csv = require("csv-parser");
const fs = require("fs");
const results = [];
const path = require("path");

const csvFile = path.join(__dirname, "MOCK_DATA.csv");
const titlesTxt = path.join(__dirname, "./titles.txt");
const umnFile = path.join(__dirname, "UMN_DATA.csv");

fs.createReadStream(csvFile)
  .pipe(csv(["title"]))
  .on("data", (data) => results.push(data))
  .on("end", () => {
    console.log(results.length);
    // let poop = results.forEach((obj) => {
    //   console.log(obj[3]);
    // });
    let poop2 = results.map((obj) => {
      return {
        name: obj[1],
        email: obj[3],
      };
    });
    console.log(poop2);
    //console.log(poop);
    fs.appendFile(titlesTxt, poop2, (err) => {
      if (err) throw err;
      console.log('The "data to append" was appended to file!');
    });
  });
