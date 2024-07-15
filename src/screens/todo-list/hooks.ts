import { useQuery, useQueryClient } from "react-query";
import { useState } from "react";
import { useSubscribe } from "replicache-react";
import { ReadTransaction } from "replicache";
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

  const createSpaceId = async (callback?: () => void) => {
    try {
      const spaceId = await space.create();
      if (spaceId) {
        if (callback) callback?.();
        showToast({
          type: "success",
          text1: "Successfully created new Space ID",
        });
      }
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

export const useTodos = () => {
  const { replicacheInstance } = useReplicache();
  const [todoName, setTodoName] = useState("");

  const deleteTodos = (id: number) => {
    return async () => {
      await replicacheInstance.mutate.deleteTodo({
        id,
      });
    };
  };
  const updateTodos = (id: number, todos: { title: string }) => {
    return async () => {
      await replicacheInstance.mutate.updateTodo({
        id,
        ...todos,
      });
    };
  };

  const addTodos = async () => {
    await replicacheInstance.mutate.createTodo({
      completed: false,
      title: todoName.trim(),
    });
    setTodoName("");
  };

  const toggleTodosCompleted = (id: number, completed: boolean) => {
    return async () => {
      await replicacheInstance.mutate.updateTodo({
        id,
        completed,
      });
    };
  };

  const todos = useSubscribe(
    replicacheInstance,
    async (tx: ReadTransaction) => {
      const list = await tx.scan().values().toArray();
      return list;
    },
    [],
    [replicacheInstance],
  );

  return {
    toggleTodosCompleted,
    addTodos,
    updateTodos,
    deleteTodos,
    todoName,
    setTodoName,
    todos,
  };
};
