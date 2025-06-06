"use client";

import { useState } from "react";
import { Input, Button, Form, message } from "antd";
import { createQuoteFSDB, readQuoteExistsFSDB } from "@/libs/firebase";
import { rulesQuote } from "@/utils/formRules";

const FormAddQuote = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const handleQuote = async (values: { text: string }) => {
    const { text } = values;
    const isQuoteTaken = await readQuoteExistsFSDB(text);

    if (isQuoteTaken) {
      form.setFields([
        {
          name: "text",
          errors: ["This quote already exists."],
        },
      ]);
      return;
    }

    try {
      setLoading(true);
      await createQuoteFSDB(text);
      form.resetFields();
      message.success("Successfully added a new quote!");
    } catch (e) {
      // console.error("Error sending request:", e);
      message.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form form={form} onFinish={handleQuote}>
      <Form.Item name="text" rules={rulesQuote}>
        <Input placeholder="Your quote" autoComplete="off" size="large" />
      </Form.Item>
      <Form.Item>
        <Button htmlType="submit" size="large" loading={loading}>
          {!loading ? "Add New Quote" : ""}
        </Button>
      </Form.Item>
    </Form>
  );
};
export default FormAddQuote;
