import { buttons, Button } from "../types/button";
import { LayerKey } from "../types/layer_key";
import { MacroTable, StructMacro, Setting, Flip } from "../types/setting";

// top level
export const installMacroType = Symbol("installMacroType");
export const uninstallMacroType = Symbol("uninstallMacroType");

export type ACTION_TYPE = | {
    type: typeof installMacroType;
    payload: { macro: string };
  } | {
    type: typeof uninstallMacroType;
    payload: { macro: string };
  }

export const SettingReducer = (setting: Setting, action: ACTION_TYPE) => {
  switch (action.type) {
  case installMacroType:
    setting.installed_macros[action.payload.macro] = true;
    return { ...setting };
  case uninstallMacroType:
    setting.installed_macros[action.payload.macro] = false;

  console.log(setting)
    return { ...setting };
  default:
    console.log("一致しないaction typeです", action);
    return { ...setting };
  }
}
