import type { ReadTransaction } from "replicache";

export type Todo = {
  id: string;
  text: string;
  completed: boolean;
  sort: number;
};

export type TodoUpdate = Partial<Todo> & Pick<Todo, "id">;

export async function listTodos(tx: ReadTransaction) {
  return tx.scan<Todo>({ prefix: "todo/" }).values().toArray();
}
