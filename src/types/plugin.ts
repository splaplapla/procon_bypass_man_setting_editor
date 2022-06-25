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
    sumabura: {
      modes: [],
      macros: [
        {
          display_name: "xxx",
          class_namespace: "ProconBypassMan::Splatoon2::Macro::FastReturn",
        },
      ]
    },
  }, {
    splatoon2: {
      modes: [
        {
          display_name: "splatoon2.guruguru",
          class_namespace: "ProconBypassMan::Splatoon2::Mode::Guruguru",
        },
      ],
      macros: [
        {
          display_name: "fast_return",
          class_namespace: "ProconBypassMan::Splatoon2::Macro::FastReturn",
        },
        {
          display_name: "jump_right",
          class_namespace: "ProconBypassMan::Splatoon2::Macro::JumpToRightKey",
        },
        {
          display_name: "jump_up",
          class_namespace: "ProconBypassMan::Splatoon2::Macro::JumpToUpKey",
        },
        {
          display_name: "jump_left",
          class_namespace: "ProconBypassMan::Splatoon2::Macro::JumpToLeftKey",
        },
      ],
    }
  }
];
