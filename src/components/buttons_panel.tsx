import { jsx, css } from "@emotion/react";
import React, { useState } from "react";

type Props = {
  layerKey: string;
};

export const ButtonsPanel: React.FC<Props> = ({ layerKey }) => {
  return (
    <>
      ここにボタンがだーって出ます({layerKey})
      <br />
    </>
  );
};
