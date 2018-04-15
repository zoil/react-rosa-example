import * as React from "react";
import { connect } from "react-rosa";

import { KEY_ENTER, KEY_ESCAPE } from "../types/keys";
import { Actions } from "../store";

interface Props {
  actions?: {
    create(title: string): void;
  };
}

interface State {
  newTodo: string;
}

class Header extends React.Component<Props, State> {
  private clear() {
    this.setState({ newTodo: "" });
  }

  /**
   * Keep the newTodo value matching the Input element's value.
   */
  private handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    this.setState({ newTodo: event.target.value });
  }

  /**
   * Listen out for certain key presses.
   */
  private handleNewTodoKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    // Handle the ESCAPE key
    if (event.keyCode === KEY_ESCAPE) {
      this.clear();
      event.currentTarget.blur();
      return;
    }

    // Other than that we're just interested in the ENTER key
    if (event.keyCode !== KEY_ENTER) {
      return;
    }

    // Create a new todo.
    event.preventDefault();
    var val = this.state.newTodo.trim();
    if (val) {
      this.props.actions.create(val);
      this.setState({ newTodo: "" });
    }
  }

  constructor(props: Props, context?: any) {
    super(props, context);
    this.handleChange = this.handleChange.bind(this);
    this.handleNewTodoKeyDown = this.handleNewTodoKeyDown.bind(this);
    this.state = {
      newTodo: ""
    };
  }

  render() {
    return (
      <header className="header">
        <h1>todos</h1>
        <input
          className="new-todo"
          placeholder="What needs to be done?"
          value={this.state.newTodo}
          onKeyDown={this.handleNewTodoKeyDown}
          onChange={this.handleChange}
          autoFocus={true}
        />
      </header>
    );
  }
}

function mapActionsToProps(props: Props) {
  return {
    create: (title: string) => Actions.Todo.create(title)
  };
}

export default connect(null, mapActionsToProps)(Header);
