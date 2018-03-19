import { ActionDef } from "react-rosa";

export namespace Todo {
  export function toggleAll(status: string): ActionDef {
    return {
      name: "toggleAll",
      params: {
        status
      }
    };
  }

  export function clearCompleted(): ActionDef {
    return {
      name: "clearCompleted",
      params: {}
    };
  }

  export function update(todoId: string, fields: {}): ActionDef {
    return {
      name: "update",
      params: {
        id: todoId,
        fields: fields
      }
    };
  }

  export function remove(id: string): ActionDef {
    return {
      name: "delete",
      params: { id }
    };
  }

  export function create(title: string): ActionDef {
    return {
      name: "create",
      params: {
        title
      }
    };
  }
}
