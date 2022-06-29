import { buttons, Button } from "../types/button";
import { LayerKey } from "../types/layer_key";
import {
  MacroTable,
  StructMacro,
  Setting,
  Flip,
  Remap,
} from "../types/setting";

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
export const remapType = Symbol("remap");

export type ACTION_TYPE =
  | {
      type: typeof applyMacroType;
      payload: {
        layerKey: LayerKey;
        button?: Array<Button>;
        ifPressed: Array<Button>;
        macroClassName: string; // TODO typed
      };
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
    }
  | {
      type: typeof remapType;
      payload: {
        layerKey: LayerKey;
        button: Button;
        targetButtons: Array<Button>;
      };
    };

export const LayerReducer = (setting: Setting, action: ACTION_TYPE) => {
  const layerKey = action.payload.layerKey as LayerKey;
  const button = action.payload.button as Button;
  const flip =
    (layerKey && button && setting[layerKey][button].flip) || ({} as Flip);
  const remap =
    (layerKey && button && setting[layerKey][button]?.remap) || ({} as Remap);

  switch (action.type) {
    case applyMacroType:
      setting[layerKey].macro[action.payload.macroClassName] =
        action.payload.ifPressed || [];
      return { ...setting };
    case openMenuType:
      setting[layerKey][action.payload.button].open = true;
      return { ...setting };
    case closeMenuType:
      setting[layerKey][action.payload.button].open = false;
      return { ...setting };
    case disableFlipButtonType:
      flip.enable = false;
      setting[layerKey][action.payload.button] = {
        open: true,
        flip: flip,
      };
      return { ...setting };
    case alwaysFlipButtonType:
      flip.if_pressed = [];
      flip.enable = true;
      setting[layerKey][action.payload.button] = {
        open: true,
        flip: flip,
      };
      return { ...setting };
    case flipIfPressedSelfButtonType:
      flip.if_pressed = [action.payload.button];
      flip.enable = true;
      setting[layerKey][action.payload.button] = {
        open: true,
        flip: flip,
      };
      return { ...setting };
    case flipIfPressedSomeButtonsType:
      flip.if_pressed = action.payload.targetButtons;
      flip.enable = true;
      setting[layerKey][action.payload.button] = {
        open: true,
        flip: flip,
      };
      return { ...setting };
    case ignoreButtonsInFlipingButtonType:
      flip.force_neutral = action.payload.targetButtons;
      setting[layerKey][action.payload.button] = {
        open: true,
        flip: flip,
      };
      return { ...setting };
    case remapType:
      flip.enable = false;
      remap.to = action.payload.targetButtons;
      setting[layerKey][button] = { flip: flip, remap: remap, open: true };
      return { ...setting };
    default:
      console.log("一致しないaction typeです", action);
      return { ...setting };
  }
};
