import * as React from "react";
import useStorage from "../hooks/useStorage";

export const LocalStorage: React.FC = (props) => {
  const [value, setValue] = useStorage("x-token", "abcdefg");

  return <div>{value}</div>;
};
