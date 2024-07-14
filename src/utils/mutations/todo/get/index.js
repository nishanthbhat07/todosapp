const MutationsTodoGet = async ({ tx, args, spaceId }) =>
  tx
    .scan({ prefix: `${spaceId}/todo/` })
    .values()
    .toArray();

export default MutationsTodoGet;
