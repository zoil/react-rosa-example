import * as Express from "express";
import { createServer } from "http";
import * as path from "path";

import { createRosa } from "./rosa";

const app = Express();

app.use("/", Express.static(path.join(__dirname, "../../../../client/dist")));
app.get("*", function(req: Express.Request, res: Express.Response) {
  res.redirect("/");
});

const server = createServer(app);

createRosa(server);

server.listen(8888);

console.log("\n**\n** Now listening on http://127.0.0.1:8888\n**\n");
