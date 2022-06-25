import { jsx, css } from "@emotion/react";
import React, { useState } from "react";
import { ButtonsPanel } from "../components/buttons_panel";

export const ButtonsPanels: React.FC = () => {
  return (
    <>
      <ButtonsPanel layerKey={"up"} />
      <ButtonsPanel layerKey={"right"} />
      <ButtonsPanel layerKey={"down"} />
      <ButtonsPanel layerKey={"left"} />
    </>
  );
};
