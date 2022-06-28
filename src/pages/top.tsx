import React, { useState, useReducer, useContext } from "react";
import { Editor } from "../components/editor";
import { buttons, Button } from "../types/button";
import { Layer, Setting } from "../types/setting";
import { LayerReducer } from "../reducers/layer_reducer";
import { SettingReducer } from "../reducers/setting_reducer";
import { SettingContext } from "./../contexts/buttons_setting";
import _ from "lodash";

type EditorProviderProps = {
  children: React.ReactNode;
};

const defaultLayer = buttons.reduce((acc, item) => {
  acc[item] = { open: false };
  return acc;
}, {} as Layer);

const EditorProvider: React.FC<EditorProviderProps> = ({ children }) => {
  const initSetting: Setting = {
    up: _.cloneDeep(defaultLayer),
    right: _.cloneDeep(defaultLayer),
    down: _.cloneDeep(defaultLayer),
    left: _.cloneDeep(defaultLayer),
    prefixKeys: [],
    installed_macros: {},
  };

  const [setting, layerDispatch] = useReducer(LayerReducer, initSetting);
  const [unusedSetting, settingDispatch] = useReducer(SettingReducer, setting);

  const value = {
    setting,
    layerDispatch,
    settingDispatch,
  };

  return (
    <SettingContext.Provider value={value}>{children}</SettingContext.Provider>
  );
};

export const Top: React.FC = () => {
  return (
    <EditorProvider>
      <Editor />
    </EditorProvider>
  );
};
