const MutationsTodoUpdate = async ({ tx, args, spaceId }) => {
  const key = `${spaceId}/todo/${args.todoId}`;

  const prev = await tx.get(key);

  return tx.put(key, { ...prev, ...args });
};

export default MutationsTodoUpdate;
