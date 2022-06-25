import { Button } from "./button";
import { LayerKey } from "./layer_key";

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

export type Macro = {
  [key in string]: Array<Button>;
};

export type ModeTable = {
  [key in string]: boolean;
};

export type Remap = {
  to: Array<Button>;
};

export type ButtonsSettingInLayer = {
  flip?: Flip;
  macro?: Macro; // deprecated
  remap?: Remap;
  open: boolean;
};

type _ButtonsSettingInLayer = {
  [key in Button]: ButtonsSettingInLayer;
};

export type InstalledPlugin = {
  [key in string]: boolean;
};

export type Layer = _ButtonsSettingInLayer & {
  macro?: Macro; // TODO macroTableという名前にしたい
  mode?: ModeTable;
};

export type Setting = {
  prefixKeys: Array<Button>;
  installed_macros: InstalledPlugin;
  // installed_modes?: InstalledPlugin; // 優先度が低いので今は実装しない
  up: Layer;
  right: Layer;
  down: Layer;
  left: Layer;
};
