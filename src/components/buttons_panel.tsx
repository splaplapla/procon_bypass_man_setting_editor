import { jsx, css } from "@emotion/react";
import React, { useState, useContext } from "react";
import { LayerKey } from "../types/layer_key";
import { ButtonsSettingContext } from "./../contexts/buttons_setting";
import { MacroSetting } from "./../components/macro_setting";

type Props = {
  layerKey: LayerKey;
};

export const ButtonsPanel: React.FC<Props> = ({ layerKey }) => {
  const { setting, settingDispatch } = useContext(ButtonsSettingContext);

  return (
    <>
      <h4>マクロ</h4>
      <MacroSetting layerKey={layerKey} />

      <h4>各ボタンの設定</h4>
    </>
  );
};
