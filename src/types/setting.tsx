import { Button } from "./button";

export type Flip = {
  if_pressed?: Array<Button>;
  enable: boolean;
  force_neutral?: Array<Button>;
};

export type StructMacro = {
  name: string;
  if_pressed: Array<Button>;
};

export type StructMode = {
  name: string;
};

export type MacroTable = {
  [key in string]: Array<Button>;
};

export type ModeTable = {
  [key in string]: boolean;
};

export type Remap = {
  to: Array<Button>;
};

type ButtonsSettingInLayer = {
  flip?: Flip;
  remap?: Remap;
  open: boolean;
};

type _ButtonsSettingInLayer = {
  [key in Button]: ButtonsSettingInLayer;
};

type InstalledPlugin = {
  [key in string]: boolean;
};

export type Layer = _ButtonsSettingInLayer & {
  macro: MacroTable;
  mode?: ModeTable;
};

export type LayersSetting = {
  up: Layer;
  right: Layer;
  down: Layer;
  left: Layer;
};

export type Setting = {
  // installed_modes?: InstalledPlugin; // 優先度が低いので今は実装しない
  prefixKeys: Array<Button>;
  installed_macros: InstalledPlugin;
};
