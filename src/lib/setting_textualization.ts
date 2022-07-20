import { Button } from "../types/button";
import { InstalledPlugin, LayersSetting } from "../types/setting";

type Props = {
  layers: LayersSetting;
  prefixKeys: Array<Button>;
  installed_macros: InstalledPlugin;
};

export const SettingTextualization = ({ layers, prefixKeys, installed_macros }: Props) => {
  const pk = prefixKeys || [];

  return `version: 1.0
setting: |-

  prefix_keys_for_changing_layer %i(${pk.join(" ")})

  layer :up do
  end
  layer :right do
  end
  layer :down do
  end
  layer :left do
  end`;
};
