/** @jsx jsx */

import { jsx, css } from "@emotion/react";
import React, { useState, useEffect, useContext } from "react";
import { ButtonsSettingContext } from "./../contexts/buttons_setting";
import {
  AvailablePlugins,
  PluginBody,
} from "../types/plugin";
import {
  installMacroType,
  uninstallMacroType,
} from "../reducers/layer_reducer";

let gameMacroTable = {} as any;
const gamesAndMacros = AvailablePlugins.forEach((plugins) => {
  for(let pluginKey in plugins) {
    let gameAssetTable = plugins[pluginKey]
    gameMacroTable[pluginKey] = []
    gameMacroTable[pluginKey] = gameAssetTable['macros']
  }
})

type Props = {
  classNamespace: string;
};
export const InstallableMacro = ({ classNamespace }: Props) => {
  const { setting, layersDispatch } = useContext(ButtonsSettingContext);
  const isChecked = (name: string) => {
    return setting.installed_macros[name] || false;
  };
  const handleClick = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (isChecked(classNamespace)) {
      layersDispatch({
        type: uninstallMacroType,
        payload: { macro: classNamespace },
      });
    } else {
      layersDispatch({
        type: installMacroType,
        payload: { macro: classNamespace },
      });
    }
  };

  return (
    <>
      <input
        type="checkbox"
        onChange={handleClick}
        checked={isChecked(classNamespace)}
      />{" "}
    </>
  );
};

export const InstallableMacros = () => {
  return (
    <>
      {
        Object.keys(gameMacroTable).map((key, index) => {
          return(
            <div key={index}>
              <h3>{key}</h3>
              <ul>
                {
                  gameMacroTable[key].map((item: PluginBody, index: number) => {
                    return(
                      <li key={index}>
                        <label>
                          <InstallableMacro classNamespace={item['class_namespace']} />
                          {item['display_name']}
                        </label>
                      </li>
                    )
                  })
                }
              </ul>
            </div>
          )
        })
      }
    </>
  );
};
