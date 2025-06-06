"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input, Button, Form, message } from "antd";
import { rulesEmail } from "@/utils/formRules";
import useAuth from "@/hooks/useAuth";
import authError from "@/utils/authError";

const FormAuthLogin = () => {
  const { login } = useAuth();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (values: { email: string; password: string }) => {
    const { email, password } = values;
    setLoading(true);
    form.setFields([
      { name: "email", errors: [] },
      { name: "password", errors: [] },
    ]);

    try {
      await form.validateFields();
      await login(email, password);
      message.success("Let’s go!");
      router.push("/");
    } catch (error: any) {
      const { message: errorMessage, field } = authError(error);
      form.setFields([{ name: field, errors: [errorMessage] }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form form={form} onFinish={handleLogin}>
      <Form.Item name="email" rules={rulesEmail}>
        <Input placeholder="Email" autoComplete="off" size="large" />
      </Form.Item>
      <Form.Item name="password">
        <Input.Password placeholder="Password" autoComplete="off" size="large" />
      </Form.Item>
      <Form.Item>
        <Button htmlType="submit" size="large" loading={loading}>
          {!loading ? "Let's Go" : ""}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default FormAuthLogin;
