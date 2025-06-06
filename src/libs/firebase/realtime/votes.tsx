// import { ref, set, get, update, push } from "firebase/database";
// import { rtdb } from "@/libs/firebase";

// export type Vote = {
//   id: string;
//   name: string;
//   email: string;
//   vote: string;
// };

// export const addVote = async (vote: Vote) => {
//   const votesRef = ref(rtdb, "votes");
//   const newVoteRef = push(votesRef);
//   await set(newVoteRef, vote);
// };

// export const getVotes = async () => {
//   const votesRef = ref(rtdb, "votes");
//   const snapshot = await get(votesRef);
//   return snapshot.val();
// };
