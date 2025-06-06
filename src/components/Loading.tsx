import { CSSProperties } from "react";
import { Spin } from "antd";

interface LoadingProps {
  position?: CSSProperties["position"];
  display?: CSSProperties["display"];
  justifyContent?: CSSProperties["justifyContent"];
  alignItems?: CSSProperties["alignItems"];
  width?: CSSProperties["width"];
  height?: CSSProperties["height"];
}

const Loading = ({
  position = "absolute",
  display = "flex",
  justifyContent = "center",
  alignItems = "center",
  width = "100%",
  height = "100%",
}: LoadingProps) => {
  return (
    <div style={{ position, display, justifyContent, alignItems, width, height }}>
      <Spin size="large" />
    </div>
  );
};
export default Loading;
