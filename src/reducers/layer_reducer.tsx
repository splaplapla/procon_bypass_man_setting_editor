import { buttons, Button } from "../types/button";
import { LayerKey } from "../types/layer_key";
import {
  MacroTable,
  StructMacro,
  Setting
} from "../types/buttons_setting_type";


export const updatePrefixKeysType = Symbol("key");
export const applyMacroType = Symbol("key");
export const installMacroType = Symbol("key");
export const uninstallMacroType = Symbol("key");

export type ACTION_TYPE = {
  type: typeof applyMacroType;
  payload: {
    layerKey: LayerKey;
    button: Button | undefined;
    macro: StructMacro;
  };
} | {
  type: typeof installMacroType;
  payload: { macro: string, }
} | {
  type: typeof uninstallMacroType;
  payload: { macro: string, }
} | {
  type: typeof updatePrefixKeysType;
  payload: { buttons: Array<Button>, }
}

export const LayerReducer = (setting: Setting, action: ACTION_TYPE) => {
  switch (action.type) {
    case applyMacroType:
      // const structMacro = action.payload.macro;
      //   if (!structMacro) {
      //     return { ...layers };
      //   }
      //   const macroTable = (layers[layerKey].macro as Macro) || ({} as Macro);
      //   macroTable[structMacro.name] = structMacro.if_pressed.sort();
      //   layers[layerKey].macro = macroTable;
      return { ...setting };
    case installMacroType:
      setting.installed_macros[action.payload.macro] = true;
      return { ...setting };
    case uninstallMacroType:
      setting.installed_macros[action.payload.macro] = false;
      return { ...setting };
    case updatePrefixKeysType:
      setting.prefixKeys = action.payload.buttons;
      return { ...setting };
    default:
      console.log("一致しないaction typeです", action);
      return { ...setting };
  }
}
