import { PublicationShared, PublicationExecResult } from "rosa";
import { QueryParams } from "rosa-shared";

import * as Store from "../store";

const list: PublicationShared = {
  name: "list",

  exec(params: QueryParams) {
    const ids = Store.listIds(params.status);

    // find any active ones
    let actives: number = 0;
    ids.forEach((id: string) => {
      const todo = Store.get(id);
      if (!todo) return;
      if (!todo.completed) {
        actives++;
      }
    });
    const result: PublicationExecResult = {
      result: {
        actives,
        ids
      },
      tags: ["*"]
    };
    return result;
  }
};

export default list;
