import { Action, ActionExecResults, SessionDataAccessor } from "rosa";
import { ActionParams } from "rosa-shared";

import * as Store from "../store";

const action: Action = {
  name: "clearCompleted",

  exec(params: ActionParams, session: SessionDataAccessor) {
    const ids = Store.listIds(params.status);

    const affectedTags: string[] = ["*"];
    ids.forEach((id: string) => {
      const todo = Store.get(id);
      if (todo && todo.completed) {
        Store.remove(id);
        affectedTags.push(`Todo_${id}`);
      }
    });

    const result: ActionExecResults = {
      payload: true,
      affectedTags
    };
    return result;
  }
};

export default action;
