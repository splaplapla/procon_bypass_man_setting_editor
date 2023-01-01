import { Button } from "./button";

export type PluginBodyForceParams = {
  if_tilted_left_stick?: boolean;
  ifPressed?: Array<Button>;
};

export type PluginBody = {
  display_name: string;
  class_namespace: string;
  forceParams?: PluginBodyForceParams;
};

// 1タイトル分. keyは1つのみ
export type Plugin = {
  [key in string]: {
    macros: Array<PluginBody>;
  };
};

// 複数のタイトルを入れる
export type PluginMacroTable = {
  [key in string]: Array<PluginBody>;
};

// class_namespaceがキー
export type PluginMacrosTable = {
  [key in string]: PluginBody;
};

// plugins.
export const AvailablePlugins: Array<Plugin> = [
  {
    splatoon2: {
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
            "ProconBypassMan::Plugin::Splatoon2::Macro::ChargeTansanBomb",
        },
        {
          display_name: "バブル即割",
          class_namespace:
            "ProconBypassMan::Plugin::Splatoon2::Macro::SokuwariForSplashBomb",
        },
        {
          display_name: "惰性キャンセル",
          class_namespace:
            "ProconBypassMan::Plugin::Splatoon2::Macro::DaseiCancel",
          forceParams: { if_tilted_left_stick: true, ifPressed: ["zl"] },
        },
      ],
    },
  },
  {
    splatoon3: {
      macros: [
        {
          display_name: "試合中にリスポーンにスーパージャンプ",
          class_namespace:
            "ProconBypassMan::Plugin::Splatoon3::Macro::FastReturn",
        },
        {
          display_name:
            "試合中に右キーに割り当てられている味方へのスーパージャンプ",
          class_namespace:
            "ProconBypassMan::Plugin::Splatoon3::Macro::JumpToRightKey",
        },
        {
          display_name:
            "試合中に上キーに割り当てられている味方へのスーパージャンプ",
          class_namespace:
            "ProconBypassMan::Plugin::Splatoon3::Macro::JumpToUpKey",
        },
        {
          display_name:
            "試合中に左キーに割り当てられている味方へのスーパージャンプ",
          class_namespace:
            "ProconBypassMan::Plugin::Splatoon3::Macro::JumpToLeftKey",
        },
        {
          display_name: "炭酸ボムのチャージ",
          class_namespace:
            "ProconBypassMan::Plugin::Splatoon3::Macro::ChargeTansanBomb",
        },
        {
          display_name: "イカロール",
          class_namespace:
            "ProconBypassMan::Plugin::Splatoon3::Macro::ForwardIkarole",
        },
        {
          display_name: "惰性キャンセル",
          class_namespace:
            "ProconBypassMan::Plugin::Splatoon3::Macro::DaseiCancel",
          forceParams: { if_tilted_left_stick: true, ifPressed: ["zl"] },
        },
        {
          display_name: "左スティック1回転",
          class_namespace:
            "ProconBypassMan::Plugin::Splatoon3::Macro::RotationLeftStick",
        },
      ],
    },
  },
];

export const AvailablePluginMacros = AvailablePlugins.reduce((acc, plugins) => {
  for (let gameTitle in plugins) {
    acc[gameTitle] = plugins[gameTitle]["macros"] as Array<PluginBody>;
  }
  return acc;
}, {} as PluginMacroTable);

export const AvailablePluginMacrosTable = AvailablePlugins.reduce(
  (acc, plugins) => {
    for (let gameTitle in plugins) {
      for (let macro of plugins[gameTitle]["macros"]) {
        acc[macro.class_namespace] = macro as PluginBody;
      }
    }
    return acc;
  },
  {} as PluginMacrosTable
);
