import React from "react";

export const MultiLineText = ({ value }: { value: string }) => {
  const token = value.split("\n");
  return (
    <>
      {token.map((item, index) => (
        <span key={index}>
          {item} {index < token.length - 1 ? <br /> : ""}
        </span>
      ))}
    </>
  );
};
