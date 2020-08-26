const http = require("http");
const fs = require("fs");

const express = require("express");
const multer = require("multer");
const csv = require("fast-csv");

const Router = express.Router;

const upload = multer({ dest: "tmp/csv/" });
const app = express();
const router = new Router();
const server = http.createServer(app);
const PORT = 5000;

router.post("/", upload.single("csv-file"), (req, res) => {
  const fileData = [];
  console.log("POST route req.file", req.file);
  // opening the uploaded file from user
  csv
    .parseFile(req.file.path)
    .on("data", (chunk) => {
      fileData.push(chunk);
    })
    .on("end", () => {
      console.log("on END file", fileData);
      fs.unlinkSync(req.file.path);
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
