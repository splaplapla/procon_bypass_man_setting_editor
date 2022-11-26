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
import { applyMacroType } from "../reducers/layers_setting_reducer";

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
  const { layersSetting, layersSettingDispatch } = useContext(SettingContext);
  const [modalProps, openModal] = useModal();
  const ifPressedOfTheMacro =
    layersSetting[layerKey].macro[macroClassName] || [];
  const setButtonsForModal = (bs: Array<Button>) => {
    layersSettingDispatch({
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
        <input type="checkbox" onChange={handleClick} checked={isEnable} />{" "}
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
  type PluginBodyTable = {
    [key in string]: Array<PluginBody>;
  };

  const getGameTitleAndInstalledMacros = () => {
    return Object.keys(gameMacroTable).reduce(
      (acc: PluginBodyTable, gameTitle: string) => {
        gameMacroTable[gameTitle].map((item: PluginBody, index: number) => {
          if (!acc[gameTitle]) {
            acc[gameTitle] = [] as Array<PluginBody>;
          }
          if (setting.installed_macros[item.class_namespace]) {
            acc[gameTitle].push(item);
          }
        });
        return acc;
      },
      {}
    );
  };

  const render = () => {
    const gameTitleAndInstalledMacros = getGameTitleAndInstalledMacros();

    return (
      <>
        {Object.keys(gameTitleAndInstalledMacros).map((gameTitle, index) => {
          return (
            <>
              <h5>{gameTitle}</h5>
              {gameTitleAndInstalledMacros[gameTitle].length == 0 && (
                <div className="pb-2">インストール可能なマクロはありません</div>
              )}
              {gameTitleAndInstalledMacros[gameTitle].map(
                (item: PluginBody, index: number) => {
                  return (
                    <div key={index} className="pb-2">
                      <MacroSetting
                        layerKey={layerKey}
                        macroClassName={item["class_namespace"]}
                        macroDisplayName={item["display_name"]}
                      />
                    </div>
                  );
                }
              )}
            </>
          );
        })}
      </>
    );
  };

  return render();
};
