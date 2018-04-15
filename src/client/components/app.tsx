import * as React from "react";

import Header from "../containers/header";

export default class App extends React.Component {
  render() {
    return (
      <div>
        <section className="todoapp">
          <Header />
          {this.props.children}
        </section>
        <footer className="info">
          <p>Double-click to edit a todo</p>
          <p>
            Created by <a href="http://github.com/zoil/">zoil</a>
          </p>
          <p>
            Part of <a href="http://todomvc.com">TodoMVC</a>
          </p>
        </footer>
      </div>
    );
  }
}
