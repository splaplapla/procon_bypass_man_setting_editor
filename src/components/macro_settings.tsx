import { jsx, css } from "@emotion/react";
import React, { useState, useReducer, useContext } from "react";
import { SettingContext } from "./../contexts/buttons_setting";
import { LayerKey } from "../types/layer_key";
import { Button } from "../types/button";

type Props = {
  layerKey: LayerKey;
};

export const MacroSettings: React.FC<Props> = ({ layerKey }) => {
  const { layers } = useContext(SettingContext);
  // const macroTable = (layers[layerKey].macro as any) || ({} as any);
  return <>
a</>;
};
