import { PublicationShared, PublicationExecResult } from "rosa";
import { QueryParams } from "rosa-shared";
import * as Store from "../store";

const get: PublicationShared = {
  name: "todo",

  exec(params: QueryParams) {
    const todo = Store.get(params.id);
    if (todo) {
      const result: PublicationExecResult = {
        result: todo,
        tags: [`Todo_${params.id}`]
      };
      return result;
    } else {
      throw new Error(`Todo not found with id ${params}`);
    }
  }
};

export default get;
