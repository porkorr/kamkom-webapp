import { useContext } from "react";
import { FirestoreContext } from "@/context/FirestoreContext";

const useFirestore = () => {
  const context = useContext(FirestoreContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export default useFirestore;
