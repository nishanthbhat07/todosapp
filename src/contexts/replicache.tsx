import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { Replicache } from "replicache";

const ReplicacheContext = createContext(null);

export const useReplicache = () => useContext(ReplicacheContext);

const ReplicacheProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [rep, setRep] = useState(null);

  useEffect(() => {
    const replicache = new Replicache({
      name: "app-name",
      licenseKey: "YOUR_REPLICACHE_LICENSE_KEY",
      pullURL: "https://your-server.com/replicache/pull",
      pushURL: "https://your-server.com/replicache/push",
      mutators: {
        addTodo: async (tx, { id, text }) => {
          await tx.put(`todo/${id}`, { id, text, completed: false });
        },
        // Define other mutators here
      },
    });

    setRep(replicache);

    return () => {
      rep.close();
    };
  }, []);

  return (
    <ReplicacheContext.Provider value={rep}>
      {children}
    </ReplicacheContext.Provider>
  );
};

export default ReplicacheProvider;
