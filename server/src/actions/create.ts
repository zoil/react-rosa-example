import { Action, SessionDataAccessor, ActionExecResults } from "rosa";
import { ActionParams } from "rosa-shared";
import * as Store from "../store";

const action: Action = {
  name: "create",

  exec(params: ActionParams, session: SessionDataAccessor) {
    Store.create(params.title);
    const result: ActionExecResults = {
      affectedTags: ["*"],
      payload: true
    };
    return result;
  }
};

export default action;
