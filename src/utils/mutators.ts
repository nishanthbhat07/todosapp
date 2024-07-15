import type { WriteTransaction } from "replicache";
import { Todo, listTodos, TodoUpdate } from "./todo";

export const mutators = {
  updateTodo: async (tx: WriteTransaction, update: TodoUpdate) => {
    const prev = await tx.get<Todo>(`todo/${update.id}`);
    const next = { ...prev, ...update };
    await tx.set(`todo/${next.id}`, next);
  },

  deleteTodo: async (tx: WriteTransaction, id: string) => {
    await tx.del(`todo/${id}`);
  },
  createTodo: async (tx: WriteTransaction, todo: Omit<Todo, "sort">) => {
    const todos = await listTodos(tx);
    todos.sort((t1, t2) => t1.sort - t2.sort);

    const maxSort = todos.pop()?.sort ?? 0;
    await tx.set(`todo/${todo.id}`, { ...todo, sort: maxSort + 1 });
  },
};
export type M = typeof mutators;
