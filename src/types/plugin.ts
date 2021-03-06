export type PluginBody = {
  display_name: string;
  class_namespace: string;
};

export type Plugin = {
  [key in string]: {
    modes: Array<PluginBody>;
    macros: Array<PluginBody>;
  };
};

// plugins.
export const AvailablePlugins: Array<Plugin> = [
  {
    splatoon2: {
      modes: [
        {
          display_name: "splatoon2.guruguru",
          class_namespace: "ProconBypassMan::Plugin::Splatoon2::Mode::Guruguru",
        },
      ],
      macros: [
        {
          display_name: "試合中にリスポーンにスーパージャンプ",
          class_namespace:
            "ProconBypassMan::Plugin::Splatoon2::Macro::FastReturn",
        },
        {
          display_name:
            "試合中に右キーに割り当てられている味方へのスーパージャンプ",
          class_namespace:
            "ProconBypassMan::Plugin::Splatoon2::Macro::JumpToRightKey",
        },
        {
          display_name:
            "試合中に上キーに割り当てられている味方へのスーパージャンプ",
          class_namespace:
            "ProconBypassMan::Plugin::Splatoon2::Macro::JumpToUpKey",
        },
        {
          display_name:
            "試合中に左キーに割り当てられている味方へのスーパージャンプ",
          class_namespace:
            "ProconBypassMan::Plugin::Splatoon2::Macro::JumpToLeftKey",
        },
        {
          display_name: "炭酸ボムのチャージ",
          class_namespace:
            "ProconBypassMan::Splatoon2::Plugin::Macro::ChargeTansanBomb",
        },
        {
          display_name: "バブル即割",
          class_namespace:
            "ProconBypassMan::Splatoon2::Plugin::Macro::SokuwariForSplashBomb",
        },
      ],
    },
  },
];

export let gameMacroTable = {} as any;
const gamesAndMacros = AvailablePlugins.forEach((plugins) => {
  for (let pluginKey in plugins) {
    let gameAssetTable = plugins[pluginKey];
    gameMacroTable[pluginKey] = [];
    gameMacroTable[pluginKey] = gameAssetTable["macros"];
  }
});
