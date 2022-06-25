/** @jsx jsx */

import { jsx, css } from "@emotion/react";
import React, { useState, useEffect, useContext } from "react";
import { ButtonsSettingContext } from "./../contexts/buttons_setting";
import {
  Plugin,
  PluginBody,
  AvailablePlugins,
  MacroNameMap,
} from "../types/plugin";
import {
  installMacroType,
  uninstallMacroType,
} from "../reducers/layer_reducer";

const macroClassNamespaces = AvailablePlugins.map((v, k) => {
  return Object.entries(v).map((v) => {
    const name = v[0];
    const plugin = v[1];
    return plugin.macros.map((m) => {
      return m.class_namespace;
    });
  });
}) .flat() .flat();

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
      {MacroNameMap[classNamespace]}
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
                  gameMacroTable[key].map((item: any, index: any) => {
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

