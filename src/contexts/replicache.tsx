import React, { createContext, ReactNode, useContext, useMemo } from "react";
import { ReadTransaction, Replicache } from "replicache";
import { createReplicacheExpoSQLiteExperimentalCreateKVStore } from "@react-native-replicache/react-native-expo-sqlite";
import EventSource from "react-native-sse";
import { useMMKVStorage } from "react-native-mmkv-storage";
import { BASEURL } from "../apis";
import { mutators } from "../utils/mutators";
import MMKV from "../utils/mmkv";

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

const ReplicacheProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  // const [rep, setRep] = useState<Replicache | null>(null);

  const [listId, setListId] = useMMKVStorage<string | null>(
    "spaceID",
    MMKV,
    null,
  );

  const r = useMemo(
    () =>
      listId &&
      new Replicache({
        licenseKey: process.env.EXPO_PUBLIC_LICENSE_KEY,
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
        setListId,
      }}
    >
      {children}
    </ReplicacheContext.Provider>
  );
};

export default ReplicacheProvider;
