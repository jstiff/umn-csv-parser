const http = require("http");

const middleWareFunc = (req, res, next) => {
  req.headers.cookie = username = "Paul";
};

const server = http.createServer((req, res, next) => {
  //middleWareFunc(req, res);
  console.log("request object", req.headers);
  res.writeHead(200, { "content-type": "text/html" });
  res.write(
    `<h1>this is pretty cool</h1> <h1>${req.paul}</h1><h3>${req.headers.cookie}</h3>`
  );
  res.end();
});

const port = 5050;
server.listen(port, () => {
  console.log("listening to port:", port);
});
