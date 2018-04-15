import { PublicationShared, PublicationExecResult } from "rosa";
import { QueryParams } from "rosa-shared";

import * as Store from "../store";

const list: PublicationShared = {
  name: "counts",

  exec(params: QueryParams) {
    const counts = Store.counts();
    const result: PublicationExecResult = {
      result: counts,
      tags: ["*"]
    };
    return result;
  }
};

export default list;
