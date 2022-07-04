/** @jsx jsx */

import { jsx, css } from "@emotion/react";
import React, { useState, useReducer, useContext } from "react";
import { SettingContext } from "./../contexts/buttons_setting";
import { LayerKey } from "../types/layer_key";
import { Button } from "../types/button";
import { MacroTable, StructMacro } from "../types/setting";
import {
  Plugin,
  PluginBody,
  AvailablePlugins,
  gameMacroTable,
} from "../types/plugin";
import { applyMacroType } from "../reducers/layer_reducer";

type SettingProps = {
  layerKey: LayerKey;
  macroClassName: string;
  macroDisplayName: string;
};

// MacroSetting
import { ButtonsModal } from "../components/buttons_modal";
import { useModal } from "../hooks/useModal";

const MacroSetting: React.FC<SettingProps> = ({
  macroClassName,
  layerKey,
  macroDisplayName,
}) => {
  const { setting, layerDispatch } = useContext(SettingContext);
  const [modalProps, openModal] = useModal();
  const ifPressedOfTheMacro = setting[layerKey].macro[macroClassName] || [];
  const setButtonsForModal = (bs: Array<Button>) => {
    layerDispatch({
      type: applyMacroType,
      payload: {
        layerKey: layerKey,
        macroClassName: macroClassName,
        ifPressed: bs,
      },
    });
  };
  const handleClick = (e: React.ChangeEvent<HTMLInputElement>) => {
    openModal({
      title: "マクロを発動するキーの変更",
      prefill: ifPressedOfTheMacro,
      callbackOnSubmit: setButtonsForModal,
    });
  };
  const isEnable = ifPressedOfTheMacro.length > 0;

  return (
    <>
      <label>
        <input type="checkbox" onChange={handleClick} checked={isEnable} />
        {macroDisplayName}
        {isEnable && `(${ifPressedOfTheMacro.join(", ")}で発動)`}
      </label>

      <div
        css={css`
          position: relative;
        `}
      >
        {<ButtonsModal {...modalProps} />}
      </div>
    </>
  );
};

type Props = {
  layerKey: LayerKey;
};

export const MacroSettings: React.FC<Props> = ({ layerKey }) => {
  const { setting } = useContext(SettingContext);
  return (
    <>
      {Object.keys(gameMacroTable).map((gameTitle, index) => {
        return (
          <div key={index}>
            <h3>{gameTitle}</h3>
            <ul>
              {gameMacroTable[gameTitle].map(
                (item: PluginBody, index: number) => {
                  if (setting.installed_macros[item["class_namespace"]]) {
                    return (
                      <li key={index}>
                        <label>
                          <MacroSetting
                            layerKey={layerKey}
                            macroClassName={item["class_namespace"]}
                            macroDisplayName={item["display_name"]}
                          />
                        </label>
                      </li>
                    );
                  }
                }
              )}
            </ul>
          </div>
        );
      })}
    </>
  );
};
