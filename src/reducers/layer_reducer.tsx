import { buttons, Button } from "../types/button";
import { LayerKey } from "../types/layer_key";
import {
  Layers,
  Macro,
  StructMacro,
} from "../types/buttons_setting_type";


export const applyMacroType = Symbol("applyMacro");

export type ACTION_TYPE = {
  type: typeof applyMacroType;
  payload: {
    layerKey: LayerKey;
    button: Button | undefined;
    macro: StructMacro;
  };
};

export const LayerReducer = (layers: Layers, action: ACTION_TYPE) => {
  switch (action.type) {
    case applyMacroType:
    // const structMacro = action.payload.macro;
    //   if (!structMacro) {
    //     return { ...layers };
    //   }
    //   const macroTable = (layers[layerKey].macro as Macro) || ({} as Macro);
    //   macroTable[structMacro.name] = structMacro.if_pressed.sort();
    //   layers[layerKey].macro = macroTable;
      return { ...layers };
    default:
      console.log("一致しないaction typeです");
      return { ...layers };
  }
}
