import { doc, updateDoc, setDoc } from "firebase/firestore";
import { fsdb } from "@/libs/firebase";

export const createUserFSDB = async (uid: string, userData: Record<string, any>) => {
  try {
    await setDoc(doc(fsdb, "users", uid), userData);
  } catch (err) {
    // console.error("Error creating user:", err);
  }
};

export const updateUserFSDB = async (uid: string, updatedFields: Record<string, any>) => {
  try {
    await updateDoc(doc(fsdb, "users", uid), updatedFields);
  } catch (err) {
    // console.error("Error updating user:", err);
  }
};

export const updateUserVoteFSDB = async (uid: string, quoteRef: string) => {
  try {
    await updateDoc(doc(fsdb, "users", uid), {
      vote: quoteRef,
    });
  } catch (error) {
    throw error;
  }
};
