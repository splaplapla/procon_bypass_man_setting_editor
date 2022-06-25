/** @jsx jsx */

import { jsx, css } from "@emotion/react";
import React, { useState, useContext } from "react";
import { LayerKey } from "../types/layer_key";
import { Button, buttons } from "../types/button";
import { ButtonsSettingContext } from "./../contexts/buttons_setting";
import {
  openMenuType,
  closeMenuType,
} from "../reducers/layer_reducer";

type Props = {
  layerKey: LayerKey;
  name: Button;
};

export const ButtonMenuInPanel: React.FC<Props> = ({ layerKey, name }) => {
  return (
    <>opened</>
  )
}

export const ButtonInPanel: React.FC<Props> = ({ layerKey, name }) => {
  const { setting, settingDispatch } = useContext(ButtonsSettingContext);
  const isOpenMenu = () => {
    return setting[layerKey][name].open;
  };
  const handleToggle = () => {
    if (isOpenMenu()) {
      // 閉じる
      settingDispatch({
        type: closeMenuType,
        payload: { layerKey: layerKey, button: name },
      });
    } else {
      // 開く
      settingDispatch({
        type: openMenuType,
        payload: { layerKey: layerKey, button: name },
      });
    }
  };

  return (
    <>
      <label>
        <input type="checkbox" checked={isOpenMenu()} onChange={handleToggle} />
        {name}
      </label>

      {isOpenMenu() && (
        <ButtonMenuInPanel
          name={name}
          layerKey={layerKey}
        />
      )}
    </>
  )
}
