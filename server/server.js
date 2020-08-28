const http = require("http");
const fs = require("fs");
const path = require("path");
const express = require("express");
const multer = require("multer");
const csv = require("fast-csv");
const { parse } = require("fast-csv");
const Router = express.Router;
const { EOL } = require("os");
const upload = multer({ dest: "tmp/csv/" });
const app = express();
const router = new Router();
const server = http.createServer(app);
const PORT = 5000;
const csvFile = path.join(__dirname, "../data/MOCK_DATA_3.csv");

// let responseObj;
// const stream = fs.createReadStream(csvFile);
// stream.pipe(responseObj);
// console.log("pipe", responseObj);
// stream.on("data", () => );
// //stream.on("data", (chunk) => console.log("poop", chunk));
// console.log("stream repsonse", responseObj);

router.post("/", upload.single("csv-file"), (req, res) => {
  const fileData = [];
  //console.log("poop", req);
  //console.log("POST route req.file has been PARSED!!!!!", req.file);
  // opening the uploaded file from user

  //    fs
  //     .createReadStream(req.file.path)
  //     .pipe(parse({ headers: true }))
  //     // .on(
  //     //   "error",
  //     //   res.write("please make sure CSV is formatted correctly before upload")
  //     // )
  //     .on("data", (row) => console.log(row))
  //     .on("end", (rowCount) => {
  //       console.log(`Parsed ${rowCount} rows`);
  //       res.end("parsed data");
  //     });
  //   csv.format({ headers: true });
  csv
    .parseFile(req.file.path, { headers: true })
    .on("data", (chunk) => {
      //console.log(`ROW=${JSON.stringify(chunk)}`);
      fileData.push(chunk);
    })
    .on("end", () => {
      console.log("on END pooooop file", fileData);
      fs.unlinkSync(req.file.path);
      res.end("<h2>file parsed!</h2>");
    });
});

app.use("/upload-csv", router);
app.use(express.static("public"));

const startServer = () => {
  server.listen(PORT, () => {
    console.log("Listening on port:", PORT);
  });
};

setImmediate(startServer);
