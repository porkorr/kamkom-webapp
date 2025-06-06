"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { RiChatSmileAiLine } from "react-icons/ri";
import useFirestore from "@/hooks/useFirestore";
import Loading from "@/components/Loading";
import Link from "next/link";

const AuthPage = ({ children }: { children: React.ReactNode }) => {
  const { user } = useFirestore();
  const [isLoading, setIsLoading] = useState(true);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push("/");
    } else {
      setIsLoading(false);
    }
  }, [user, pathname]);

  if (isLoading) return <Loading />;

  return (
    <div className="main-authentication">
      <div className="modal">{children}</div>
      <div className="logo">
        <Link href="/">
          <p>Kamkom</p>
          <RiChatSmileAiLine size={25} />
        </Link>
      </div>
    </div>
  );
};

export default AuthPage;
