import type { WriteTransaction } from "replicache";
import { Todo, listTodos, TodoUpdate } from "./todo";

export const mutators = {
  updateTodo: async (tx: WriteTransaction, update: TodoUpdate) => {
    // In a real app you may want to validate the incoming data is in fact a
    // TodoUpdate. Check out https://www.npmjs.com/package/@rocicorp/rails for
    // some heper functions to do this.
    const prev = await tx.get<Todo>(`todo/${update.id}`);
    const next = { ...prev, ...update };
    await tx.set(`todo/${next.id}`, next);
  },

  deleteTodo: async (tx: WriteTransaction, id: string) => {
    await tx.del(`todo/${id}`);
  },
  // This mutator creates a new todo, assigning the next available sort value.
  //
  // If two clients create new todos concurrently, they both might choose the
  // same sort value locally (optimistically). That's fine because later when
  // the mutator re-runs on the server the two todos will get unique values.
  //
  // Replicache will automatically sync the change back to the clients,
  // reconcile any changes that happened client-side in the meantime, and update
  // the UI to reflect the changes.
  createTodo: async (tx: WriteTransaction, todo: Omit<Todo, "sort">) => {
    const todos = await listTodos(tx);
    todos.sort((t1, t2) => t1.sort - t2.sort);

    const maxSort = todos.pop()?.sort ?? 0;
    await tx.set(`todo/${todo.id}`, { ...todo, sort: maxSort + 1 });
  },
};
export type M = typeof mutators;
