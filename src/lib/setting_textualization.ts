import { compareVersions } from "compare-versions";
import { Button, buttons } from "../types/button";
import { LayerKey } from "../types/layer_key";
import { optionalConfiguration } from "../types/setting";
import {
  InstalledPlugin,
  LayersSetting,
  Layer,
  MacroTable,
} from "../types/setting";

import {
  AvailablePluginMacrosTable,
  MinimumRequirePbmVersion,
} from "./../types/plugin";

type Props = {
  layers: LayersSetting;
  prefixKeys: Array<Button>;
  installed_macros: InstalledPlugin;
  rumbleOnLayerChange: boolean;
  envelope: boolean;
};

export const SettingTextualization = ({
  layers,
  prefixKeys,
  installed_macros,
  rumbleOnLayerChange,
  envelope,
}: Props) => {
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

  const expandMacroInLayer = (macro: MacroTable) => {
    return Object.entries(macro)
      .map((m) => {
        const name = m[0] as string;
        const ifPressed = m[1] as Array<Button>;
        AvailablePluginMacrosTable[name];
        if (AvailablePluginMacrosTable[name]?.forceParams) {
          return `${layerBlockIndent}macro ${name}, if_pressed: %i(${ifPressed.join(
            " "
          )}), if_tilted_left_stick: true`;
        } else {
          return `${layerBlockIndent}macro ${name}, if_pressed: %i(${ifPressed.join(
            " "
          )})`;
        }
      })
      .join("\n");
  };

  const createButtonItemInLayer = ({
    layer,
    button,
  }: defineButtonMethodProps) => {
    const flip = layer[button].flip;
    const remap = layer[button].remap;

    if (flip && flip.enable) {
      if (!flip.if_pressed) {
        return;
      }
      if (flip.if_pressed.length === 0) {
        return `${layerBlockIndent}flip :${button}${
          (flip.force_neutral || "") &&
          `, force_neutral: %i(${flip.force_neutral?.join(" ")})`
        }`;
      } else {
        // ex) flip :a
        //     flip :a, if_pressed: [:b]
        return `${layerBlockIndent}flip :${button}${
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
        return `${layerBlockIndent}remap :${button}${
          (remap.to || "") && `, to: %i(${remap.to.join(" ")})`
        }`;
      }
    }
    return null;
  };

  const layerBlockIndent = envelope ? "    " : "  ";
  const topLevelIndent = envelope ? "  " : "";

  let result = "";
  if (envelope) {
    result = result + `version: 1.0\n`;
    result = result + `setting: |-\n`;
  }
  // metadata
  const requiredVersions = Object.keys(normalizedInstalledMacros)
    .map((macro) => AvailablePluginMacrosTable[macro]?.requiredPbmVersion)
    .filter((noneOrVersion) => noneOrVersion) as Array<string>;
  requiredVersions.push(MinimumRequirePbmVersion);
  // TODO: booleanを渡しているrumbleOnLayerChangeをキーの配列に渡してここの分岐を消す
  if(rumbleOnLayerChange) {
    requiredVersions.push(optionalConfiguration['rumbleOnLayerChange']['requiredPbmVersion']);
  }
  const requiredPbmVersion = requiredVersions
    .sort(compareVersions)
    .reverse()[0];
  result =
    result +
    `${topLevelIndent}# metadata-required_pbm_version: ${requiredPbmVersion}\n\n`;

  if (rumbleOnLayerChange) {
    result =
      result +
      `${topLevelIndent}# レイヤー変更時にコントローラーを振動させます\n`;
    result = result + `${topLevelIndent}enable(:rumble_on_layer_change)\n\n`;
  }

  // install_macro_plugin
  if (Object.keys(normalizedInstalledMacros).length) {
    result =
      result +
      `${Object.keys(normalizedInstalledMacros)
        .map((name) => `${topLevelIndent}install_macro_plugin ${name}`)
        .join("\n")}`;
    result = result + `\n`;
    result = result + `\n`;
  }

  // prefix_keys_for_changing_layer
  result =
    result +
    `${topLevelIndent}prefix_keys_for_changing_layer %i(${pk.join(" ")})`;
  result = result + `\n`;
  result = result + `\n`;

  // layer up
  result = result + `${topLevelIndent}layer :up do\n`;
  const layerUpItems = buttons
    .map((b) => {
      return createButtonItemInLayer({ layer: layers.up, button: b });
    })
    .filter((x) => x);
  if (layerUpItems.length) {
    result = result + `${layerUpItems.join("\n")}\n`;
  }
  if (expandMacroInLayer(layers.up.macro).length) {
    result = result + `${expandMacroInLayer(layers.up.macro)}\n`;
  }
  result = result + `${topLevelIndent}end`;
  result = result + `\n`;
  result = result + `\n`;

  // layer right
  result = result + `${topLevelIndent}layer :right do\n`;
  const layerRightItems = buttons
    .map((b) => {
      return createButtonItemInLayer({ layer: layers.right, button: b });
    })
    .filter((x) => x);
  if (layerRightItems.length) {
    result = result + `${layerRightItems.join("\n")}\n`;
  }
  if (expandMacroInLayer(layers.right.macro).length) {
    result = result + `${expandMacroInLayer(layers.right.macro)}\n`;
  }
  result = result + `${topLevelIndent}end`;
  result = result + `\n`;
  result = result + `\n`;

  // layer down
  result = result + `${topLevelIndent}layer :down do\n`;
  const layerDownItems = buttons
    .map((b) => {
      return createButtonItemInLayer({ layer: layers.down, button: b });
    })
    .filter((x) => x);
  if (layerDownItems.length) {
    result = result + `${layerDownItems.join("\n")}\n`;
  }
  if (expandMacroInLayer(layers.down.macro).length) {
    result = result + `${expandMacroInLayer(layers.down.macro)}\n`;
  }
  result = result + `${topLevelIndent}end`;
  result = result + `\n`;
  result = result + `\n`;

  // layer left
  result = result + `${topLevelIndent}layer :left do\n`;
  const layerLeftItems = buttons
    .map((b) => {
      return createButtonItemInLayer({ layer: layers.left, button: b });
    })
    .filter((x) => x);
  if (layerLeftItems.length) {
    result = result + `${layerLeftItems.join("\n")}\n`;
  }
  if (expandMacroInLayer(layers.left.macro).length) {
    result = result + `${expandMacroInLayer(layers.left.macro)}\n`;
  }
  result = result + `${topLevelIndent}end`;
  return result;
};
