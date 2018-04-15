import { QueryDefinition } from "rosa-client";

export namespace Todo {
  export function counts(): QueryDefinition {
    return {
      name: "counts",
      params: {
        status
      }
    };
  }

  export function find(status: string): QueryDefinition {
    return {
      name: "list",
      params: {
        status
      }
    };
  }

  export function findOne(id: string): QueryDefinition {
    return {
      name: "todo",
      params: {
        id
      }
    };
  }
}
