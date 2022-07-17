import { buttons, Button } from "../types/button";
import { LayerKey } from "../types/layer_key";
import {
  MacroTable,
  StructMacro,
  Setting,
  Flip,
  Remap,
  LayersSetting,
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

export const LayersSettingReducer = (layersSetting: LayersSetting, action: ACTION_TYPE) => {
  const layerKey = action.payload.layerKey as LayerKey;
  const button = action.payload.button as Button;
  const flip =
    (layerKey && button && layersSetting[layerKey][button].flip) || ({} as Flip);
  const remap =
    (layerKey && button && layersSetting[layerKey][button]?.remap) || ({} as Remap);

  switch (action.type) {
    case applyMacroType:
      layersSetting[layerKey].macro[action.payload.macroClassName] =
        action.payload.ifPressed || [];
      return { ...layersSetting };
    case openMenuType:
      layersSetting[layerKey][action.payload.button].open = true;
      return { ...layersSetting };
    case closeMenuType:
      layersSetting[layerKey][action.payload.button].open = false;
      return { ...layersSetting };
    case disableFlipButtonType:
      flip.enable = false;
      layersSetting[layerKey][action.payload.button] = {
        open: true,
        flip: flip,
      };
      return { ...layersSetting };
    case alwaysFlipButtonType:
      flip.if_pressed = [];
      flip.enable = true;
      layersSetting[layerKey][action.payload.button] = {
        open: true,
        flip: flip,
      };
      return { ...layersSetting };
    case flipIfPressedSelfButtonType:
      flip.if_pressed = [action.payload.button];
      flip.enable = true;
      layersSetting[layerKey][action.payload.button] = {
        open: true,
        flip: flip,
      };
      return { ...layersSetting };
    case flipIfPressedSomeButtonsType:
      flip.if_pressed = action.payload.targetButtons;
      flip.enable = true;
      layersSetting[layerKey][action.payload.button] = {
        open: true,
        flip: flip,
      };
      return { ...layersSetting };
    case ignoreButtonsInFlipingButtonType:
      flip.force_neutral = action.payload.targetButtons;
      layersSetting[layerKey][action.payload.button] = {
        open: true,
        flip: flip,
      };
      return { ...layersSetting };
    case remapType:
      flip.enable = false;
      remap.to = action.payload.targetButtons;
      layersSetting[layerKey][button] = { flip: flip, remap: remap, open: true };
      return { ...layersSetting };
    default:
      console.log("一致しないaction typeです", action);
      return { ...layersSetting };
  }
};
