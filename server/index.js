const cfg = require("./config");
const server = require("./server");

server.listen(cfg.port, function () {
  console.log(`Starting KURACADO at http://localhost:${cfg.port}`);
});
