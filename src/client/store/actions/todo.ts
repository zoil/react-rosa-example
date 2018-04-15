import { ActionDefinition } from "rosa-client";

export namespace Todo {
  export function toggleAll(status: string): ActionDefinition {
    return {
      name: "toggleAll",
      params: {
        status
      }
    };
  }

  export function clearCompleted(): ActionDefinition {
    return {
      name: "clearCompleted",
      params: {}
    };
  }

  export function update(todoId: string, fields: {}): ActionDefinition {
    return {
      name: "update",
      params: {
        id: todoId,
        fields: fields
      }
    };
  }

  export function remove(id: string): ActionDefinition {
    return {
      name: "delete",
      params: { id }
    };
  }

  export function create(title: string): ActionDefinition {
    return {
      name: "create",
      params: {
        title
      }
    };
  }
}
