/** @jsx jsx */

import { jsx, css } from "@emotion/react";
import React, { useState, useEffect, useContext } from "react";
import { SettingContext } from "./../contexts/buttons_setting";
import { PluginBody, AvailablePluginMacros } from "../types/plugin";
import {
  installMacroType,
  uninstallMacroType,
} from "../reducers/setting_reducer";

type Props = {
  classNamespace: string;
};
export const InstallableMacro = ({ classNamespace }: Props) => {
  const { setting, settingDispatch } = useContext(SettingContext);
  const isChecked = (name: string) => {
    return setting.installed_macros[name] || false;
  };
  const handleClick = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (isChecked(classNamespace)) {
      settingDispatch({
        type: uninstallMacroType,
        payload: { macro: classNamespace },
      });
    } else {
      settingDispatch({
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
      {Object.keys(AvailablePluginMacros).map((key, index) => {
        return (
          <div key={index}>
            <h3>{key}</h3>
            {AvailablePluginMacros[key].map(
              (item: PluginBody, index: number) => {
                return (
                  <div key={index} className="pb-2">
                    <label>
                      <InstallableMacro
                        classNamespace={item["class_namespace"]}
                      />
                      {item["display_name"]}
                    </label>
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
