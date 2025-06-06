import FormAuthLogin from "@/components/FormAuthLogin";
import Link from "next/link";

const LoginPage = () => {
  return (
    <>
      <div className="text-header">
        <h2>Login</h2>
      </div>
      <FormAuthLogin />
      <div className="text-footer">
        <p>
          Don't have an account? <Link href="/auth/register">Sign up for free</Link>
        </p>
      </div>
    </>
  );
};

export default LoginPage;
