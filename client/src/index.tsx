import * as React from "react";
import * as ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import * as RosaClient from "rosa-client";
import { Provider } from "react-rosa";

import App from "./components/app";
import Todos from "./containers/todos";

import { configureStore } from "./store";
const store = configureStore();
store.connect();

import "todomvc-common/base.css";
import "todomvc-app-css/index.css";

ReactDOM.render(
  <Provider store={store}>
    <App>
      <Router>
        <Switch>
          <Route path="/:status" component={Todos} />
          <Route path="*" component={Todos} />
        </Switch>
      </Router>
    </App>
  </Provider>,
  document.getElementById("root")
);
