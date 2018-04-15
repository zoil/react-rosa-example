import * as React from "react";
import * as classNames from "classnames";
import { connect } from "react-rosa";

import { KEY_ESCAPE, KEY_ENTER } from "../types/keys";
import { Actions, Models, Queries } from "../store";

interface Props {
  todoId: string;
  editing: boolean;
  todo?: Models.Todo;
  actions?: {
    toggle: (completed: boolean) => void;
    delete: () => void;
    updateText: (title: string) => void;
  };
  onEdit: (id: string) => void;
}

interface State {
  editTitle: string;
}

class Todo extends React.Component<Props, State> {
  /**
   * Triggers this to kick into edit mode.
   */
  private handleEdit() {
    this.setState({
      editTitle: this.props.todo.title
    });
    this.props.onEdit(this.props.todoId);
  }

  /**
   * Keep the editText value matching the Input element's value.
   */
  private handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    this.setState({ editTitle: event.target.value });
  }

  /**
   * Submits the changed text to the server.
   */
  private handleSubmit() {
    this.props.onEdit("");
    this.props.actions.updateText(this.state.editTitle);
  }

  /**
   * Listen out for certain key presses.
   */
  private handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    // On Enter we submit.
    if (event.keyCode === KEY_ENTER) {
      event.preventDefault();
      event.currentTarget.blur();
    }
  }

  /**
   * Toggle whether the Todo is completed.
   */
  private handleToggle() {
    this.props.actions.toggle(!this.props.todo.completed);
  }

  refs: {
    editField: HTMLInputElement;
  };

  constructor(props: Props) {
    super(props);
    this.state = {
      editTitle: ""
    };

    this.handleEdit = this.handleEdit.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleToggle = this.handleToggle.bind(this);
  }

  /**
   * Safely manipulate the DOM after updating the state when invoking
   * `this.props.onEdit()` in the `handleEdit` method above.
   */
  componentDidUpdate(prevProps: Props) {
    if (!prevProps.editing && this.props.editing) {
      const node = this.refs.editField;
      node.focus();
      node.setSelectionRange(node.value.length, node.value.length);
    }
  }

  render() {
    if (!this.props.todo) {
      return (
        <li>
          <div className="view" style={{ height: 40 }}>
            &nbsp;
          </div>
        </li>
      );
    }
    return (
      <li
        className={classNames({
          completed: this.props.todo.completed,
          editing: this.props.editing
        })}
      >
        <div className="view">
          <input
            className="toggle"
            type="checkbox"
            checked={this.props.todo.completed}
            onChange={this.handleToggle}
          />
          <label onDoubleClick={this.handleEdit}>{this.props.todo.title}</label>
          <button className="destroy" onClick={this.props.actions.delete} />
        </div>
        <input
          ref="editField"
          className="edit"
          autoFocus={this.props.editing ? true : false}
          value={this.state.editTitle}
          onBlur={this.handleSubmit}
          onChange={this.handleChange}
          onKeyDown={this.handleKeyDown}
        />
      </li>
    );
  }
}

/**
 * rosa subscription definitions.
 */
function mapSubscriptionsToProps(props: Props) {
  return {
    todo: Queries.Todo.findOne(props.todoId)
  };
}

/**
 * rosa action definitions.
 */
function mapActionsToProps(props: Props) {
  return {
    delete: Actions.Todo.remove(props.todoId),
    toggle: (completed: boolean) =>
      Actions.Todo.update(props.todoId, {
        completed
      }),
    updateText: (title: string) =>
      Actions.Todo.update(props.todoId, {
        title
      })
  };
}

// Connect the component to rosa.
export default connect(mapSubscriptionsToProps, mapActionsToProps)(Todo);
