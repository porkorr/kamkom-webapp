"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import useFirestore from "@/hooks/useFirestore";

const AuthPage = ({ children }: { children: React.ReactNode }) => {
  const { user } = useFirestore();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push("/");
    }
  }, [user, pathname]);

  return (
    <div className="authentication">
      <div className="modal">{children}</div>
    </div>
  );
};

export default AuthPage;
