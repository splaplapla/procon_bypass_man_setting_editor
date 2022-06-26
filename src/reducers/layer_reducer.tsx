import { buttons, Button } from "../types/button";
import { LayerKey } from "../types/layer_key";
import { MacroTable, StructMacro, Setting, Flip } from "../types/setting";

export const updatePrefixKeysType = Symbol("key");
export const applyMacroType = Symbol("key");

// in button
export const openMenuType = Symbol("key");
export const closeMenuType = Symbol("key");

// in button menu
export const disableFlipButtonType = Symbol("key");
export const alwaysFlipButtonType = Symbol("key");
export const flipIfPressedSelfButtonType = Symbol("key");
export const flipIfPressedSomeButtonsType = Symbol("key");
export const ignoreButtonsInFlipingButtonType = Symbol("key");

export type ACTION_TYPE =
  | {
      type: typeof applyMacroType;
      payload: {
        layerKey: LayerKey;
        button: Button | undefined;
        macro: StructMacro;
      };
    }
  | {
      type: typeof updatePrefixKeysType;
      payload: { buttons: Array<Button> };
    }
  | {
      type: typeof openMenuType;
      payload: { layerKey: LayerKey; button: Button };
    }
  | {
      type: typeof closeMenuType;
      payload: { layerKey: LayerKey; button: Button };
    }
  | {
      type: typeof disableFlipButtonType;
      payload: { layerKey: LayerKey; button: Button };
    }
  | {
      type: typeof alwaysFlipButtonType;
      payload: { layerKey: LayerKey; button: Button };
    }
  | {
      type: typeof flipIfPressedSelfButtonType;
      payload: { layerKey: LayerKey; button: Button };
    }
  | {
      type: typeof flipIfPressedSomeButtonsType;
      payload: {
        layerKey: LayerKey;
        button: Button;
        targetButtons: Array<Button>;
      };
    }
  | {
      type: typeof ignoreButtonsInFlipingButtonType;
      payload: {
        layerKey: LayerKey;
        button: Button;
        targetButtons: Array<Button>;
      };
    };

export const LayerReducer = (setting: Setting, action: ACTION_TYPE) => {
  // const layerKey = action.payload?.layerKey as LayerKey;
  // const button = action.payload?.button as Button;
  // const flip = (layerKey && button && setting[layerKey][button]?.flip) || ({} as Flip);

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
    case updatePrefixKeysType:
      setting.prefixKeys = action.payload.buttons;
      return { ...setting };
    case openMenuType:
      setting[action.payload.layerKey][action.payload.button].open = true;
      return { ...setting };
    case closeMenuType:
      setting[action.payload.layerKey][action.payload.button].open = false;
      return { ...setting };
    case disableFlipButtonType:
      setting[action.payload.layerKey][action.payload.button] = { open: true, flip: { enable: false } }
      return { ...setting };
    case alwaysFlipButtonType:
      setting[action.payload.layerKey][action.payload.button] = { open: true, flip: { enable: true, if_pressed: [] } }
      return { ...setting };
    case flipIfPressedSelfButtonType:
      setting[action.payload.layerKey][action.payload.button] = { open: true, flip: { enable: true, if_pressed: [action.payload.button] } }
      return { ...setting };
    case flipIfPressedSomeButtonsType:
      const flip = setting[action.payload.layerKey][action.payload.button].flip as Flip
      flip.if_pressed = action.payload.targetButtons
      setting[action.payload.layerKey][action.payload.button] = { open: true, flip: flip }
      return { ...setting };
    case ignoreButtonsInFlipingButtonType:
      const flip1 = setting[action.payload.layerKey][action.payload.button].flip as Flip
      flip1.force_neutral = action.payload.targetButtons;
      setting[action.payload.layerKey][action.payload.button] = { open: true, flip: flip1 }
      return { ...setting };
    default:
      console.log("一致しないaction typeです", action);
      return { ...setting };
  }
};
