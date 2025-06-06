import {
  collection,
  doc,
  query,
  where,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  increment,
  serverTimestamp,
} from "firebase/firestore";
import { fsdb } from "@/libs/firebase";

// export const getQuotes = async () => {
//   const qouteRef = collection(fsdb, "quotes");
//   const snapshot = await getDocs(qouteRef);
//   return snapshot;
// };

export const createQuoteFSDB = async (text: string) => {
  try {
    await addDoc(collection(fsdb, "quotes"), {
      createdAt: serverTimestamp(),
      text,
      votes: 0,
    });
  } catch (error) {
    throw error;
  }
};

export const readQuoteExistsFSDB = async (text: string) => {
  try {
    const q = query(collection(fsdb, "quotes"), where("text", "==", text));
    const snapshot = await getDocs(q);
    return !snapshot.empty;
  } catch (error) {
    // console.error("Error reading user display name exists:", error);
    return false;
  }
};

export const updateQuoteVoteFSDB = async (id: string) => {
  try {
    await updateDoc(doc(fsdb, "quotes", id), {
      votes: increment(1),
    });
  } catch (error) {
    throw error;
  }
};

export const deleteQuoteFSDB = async (id: string) => {
  try {
    await deleteDoc(doc(fsdb, "quotes", id));
  } catch (error) {
    throw error;
  }
};
