import * as React from "react";
import useArrays from "../hooks/useArrays";

export const App: React.FC = (props) => {
  const array = useArrays<string>([
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
  ]);
  const [value, setValue] = React.useState<string>("");

  return (
    <>
      <input value={value} onChange={(e) => setValue(e.target.value)} />
      <button
        onClick={() => {
          array.pushElement(value);
          setValue("");
        }}
      >
        push
      </button>
      <button onClick={() => array.unshiftElement(value)}>unshift</button>
      <button onClick={() => array.pop()}>pop</button>
      <button onClick={() => array.shift()}>shift</button>
      <button onClick={() => array.splice(array.length() - 2, 3, ...[value])}>
        splice
      </button>
      <ul>
        {array.value().map((ele: string, index: number) => {
          return (
            <li>
              <span>{ele}</span>
              <button onClick={() => array.remove(index)}>Delete Me</button>
            </li>
          );
        })}
      </ul>
    </>
  );
};
