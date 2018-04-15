import { Todo } from "../models";

let todosNextId: number = 1;
const todos: { [key: string]: Todo } = {};

export function counts(): { completed: number; active: number } {
  let completed: number = 0;
  let active: number = 0;
  for (let id in todos) {
    const todo: Todo = todos[id];
    if (!todo) continue;
    if (todo.completed) {
      completed++;
    } else {
      active++;
    }
  }
  return { completed, active };
}

export function listIds(status: string): string[] {
  let ids: string[] = [];
  let condition: ((todo: Todo) => boolean) = () => true;
  switch (status) {
    case "completed":
      condition = (todo: Todo) => todo.completed;
      break;
    case "active":
      condition = (todo: Todo) => !todo.completed;
      break;
  }

  for (let id in todos) {
    if (condition(todos[id])) {
      ids.push(todos[id].id.toString());
    }
  }

  return ids;
}

export function get(id: string): Todo {
  return todos[id];
}

export function update(id: string, fields: {}) {
  const todo = get(id);
  todos[id] = { ...todo, ...fields };
}

export function remove(id: string) {
  delete todos[id];
}

export function create(title: string) {
  const todo: Todo = Object.create(null);
  todo.id = (todosNextId++).toString();
  todo.title = title;
  todo.completed = false;
  todos[todo.id] = todo;
}

// create demo todos
const demoTodos: string[] = [
  "This is a todo",
  "And this is another one",
  "That's the third one!"
];
demoTodos.forEach((text: string, index: number) => {
  create(text);
});
