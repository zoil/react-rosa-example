import { Action, SessionDataAccessor, ActionExecResults } from "rosa";
import { ActionParams } from "rosa-shared";
import * as Store from "../store";

const deleteAction: Action = {
  name: "delete",

  exec(params: ActionParams, session: SessionDataAccessor) {
    Store.remove(params.id);
    const result: ActionExecResults = {
      affectedTags: ["*", `Todo_${params.id}`],
      payload: true
    };
    return result;
  }
};

export default deleteAction;
