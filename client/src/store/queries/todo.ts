import { SubscriptionDef } from "react-rosa";

export namespace Todo {
  export function counts(): SubscriptionDef {
    return {
      name: "counts",
      params: {
        status
      }
    };
  }

  export function find(status: string): SubscriptionDef {
    return {
      name: "list",
      params: {
        status
      }
    };
  }

  export function findOne(id: string): SubscriptionDef {
    return {
      name: "todo",
      params: {
        id
      }
    };
  }
}
