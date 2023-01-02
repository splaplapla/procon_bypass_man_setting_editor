import { jsx, css } from "@emotion/react";
import React, { useState, useEffect, useContext } from "react";

type Props = {
  children: React.ReactNode;
};

export const Toggleable: React.FC<Props> = ({ children }) => {
  const [available, changeVisible] = useState(false);
  const [visibleMark, updateVisibleMark] = useState("+");

  const handleClick = (e: React.MouseEvent<HTMLInputElement>) => {
    if (available) {
      changeVisible(false);
      updateVisibleMark("+");
    } else {
      changeVisible(true);
      updateVisibleMark("-");
    }
  };

  return (
    <>
      <span style={{ cursor: "pointer" }} onClick={handleClick}>
        [{visibleMark}]
      </span>
      {available && children}
    </>
  );
};
