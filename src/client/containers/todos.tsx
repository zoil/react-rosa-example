import * as React from "react";
import { connect } from "react-rosa";
import { Redirect } from "react-router-dom";

import { Filters, ValidFilters } from "../types/filters";
import { Actions, Queries } from "../store";

import Todo from "./todo";
import Footer from "../components/footer";

interface Props {
  match: {
    params: {
      status: string;
    };
  };
  counts: { completed: number; active: number };
  todos: {
    actives: number;
    ids: string[];
  };
  actions: {
    toggleAll: () => void;
    clearCompleted: () => void;
  };
}

interface State {
  editing?: string;
}

class Todos extends React.Component<Props, State> {
  /**
   * Dispatch an action to clear all completed Todos.
   */
  private clearCompleted() {
    this.props.actions.clearCompleted();
  }

  /**
   * Dispatch an action to toggle all Todos on the screen.
   */
  private toggleAll() {
    this.props.actions.toggleAll();
  }

  /**
   * Defines which Todo will be edited.
   */
  private onEdit(id: string) {
    this.setState({
      editing: id
    });
  }

  /**
   * Render a Todo.
   */
  private renderTodo(id: string) {
    return (
      <Todo
        todoId={id}
        key={id}
        onEdit={this.onEdit}
        editing={this.state.editing === id}
      />
    );
  }

  /**
   * Renders the list of Todos.
   */
  private renderTodoList() {
    if (this.props.todos.ids.length === 0) {
      return null;
    }

    return (
      <ul className="todo-list">{this.props.todos.ids.map(this.renderTodo)}</ul>
    );
  }

  /**
   * Renders the section below the Todos list.
   */
  private renderFooter() {
    if (this.props.counts.completed + this.props.counts.active === 0) {
      return null;
    }
    return (
      <Footer
        completedCount={this.props.counts.completed}
        activeCount={this.props.counts.active}
        status={this.props.match.params.status}
        onClearCompleted={this.clearCompleted}
      />
    );
  }

  /**
   * Render the Toggle-all button.
   */
  private renderToggleAll() {
    if (this.props.counts.completed + this.props.counts.active === 0) {
      return null;
    }
    return (
      <div>
        <input
          className="toggle-all"
          type="checkbox"
          onChange={this.toggleAll}
          checked={this.props.todos.actives > 0}
        />
        <label htmlFor="toggle-all" onClick={this.toggleAll}>
          Mark all as complete
        </label>
      </div>
    );
  }

  constructor(props: Props) {
    super(props);
    this.state = { editing: "" };
    this.toggleAll = this.toggleAll.bind(this);
    this.clearCompleted = this.clearCompleted.bind(this);
    this.onEdit = this.onEdit.bind(this);
    this.renderTodo = this.renderTodo.bind(this);
  }

  render() {
    // Enforce that the status is valid.
    if (
      !this.props.match.params.status ||
      ValidFilters.indexOf(this.props.match.params.status) === -1
    ) {
      return <Redirect to={`/${Filters.All}`} />;
    } else if (!this.props.counts || !this.props.todos) {
      return null;
    }
    // at this point we have a valid status
    return (
      <div>
        <section className="main">
          {this.renderToggleAll()}
          {this.renderTodoList()}
        </section>
        {this.renderFooter()}
      </div>
    );
  }
}

/**
 * rosa subscription definitions.
 */
function mapSubscriptionsToProps(props: Props) {
  return {
    counts: Queries.Todo.counts(),
    todos: Queries.Todo.find(props.match.params.status)
  };
}

/**
 * rosa action definitions.
 */
function mapActionsToProps(props: Props) {
  return {
    toggleAll: Actions.Todo.toggleAll(props.match.params.status),
    clearCompleted: Actions.Todo.clearCompleted()
  };
}

// Connect the component to rosa.
export default connect(mapSubscriptionsToProps, mapActionsToProps)(Todos);
