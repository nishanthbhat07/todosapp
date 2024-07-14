const MutationsTodoDelete = async ({ tx, args, spaceId }) =>
  tx.del(`${spaceId}/todo/${args}`);

export default MutationsTodoDelete;
