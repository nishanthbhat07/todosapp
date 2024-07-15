import { useQuery, useQueryClient } from "react-query";
import { fetchAllSpaceIds } from "./api";
import { useReplicache } from "../../contexts/replicache";
import { space } from "../../utils/space";
import { showToast } from "../../utils/toast";

export const useSpaceIDList = () => {
  const { setListId } = useReplicache();
  const { data: { data: { spaceIds = [] } = {} } = {} } = useQuery(
    ["spaceids"],
    fetchAllSpaceIds,
    {
      staleTime: Infinity,
      cacheTime: Infinity,
    },
  );

  const queryClient = useQueryClient();

  const createSpaceId = async () => {
    try {
      const spaceId = await space.create();
      if (spaceId)
        showToast({
          type: "success",
          text1: "Successfully created new Space ID",
        });
      queryClient.invalidateQueries({ queryKey: ["spaceids"] });
      setListId(spaceId);
    } catch (e) {
      showToast({
        type: "error",
        text1: "Failed while creating new Space ID",
        text2: e,
      });
      console.error("SpaceID", e);
    }
  };
  return { spaceIds, createSpaceId };
};
