import { ProconColor } from "src/types/procon_color";
import { Button } from "src/types/button";
import { Setting } from "src/types/setting";

export const updatePrefixKeysType = Symbol("key");
export const installMacroType = Symbol("installMacroType");
export const uninstallMacroType = Symbol("uninstallMacroType");
export const updateRumbleOnLayerChangeType = Symbol(
  "updateRumbleOnLayerChangeType"
);
export const updateProconColor = Symbol("updateProconColor");

export type ACTION_TYPE =
  | {
      type: typeof installMacroType;
      payload: { macro: string };
    }
  | {
      type: typeof uninstallMacroType;
      payload: { macro: string };
    }
  | {
      type: typeof updatePrefixKeysType;
      payload: { buttons: Array<Button> };
    }
  | {
      type: typeof updateRumbleOnLayerChangeType;
      payload: { rumbleOnLayerChange: boolean };
    }
  | {
      type: typeof updateProconColor;
      payload: { proconColor: ProconColor };
    };

export const SettingReducer = (setting: Setting, action: ACTION_TYPE) => {
  switch (action.type) {
    case updatePrefixKeysType:
      setting.prefixKeys = action.payload.buttons;
      return { ...setting };
    case installMacroType:
      setting.installed_macros[action.payload.macro] = true;
      return { ...setting };
    case uninstallMacroType:
      delete setting.installed_macros[action.payload.macro];
      return { ...setting };
    case updateRumbleOnLayerChangeType:
      setting.rumbleOnLayerChange = action.payload.rumbleOnLayerChange;
      return { ...setting };
    case updateProconColor:
      setting.proconColor = action.payload.proconColor;
      return { ...setting };
    default:
      console.log("一致しないaction typeです", action);
      return { ...setting };
  }
};
