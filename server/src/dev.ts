import { createServer } from "http";
import { createRosa } from "./rosa";

function handler(req: any, res: any) {
  res.writeHead(404);
  res.end(false);
}

const server = createServer(handler);

createRosa(server);

server.listen(8888);
