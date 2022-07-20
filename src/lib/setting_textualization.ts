import { Button } from "../types/button";
import { InstalledPlugin, LayersSetting } from "../types/setting";

type Props = {
  layers: LayersSetting;
  prefixKeys: Array<Button>;
  installed_macros: InstalledPlugin;
};

export const SettingTextualization = ({ layers, prefixKeys, installed_macros }: Props) => {
  const pk = prefixKeys || [];
  const normalizedInstalledMacros = installed_macros || {};

  const topLevelIndent = "  ";

  const result = `version: 1.0
setting: |-
${Object.keys(normalizedInstalledMacros).map((name) => `${topLevelIndent}install_macro_plugin ${name}`).join("\n")}

  prefix_keys_for_changing_layer %i(${pk.join(" ")})

  layer :up do
  end

  layer :right do
  end

  layer :down do
  end

  layer :left do
  end`;

  return result.replace(/[\r\n]{3,}/g, "\n");
};
