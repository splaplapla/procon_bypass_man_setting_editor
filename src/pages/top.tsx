import React, { useState, useReducer, useContext } from "react";
import { Editor } from '../components/editor'
import { buttons, Button } from "../types/button";
import {
  Layer,
  InstalledPlugin,
  Setting,
} from "../types/buttons_setting_type";
import { LayerReducer } from "../reducers/layer_reducer";
import { ButtonsSettingContext } from "./../contexts/buttons_setting";

type EditorProviderProps = {
  children: React.ReactNode;
};

const defaultLayer = buttons.reduce((acc, item) => {
  acc[item] = { open: false };
  return acc;
}, {} as Layer);

const EditorProvider: React.FC<EditorProviderProps> = ({ children }) => {
  const initSetting: Setting = {
    up: Object.assign({}, defaultLayer),
    right: Object.assign({}, defaultLayer),
    down: Object.assign({}, defaultLayer),
    left: Object.assign({}, defaultLayer),
    prefixKeys: [],
    installed_macros: {},
  };

  const [setting, layersDispatch] = useReducer(
    LayerReducer,
    initSetting
  );

  const value = {
    setting,
    layersDispatch,
  };

  return(
    <ButtonsSettingContext.Provider value={value}>
      {children}
    </ButtonsSettingContext.Provider>
  );
};

export const Top: React.FC = () => {
  return(
    <EditorProvider>
      <Editor />
    </EditorProvider>
  )
};
