import { Action, ActionExecResults, SessionDataAccessor } from "rosa";
import { ActionParams } from "rosa-shared";

import * as Store from "../store";

const toggleAll: Action = {
  name: "toggleAll",

  exec(params: ActionParams, session: SessionDataAccessor) {
    const ids = Store.listIds(params.status);

    // find any active ones
    let hasActives = false;
    ids.some((id: string) => {
      const todo = Store.get(id);
      if (todo && !todo.completed) {
        hasActives = true;
        return true;
      }
    });

    // update the status on all of them
    const affectedTags: string[] = ["*"];
    ids.forEach((id: string) => {
      const result = Store.update(id, {
        completed: hasActives
      });
      affectedTags.push(`Todo_${id}`);
    });

    const result: ActionExecResults = {
      payload: true,
      affectedTags
    };
    return result;
  }
};

export default toggleAll;
