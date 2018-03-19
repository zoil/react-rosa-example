import * as React from "react";
import { Link } from "react-router-dom";

import { Filters } from "../types/filters";

export default class Footer extends React.Component<{
  completedCount?: number;
  status?: any;
  activeCount?: number;
  onClearCompleted?: () => void;
}> {
  renderClearButton() {
    if (this.props.completedCount === 0) {
      return null;
    }
    return (
      <button className="clear-completed" onClick={this.props.onClearCompleted}>
        Clear completed
      </button>
    );
  }

  render() {
    const nowShowing = this.props.status;

    return (
      <footer className="footer">
        <span className="todo-count">
          <strong>{this.props.activeCount}</strong>{" "}
          {this.props.activeCount === 1 ? "item" : "items"} left
        </span>
        <ul className="filters">
          <li>
            <Link
              to={`/${Filters.All}`}
              className={
                nowShowing === Filters.All || !nowShowing ? "selected" : ""
              }
            >
              All
            </Link>
          </li>{" "}
          <li>
            <Link
              to={`/${Filters.Active}`}
              className={nowShowing === Filters.Active ? "selected" : ""}
            >
              Active
            </Link>
          </li>{" "}
          <li>
            <Link
              to={`/${Filters.Completed}`}
              className={nowShowing === Filters.Completed ? "selected" : ""}
            >
              Completed
            </Link>
          </li>
        </ul>
        {this.renderClearButton()}
      </footer>
    );
  }
}
