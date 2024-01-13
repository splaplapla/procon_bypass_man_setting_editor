import { Button } from "./button";
import { ProconColor } from "src/types/procon_color";

export type Flip = {
  if_pressed?: Array<Button>;
  enable: boolean;
  force_neutral?: Array<Button>;
};

export type StructMacro = {
  name: string;
  if_pressed: Array<Button>;
};

export type MacroTable = {
  [key in string]: Array<Button>;
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

export type InstalledPlugin = {
  [key in string]: boolean;
};

export type Layer = _ButtonsSettingInLayer & {
  macro: MacroTable;
};

export type LayersSetting = {
  up: Layer;
  right: Layer;
  down: Layer;
  left: Layer;
};

export type Setting = {
  prefixKeys: Array<Button>;
  installed_macros: InstalledPlugin;
  rumbleOnLayerChange: boolean;
  proconColor: ProconColor | null;
};

export const optionalConfiguration = {
  rumbleOnLayerChange: { requiredPbmVersion: "0.3.1" },
  proconColor: { requiredPbmVersion: "0.3.12" },
};
