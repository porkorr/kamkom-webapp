"use client";

import { AuthProvider } from "@/context/AuthContext";
import { FirestoreProvider } from "@/context/FirestoreContext";

const AppProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <AuthProvider>
      <FirestoreProvider>{children}</FirestoreProvider>
    </AuthProvider>
  );
};

export default AppProvider;
