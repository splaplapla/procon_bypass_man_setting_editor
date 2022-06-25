import React, { useState, useReducer, useContext } from "react";
import { Editor } from '../components/editor'
import { buttons, Button } from "../types/button";
import {
  ButtonsInLayer,
  Layers,
  SettingType,
} from "../types/buttons_setting_type";
import { LayerReducer } from "../reducers/layer_reducer";
import { ButtonsSettingContext } from "./../contexts/buttons_setting";

type EditorProviderProps = {
  children: React.ReactNode;
};

const EditorProvider: React.FC<EditorProviderProps> = ({ children }) => {
  const initLayers: Layers = {
    up: buttons.reduce((a, i) => {
      a[i] = { open: false };
      return a;
    }, {} as ButtonsInLayer),
    right: buttons.reduce((a, i) => {
      a[i] = { open: false };
      return a;
    }, {} as ButtonsInLayer),
    down: buttons.reduce((a, i) => {
      a[i] = { open: false };
      return a;
    }, {} as ButtonsInLayer),
    left: buttons.reduce((a, i) => {
      a[i] = { open: false };
      return a;
    }, {} as ButtonsInLayer),
    installed_macros: {},
    installed_modes: {},
  };
  const [prefixKeys, setPrefixKeys] = useState([]);

  /*
  const [layers, layersDispatch] = useReducer(
    LayerReducer,
    initLayers as Layers
  );
   */
  const value = {
    // layers,
    // layersDispatch,
    prefixKeys,
    setPrefixKeys,
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
