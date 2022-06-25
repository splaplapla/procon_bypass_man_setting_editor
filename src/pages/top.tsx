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

const EditorProvider: React.FC<EditorProviderProps> = ({ children }) => {
  const initSetting: Setting = {
    up: buttons.reduce((a, i) => {
      a[i] = { open: false };
      return a;
    }, {} as Layer),
    right: buttons.reduce((a, i) => {
      a[i] = { open: false };
      return a;
    }, {} as Layer),
    down: buttons.reduce((a, i) => {
      a[i] = { open: false };
      return a;
    }, {} as Layer),
    left: buttons.reduce((a, i) => {
      a[i] = { open: false };
      return a;
    }, {} as Layer),
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
