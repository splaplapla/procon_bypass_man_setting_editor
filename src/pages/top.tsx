import React, { useState, useReducer, useContext } from "react";
import { Editor } from "../components/editor";
import { buttons, Button } from "../types/button";
import { Layer, Setting, LayersSetting } from "../types/setting";
import { SettingReducer } from "../reducers/setting_reducer";
import { LayersSettingReducer } from "../reducers/layers_setting_reducer";
import { SettingContext } from "./../contexts/buttons_setting";
import _ from "lodash";

type EditorProviderProps = {
  children: React.ReactNode;
};

const defaultLayer = buttons.reduce((acc, item) => {
  acc[item] = { open: false };
  return acc;
}, {} as Layer);
defaultLayer.macro = {};

const EditorProvider: React.FC<EditorProviderProps> = ({ children }) => {
  const initSetting: Setting = {
    prefixKeys: [],
    installed_macros: {},
  };

  const initLayersSetting: LayersSetting = {
    up: _.cloneDeep(defaultLayer),
    right: _.cloneDeep(defaultLayer),
    down: _.cloneDeep(defaultLayer),
    left: _.cloneDeep(defaultLayer),
  };

  const [setting, settingDispatch] = useReducer(SettingReducer, initSetting);
  const [layersSetting, layersSettingDispatch] = useReducer(LayersSettingReducer, initLayersSetting);

  const value = {
    setting,
    settingDispatch,
    layersSetting,
    layersSettingDispatch,
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
