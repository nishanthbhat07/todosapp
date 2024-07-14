// Mutations
import mutationTodoGet from "../get/index";

const MutationsTodoCreate = async ({ tx, args, spaceId }) => {
  const key = `${spaceId}/todo/${args.todoId}`;

  if (await tx.has(key)) throw new Error("Todo already exists");

  const todos = await mutationTodoGet({ tx, args, spaceId });

  return tx.put(key, { ...args, sortOrder: todos?.length });
};

export default MutationsTodoCreate;
