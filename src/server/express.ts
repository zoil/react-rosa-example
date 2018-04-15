import * as express from "express";
import { createServer } from "http";
import * as path from "path";
import { config } from "../../config/webpack.dev";
import * as webpack from "webpack";
import { createRosa } from "./rosa";

const app = express();
// const isProd = process.env.NODE_ENV === "production";
// if (!isProd) {
// const config = require("../../config/webpack.dev.ts");
const compiler = webpack(config);

const webpackDevMiddleware = require("webpack-dev-middleware")(
  compiler,
  config.devServer
);

const webpackHotMiddlware = require("webpack-hot-middleware")(
  compiler,
  config.devServer
);

app.use(webpackDevMiddleware);
app.use(webpackHotMiddlware);
console.log("Middleware enabled");
// }

const staticMiddleware = express.static("dist");
app.use(staticMiddleware);

app.get("*", function(req, res) {
  res.redirect("/");
});

const PORT = 8080;
// server.listen(PORT, () => {
//   console.log(`Server listening on http://localhost:${PORT}`);
// });

const server = createServer(app);

createRosa(server);

server.listen(PORT);

console.log(`Server listening on http://localhost:${PORT}`);
