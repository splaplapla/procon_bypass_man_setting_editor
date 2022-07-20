/** @jsx jsx */

import { jsx, css } from "@emotion/react";
import React, { useState, useContext } from "react";
import { LayerKey } from "../../types/layer_key";
import { Button, buttons } from "../../types/button";
import { SettingContext } from "./../../contexts/buttons_setting";
import {
  openMenuType,
  closeMenuType,
} from "../../reducers/layers_setting_reducer";
import { ButtonMenuInPanel } from "../../components/buttons_panel/button_menu_in_panel";

type ButtonProps = {
  layerKey: LayerKey;
  name: Button;
};

export const ButtonInPanel: React.FC<ButtonProps> = ({ layerKey, name }) => {
  const { layersSetting, layersSettingDispatch } = useContext(SettingContext);
  const isOpenMenu = () => {
    return layersSetting[layerKey][name].open;
  };
  const handleToggle = () => {
    if (isOpenMenu()) {
      layersSettingDispatch({
        // 閉じる
        type: closeMenuType,
        payload: { layerKey: layerKey, button: name },
      });
    } else {
      layersSettingDispatch({
        // 開く
        type: openMenuType,
        payload: { layerKey: layerKey, button: name },
      });
    }
  };

  return (
    <>
      <label
        css={css`
          display: block;
        `}
      >
        <input type="checkbox" checked={isOpenMenu()} onChange={handleToggle} />{" "}
        {name}
      </label>

      {isOpenMenu() && <ButtonMenuInPanel name={name} layerKey={layerKey} />}
    </>
  );
};
