"use client";

import { createContext, useState, useEffect } from "react";
import { auth, fsdb } from "@/libs/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { collection, doc, onSnapshot, query, orderBy } from "firebase/firestore";
import Loading from "@/components/Loading";

type FirestoreContextType = {
  user: any | null;
  quotes: any[];
};

type QuoteType = {
  id: string;
  text: string;
  votes: number;
};

const FirestoreContext = createContext<FirestoreContextType | null>(null);

const FirestoreProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<any | null>(null);
  const [quotes, setQuotes] = useState<QuoteType[]>([]);
  const [isUserLoading, setIsUserLoading] = useState(true);
  const [isAppDataLoading, setIsAppDataLoading] = useState(true);

  const isLoading = isUserLoading || isAppDataLoading;

  useEffect(() => {
    const unsubscribe = onSnapshot(
      // query(collection(fsdb, "quotes"), orderBy("votes", "desc"), orderBy("createdAt", "asc")),
      // query(collection(fsdb, "quotes"), orderBy("votes", "desc"), orderBy("text", "asc")),
      // query(collection(fsdb, "quotes"), orderBy("votes", "desc"), orderBy("text", "asc")),
      query(collection(fsdb, "quotes")),
      (snapshot) => {
        const qData: QuoteType[] = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...(doc.data() as Omit<QuoteType, "id">),
        }));
        setQuotes(qData);
        setIsAppDataLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        const userDocRef = doc(fsdb, "users", currentUser.uid);
        const userUnsub = onSnapshot(userDocRef, (docSnap) => {
          if (docSnap.exists()) {
            setUser(docSnap.data());
          } else {
            setUser(null);
          }
          setIsUserLoading(false);
        });

        return () => userUnsub();
      } else {
        setUser(null);
        setIsUserLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  if (isLoading) return <Loading />;

  return <FirestoreContext.Provider value={{ user, quotes }}>{children}</FirestoreContext.Provider>;
};

export { FirestoreProvider, FirestoreContext };
