"use client";

import { usePathname } from "next/navigation";
import { message } from "antd";
import { RiChatSmileAiLine } from "react-icons/ri";
import useAuth from "@/hooks/useAuth";
import useFirestore from "@/hooks/useFirestore";
import Link from "next/link";

const MainHeader = () => {
  const { logout } = useAuth();
  const { user } = useFirestore();
  const pathname = usePathname();

  const handleLogout = () => {
    logout();
    message.success("See you later!");
  };

  return (
    <div className="main-header">
      <div className="header-logo">
        <Link href="/">
          <p>Kamkom</p>
          <RiChatSmileAiLine size={25} />
        </Link>
      </div>
      {!user?.role && (
        <div className="header-auth">
          {/* {pathname === "/auth/login" && <p>Don't have an account?</p>} */}
          {/* {pathname === "/auth/register" && <p>Already have an account?</p>} */}
          {pathname !== "/auth/login" && <Link href="/auth/login">Login</Link>}
          {pathname !== "/auth/register" && <Link href="/auth/register">Register</Link>}
        </div>
      )}
      {user?.role && (
        <div className="header-auth">
          <a className="logout" onClick={handleLogout}>
            Logout
          </a>
        </div>
      )}
    </div>
  );
};
export default MainHeader;
