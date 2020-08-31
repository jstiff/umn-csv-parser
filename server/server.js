const http = require("http");
const fs = require("fs");
const path = require("path");
const express = require("express");
const multer = require("multer");
const csv = require("fast-csv");
const { parse } = require("fast-csv");
const csvParser = require("./parser");
const Router = express.Router;
const { EOL } = require("os");
const upload = multer({ dest: "tmp/csv/" });
const app = express();
const router = new Router();
const server = http.createServer(app);
const PORT = 5000;
const csvFile = path.join(__dirname, "../data/MOCK_DATA_3.csv");

router.post("/", upload.single("csv-file"), csvParser);

app.use("/upload-csv", router);
app.use(express.static("public"));

const startServer = () => {
  server.listen(PORT, () => {
    console.log("Listening on port:", PORT);
  });
};

setImmediate(startServer);

// let responseObj;
// const stream = fs.createReadStream(csvFile);
// stream.pipe(responseObj);
// console.log("pipe", responseObj);
// stream.on("data", () => );
// //stream.on("data", (chunk) => console.log("poop", chunk));
// console.log("stream repsonse", responseObj);
