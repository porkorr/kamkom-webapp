"use client";

import { createContext, useEffect } from "react";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
} from "firebase/auth";
import { serverTimestamp } from "firebase/firestore";
import { auth, createUserFSDB, updateUserFSDB } from "@/libs/firebase";

type AuthContextType = {
  login: (email: string, password: string) => Promise<any>;
  register: (email: string, password: string, displayName?: string) => Promise<any>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | null>(null);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const login = async (email: string, password: string) => {
    const credential = await signInWithEmailAndPassword(auth, email, password);
    const user = credential.user;

    await updateUserFSDB(user.uid, {
      email: user.email,
      lastSignIn: serverTimestamp(),
    });

    return credential;
  };

  const register = async (email: string, password: string) => {
    const credential = await createUserWithEmailAndPassword(auth, email, password);
    const user = credential.user;

    await createUserFSDB(user.uid, {
      createdAt: serverTimestamp(),
      email: user.email,
      lastSignIn: serverTimestamp(),
      role: "member",
      uid: user.uid,
      vote: "",
    });

    return credential;
  };

  // const resetPassword = async (email) => {
  //   return sendPasswordResetEmail(auth, email);
  // };

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      //
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        updateProfile(currentUser, { displayName: "" });
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ login, register, logout }}>{children}</AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };
