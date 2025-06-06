import FormAuthRegister from "@/components/FormAuthRegister";
import Link from "next/link";

const RegisterPage = () => {
  return (
    <>
      <div className="text-header">
        <h2>Register</h2>
      </div>
      <FormAuthRegister />
      <div className="text-footer">
        <p>
          Already have an account? <Link href="/auth/login">Login</Link>
        </p>
      </div>
    </>
  );
};

export default RegisterPage;
