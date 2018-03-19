import { Action, SessionDataAccessor, ActionExecResults } from "rosa";
import { ActionParams } from "rosa-shared";
import * as Store from "../store";

const update: Action = {
  name: "update",

  exec(params: ActionParams, session: SessionDataAccessor) {
    Store.update(params.id, params.fields);
    const result: ActionExecResults = {
      affectedTags: ["*", `Todo_${params.id}`],
      payload: true
    };
    return result;
  }
};

export default update;
