import React, { createContext, ReactNode, useContext, useMemo } from "react";
import { ReadTransaction, Replicache } from "replicache";
import { createReplicacheExpoSQLiteExperimentalCreateKVStore } from "@react-native-replicache/react-native-expo-sqlite";
import EventSource from "react-native-sse";
import { BASEURL } from "../apis";
import { Space } from "../utils/space";
import { mutators } from "../utils/mutators";

const ReplicacheContext = createContext(null);

export const useReplicache = () => useContext(ReplicacheContext);

export type Todo = {
  id: string;
  title: string;
  completed: boolean;
  sort: number;
};

export async function listTodos(tx: ReadTransaction) {
  return (await tx.scan().values().toArray()) as Todo[];
}

const space = new Space(BASEURL);

const ReplicacheProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  // const [rep, setRep] = useState<Replicache | null>(null);

  const [listId, setListId] = React.useState<string | null>(null);

  const r = useMemo(
    () =>
      listId &&
      new Replicache({
        licenseKey: "lfa8c867aa0fb4591bd15debe67232835",
        pushURL: `${BASEURL}/api/replicache/push?spaceID=${listId}`,
        pullURL: `${BASEURL}/api/replicache/pull?spaceID=${listId}`,
        name: listId,
        mutators,
        experimentalCreateKVStore:
          createReplicacheExpoSQLiteExperimentalCreateKVStore,
        logLevel: __DEV__ ? "debug" : "info",
      }),
    [listId],
  );

  React.useEffect(() => {
    if (listId !== null) return;
    const createList = async () => {
      const abc = await space.create();
      setListId(abc);
    };
    createList();
  }, [listId]);

  React.useEffect(() => {
    // Note: React Native doesn't support SSE; this is just a polyfill.
    // You probably want to setup a WebSocket connection via Pusher.
    const ev = new EventSource(
      `${BASEURL}/api/replicache/poke?spaceID=${listId}`,
      {
        headers: {
          withCredentials: true,
        },
      },
    );

    ev.addEventListener("message", async (evt) => {
      if (evt.type !== "message") return;
      if (evt.data === "poke") {
        await r.pull();
      }
    });

    return () => {
      ev.close();
    };
  }, [listId]);

  return (
    <ReplicacheContext.Provider
      value={{
        replicacheInstance: r,
        listId,
      }}
    >
      {children}
    </ReplicacheContext.Provider>
  );
};

export default ReplicacheProvider;
