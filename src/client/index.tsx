require("react-hot-loader/patch");
require("babel-runtime/regenerator");
require("webpack-hot-middleware/client?reload=true");

import * as React from "react";
import * as ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { AppContainer } from "react-hot-loader";

import { Provider } from "react-rosa";

import App from "./components/app";
import Todos from "./containers/todos";

import { configureStore } from "./store";
const store = configureStore();
store.connect();

import "todomvc-common/base.css";
import "todomvc-app-css/index.css";

ReactDOM.render(
  <AppContainer>
    <Provider store={store}>
      <App>
        <Router>
          <Switch>
            <Route path="/:status" component={Todos} />
            <Route path="*" component={Todos} />
          </Switch>
        </Router>
      </App>
    </Provider>
  </AppContainer>,
  document.getElementById("root")
);

if (module.hot) {
  module.hot.accept();
}
