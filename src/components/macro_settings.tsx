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
                          {item["display_name"]}
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
