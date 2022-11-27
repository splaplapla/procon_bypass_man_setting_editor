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
  PluginBodyForceParams,
  AvailablePluginMacros,
} from "../types/plugin";
import { applyMacroType } from "../reducers/layers_setting_reducer";

type SettingProps = {
  layerKey: LayerKey;
  macroClassName: string;
  macroDisplayName: string;
  macroForceParams: PluginBodyForceParams | undefined;
};

// MacroSetting
import { ButtonsModal } from "../components/buttons_modal";
import { useModal } from "../hooks/useModal";

const MacroSetting: React.FC<SettingProps> = ({
  macroClassName,
  layerKey,
  macroDisplayName,
  macroForceParams,
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

  const isEnable = ifPressedOfTheMacro.length > 0;

  const handleClick = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (macroForceParams?.ifPressed) {
      // NOTE: モーダルを出す時と、モーダルを出さない時の2度押しの挙動が違う.
      // モーダルを出さない時には、2回目を押すとcheckが外れて欲しい.
      if (isEnable) {
        setButtonsForModal([]);
      } else {
        setButtonsForModal(macroForceParams.ifPressed);
      }
    } else {
      openModal({
        title: "マクロを発動するキーの変更",
        prefill: ifPressedOfTheMacro,
        callbackOnSubmit: setButtonsForModal,
      });
    }
  };

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
    return Object.keys(AvailablePluginMacros).reduce(
      (acc: PluginBodyTable, gameTitle: string) => {
        AvailablePluginMacros[gameTitle].map(
          (item: PluginBody, index: number) => {
            if (!acc[gameTitle]) {
              acc[gameTitle] = [] as Array<PluginBody>;
            }
            if (setting.installed_macros[item.class_namespace]) {
              acc[gameTitle].push(item);
            }
          }
        );
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
            <div key={index}>
              <h5>{gameTitle}</h5>
              {gameTitleAndInstalledMacros[gameTitle].length == 0 && (
                <div key={index} className="pb-2">
                  インストール可能なマクロはありません
                </div>
              )}
              {gameTitleAndInstalledMacros[gameTitle].map(
                (item: PluginBody, index: number) => {
                  return (
                    <div key={index} className="pb-2">
                      <MacroSetting
                        layerKey={layerKey}
                        macroClassName={item["class_namespace"]}
                        macroDisplayName={item["display_name"]}
                        macroForceParams={item["forceParams"]}
                      />
                    </div>
                  );
                }
              )}
            </div>
          );
        })}
      </>
    );
  };

  return render();
};
