import { Button, buttons } from "../types/button";
import { LayerKey } from "../types/layer_key";
import { InstalledPlugin, LayersSetting, Layer, MacroTable } from "../types/setting";

type Props = {
  layers: LayersSetting;
  prefixKeys: Array<Button>;
  installed_macros: InstalledPlugin;
};

export const SettingTextualization = ({ layers, prefixKeys, installed_macros }: Props) => {
  const pk = prefixKeys || [];
  const normalizedInstalledMacros = installed_macros || {};
  if (!layers.up.macro) {
    layers.up.macro = {};
  }
  if (!layers.down.macro) {
    layers.down.macro = {};
  }
  if (!layers.right.macro) {
    layers.right.macro = {};
  }
  if (!layers.left.macro) {
    layers.left.macro = {};
  }

  type defineButtonMethodProps = {
    layer: Layer;
    button: Button;
  };

  const layerBlock = (layerKey: LayerKey) => {
    return `layer :${layerKey} do`;
  };
  const createButtonMethod = ({ layer, button }: defineButtonMethodProps) => {
    const flip = layer[button].flip;
    const remap = layer[button].remap;
    if (flip && flip.enable) {
      if (!flip.if_pressed) {
        return;
      }
      if (flip.if_pressed.length === 0) {
        return `flip :${button}${
          (flip.force_neutral || "") &&
          `, force_neutral: %i(${flip.force_neutral?.join(" ")})`
        }`;
      } else {
        // ex) flip :a
        //     flip :a, if_pressed: [:b]
        return `flip :${button}${
          (flip.if_pressed || "") &&
          `, if_pressed: %i(${flip.if_pressed?.join(" ")})`
        }${
          (flip.force_neutral || "") &&
          `, force_neutral: %i(${flip.force_neutral?.join(" ")})`
        }`;
      }
    } else {
      // flipとremapは共存できないのでelseにする
      if (remap) {
        return `remap :${button}${
          (remap.to || "") && `, to: %i(${remap.to.join(" ")})`
        }`;
      }
    }
    return null;
  };

  const expandMacroInLayer = (macro: MacroTable) => {
    return Object.entries(macro).map((m) => {
      const name = m[0] as string;
      const ifPressed = m[1] as Array<Button>;
      return `${layerBlockIndent}macro ${name}, if_pressed: %i(${ifPressed.join(
        " "
      )})`;
    });
  };


  const layerBlockIndent = "    ";
  const topLevelIndent = "  ";


  const result = `version: 1.0
setting: |-
${Object.keys(normalizedInstalledMacros).map((name) => `${topLevelIndent}install_macro_plugin ${name}`).join("\n")}

  prefix_keys_for_changing_layer %i(${pk.join(" ")})
  ${buttons.reduce((a, b) => {
    const m = createButtonMethod({ layer: layers.up, button: b });
    if (m) {
      a = a + `\n${layerBlockIndent}` + m;
    }
    return a;
  }, layerBlock("up"))}
${expandMacroInLayer(layers.up.macro)}
  end
  ${buttons.reduce((a, b) => {
    const m = createButtonMethod({ layer: layers.right, button: b });
    if (m) {
      a = a + `\n${layerBlockIndent}` + m;
    }
    return a;
  }, layerBlock("right"))}
${expandMacroInLayer(layers.down.macro)}
  end
  ${buttons.reduce((a, b) => {
    const m = createButtonMethod({ layer: layers.down, button: b });
    if (m) {
      a = a + `\n${layerBlockIndent}` + m;
    }
    return a;
  }, layerBlock("down"))}
${expandMacroInLayer(layers.down.macro)}
  end
  ${buttons.reduce((a, b) => {
    const m = createButtonMethod({ layer: layers.left, button: b });
    if (m) {
      a = a + `\n${layerBlockIndent}` + m;
    }
    return a;
  }, layerBlock("left"))}
${expandMacroInLayer(layers.left.macro)}
  end`;

  return result.replace(/[\r\n]{3,}/g, "\n");
};
