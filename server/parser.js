module.exports.csvParser = (req, res, next) => {
  let fileData = [];
  csv
    .parseFile(req.file.path, { headers: true })
    .on("data", (chunk) => {
      fileData.push(chunk);
    })
    .on("end", () => {
      console.log("on END pooooop file", fileData);
      fs.unlinkSync(req.file.path);
      res.send("<h2>file parsed!</h2>");
    });
};
