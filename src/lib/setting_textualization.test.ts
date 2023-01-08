import { Button, buttons } from "../types/button";
import { SettingTextualization } from "./setting_textualization";
import _ from "lodash";
import yaml from "js-yaml";

function makeEmptyData() {
  const defaultLayer = buttons.reduce((acc, item) => {
    acc[item] = { open: false };
    return acc;
  }, {} as ButtonsInLayer);
  const layers = {
    up: _.cloneDeep(defaultLayer),
    down: _.cloneDeep(defaultLayer),
    left: _.cloneDeep(defaultLayer),
    right: _.cloneDeep(defaultLayer),
  };

  return { layers };
}

describe("内容が空のとき", () => {
  it("validなyamlであること", () => {
    const actual = SettingTextualization({
      layers: makeEmptyData().layers,
      envelope: true,
    });
    yaml.load(actual);
  });
});

describe("prefixKeysに値があるとき", () => {
  it("validなyamlであること", () => {
    const actual = SettingTextualization({
      layers: makeEmptyData().layers,
      prefixKeys: ["b"],
      envelope: true,
    });
    yaml.load(actual);
  });

  it("設定ファイルを出力すること", () => {
    const actual = SettingTextualization({
      layers: makeEmptyData().layers,
      prefixKeys: ["b"],
      installed_macros: null,
      rumbleOnLayerChange: false,
      envelope: true,
    });
    const expected = `version: 1.0
setting: |-
  # metadata-required_pbm_version: 0.3.0

  prefix_keys_for_changing_layer %i(b)

  layer :up do
  end

  layer :right do
  end

  layer :down do
  end

  layer :left do
  end`;
    expect(actual).toBe(expected);
  });

  it("設定ファイルを出力すること2", () => {
    const actual = SettingTextualization({
      layers: makeEmptyData().layers,
      prefixKeys: ["b", "y"],
      installed_macros: null,
      rumbleOnLayerChange: false,
      envelope: true,
    });
    const expected = `version: 1.0
setting: |-
  # metadata-required_pbm_version: 0.3.0

  prefix_keys_for_changing_layer %i(b y)

  layer :up do
  end

  layer :right do
  end

  layer :down do
  end

  layer :left do
  end`;
    expect(actual).toBe(expected);
  });

  it("設定ファイルを出力すること2", () => {
    const actual = SettingTextualization({
      layers: makeEmptyData().layers,
      prefixKeys: ["b", "y"],
      installed_macros: null,
      rumbleOnLayerChange: false,
      envelope: false,
    });
    const expected = `# metadata-required_pbm_version: 0.3.0

prefix_keys_for_changing_layer %i(b y)

layer :up do
end

layer :right do
end

layer :down do
end

layer :left do
end`;
    expect(actual).toBe(expected);
  });
});

describe("installed_macrosに値があるとき", () => {
  it("設定ファイルを出力すること", () => {
    const actual = SettingTextualization({
      layers: makeEmptyData().layers,
      prefixKeys: null,
      installed_macros: { AAA: true, BBB: true },
      rumbleOnLayerChange: false,
      envelope: true,
    });
    yaml.load(actual);
    const expected = `version: 1.0
setting: |-
  # metadata-required_pbm_version: 0.3.0

  install_macro_plugin AAA
  install_macro_plugin BBB

  prefix_keys_for_changing_layer %i()

  layer :up do
  end

  layer :right do
  end

  layer :down do
  end

  layer :left do
  end`;
    expect(actual).toBe(expected);
  });
});

describe("layer.#{button}.flipに値があるとき", () => {
  it("設定ファイルを出力すること", () => {
    const layers = makeEmptyData().layers;
    layers.up.a = {
      flip: { if_pressed: [], enable: true, force_neutral: ["y"] },
      open: true,
    };
    layers.up.b = {
      flip: { if_pressed: ["a"], enable: true, force_neutral: ["y"] },
      open: true,
    };
    layers.up.y = {
      flip: { if_pressed: [], enable: false, force_neutral: [] },
      open: true,
    };
    layers.down.y = {
      flip: { if_pressed: ["a", "b"], enable: true, force_neutral: ["y", "x"] },
      open: true,
    };

    const actual = SettingTextualization({
      layers: layers,
      prefixKeys: null,
      envelope: true,
    });
    yaml.load(actual);
    const expected = `version: 1.0
setting: |-
  # metadata-required_pbm_version: 0.3.0

  prefix_keys_for_changing_layer %i()

  layer :up do
    flip :a, force_neutral: %i(y)
    flip :b, if_pressed: %i(a), force_neutral: %i(y)
  end

  layer :right do
  end

  layer :down do
    flip :y, if_pressed: %i(a b), force_neutral: %i(y x)
  end

  layer :left do
  end`;
    expect(actual).toBe(expected);
  });
});

describe("layer.#{button}.macroに値があるとき", () => {
  it("設定ファイルを出力すること", () => {
    const layers = makeEmptyData().layers;
    layers.up.a = {
      flip: { if_pressed: [], enable: true, force_neutral: ["y"] },
      open: true,
    };
    layers.up.macro = {
      "ProconBypassMan::Splatoon2::Macro::FastReturn": ["y", "l"],
      "ProconBypassMan::Plugin::Splatoon3::Macro::JumpToRightKey": ["b"],
    };
    layers.down.y = {
      flip: { if_pressed: ["a", "b"], enable: true, force_neutral: ["y", "x"] },
      open: true,
    };
    const actual = SettingTextualization({
      layers: layers,
      prefixKeys: null,
      installed_macros: {
        "ProconBypassMan::Splatoon2::Macro::FastReturn": true,
        "ProconBypassMan::Plugin::Splatoon3::Macro::JumpToRightKey": true,
      },
      rumbleOnLayerChange: false,
      envelope: true,
    });
    yaml.load(actual);
    const expected = `version: 1.0
setting: |-
  # metadata-required_pbm_version: 0.3.0

  install_macro_plugin ProconBypassMan::Splatoon2::Macro::FastReturn
  install_macro_plugin ProconBypassMan::Plugin::Splatoon3::Macro::JumpToRightKey

  prefix_keys_for_changing_layer %i()

  layer :up do
    flip :a, force_neutral: %i(y)
    macro ProconBypassMan::Splatoon2::Macro::FastReturn, if_pressed: %i(y l)
    macro ProconBypassMan::Plugin::Splatoon3::Macro::JumpToRightKey, if_pressed: %i(b)
  end

  layer :right do
  end

  layer :down do
    flip :y, if_pressed: %i(a b), force_neutral: %i(y x)
  end

  layer :left do
  end`;
    expect(actual).toBe(expected);
  });
});

describe("layer.#{button}.macroに値があるとき(envelope: false)", () => {
  it("設定ファイルを出力すること", () => {
    const layers = makeEmptyData().layers;
    layers.up.a = {
      flip: { if_pressed: [], enable: true, force_neutral: ["y"] },
      open: true,
    };
    layers.up.macro = {
      "ProconBypassMan::Splatoon2::Macro::FastReturn": ["y", "l"],
    };
    layers.down.y = {
      flip: { if_pressed: ["a", "b"], enable: true, force_neutral: ["y", "x"] },
      open: true,
    };
    const actual = SettingTextualization({
      layers: layers,
      prefixKeys: null,
      installed_macros: {
        "ProconBypassMan::Splatoon2::Macro::FastReturn": true,
      },
      rumbleOnLayerChange: false,
      envelope: false,
    });
    const expected = `# metadata-required_pbm_version: 0.3.0

install_macro_plugin ProconBypassMan::Splatoon2::Macro::FastReturn

prefix_keys_for_changing_layer %i()

layer :up do
  flip :a, force_neutral: %i(y)
  macro ProconBypassMan::Splatoon2::Macro::FastReturn, if_pressed: %i(y l)
end

layer :right do
end

layer :down do
  flip :y, if_pressed: %i(a b), force_neutral: %i(y x)
end

layer :left do
end`;
    expect(actual).toBe(expected);
  });
});

describe("forceParamsを持つlayer.#{button}.macroに値があるとき(envelope: false)", () => {
  it("設定ファイルを出力すること", () => {
    const layers = makeEmptyData().layers;
    layers.up.a = {
      flip: { if_pressed: [], enable: true, force_neutral: ["y"] },
      open: true,
    };
    layers.up.macro = {
      "ProconBypassMan::Plugin::Splatoon3::Macro::DaseiCancel": ["y", "l"],
    };
    const actual = SettingTextualization({
      layers: layers,
      prefixKeys: null,
      installed_macros: {
        "ProconBypassMan::Plugin::Splatoon3::Macro::DaseiCancel": true,
      },
      rumbleOnLayerChange: false,
      envelope: false,
    });
    const expected = `# metadata-required_pbm_version: 0.3.3.1

install_macro_plugin ProconBypassMan::Plugin::Splatoon3::Macro::DaseiCancel

prefix_keys_for_changing_layer %i()

layer :up do
  flip :a, force_neutral: %i(y)
  macro ProconBypassMan::Plugin::Splatoon3::Macro::DaseiCancel, if_pressed: %i(y l), if_tilted_left_stick: true
end

layer :right do
end

layer :down do
end

layer :left do
end`;
    expect(actual).toBe(expected);
  });
});

describe("イカロールマクロと左スティック1回転マクロがあるとき(envelope: false)", () => {
  it("設定ファイルを出力すること", () => {
    const layers = makeEmptyData().layers;
    layers.up.a = {
      flip: { if_pressed: [], enable: true, force_neutral: ["y"] },
      open: true,
    };
    layers.up.macro = {
      "ProconBypassMan::Plugin::Splatoon3::Macro::DaseiCancel": ["y", "l"],
      "ProconBypassMan::Plugin::Splatoon3::Macro::RotationLeftStick": ["left"],
    };
    const actual = SettingTextualization({
      layers: layers,
      prefixKeys: null,
      installed_macros: {
        "ProconBypassMan::Plugin::Splatoon3::Macro::DaseiCancel": true,
        "ProconBypassMan::Plugin::Splatoon3::Macro::RotationLeftStick": true,
      },
      rumbleOnLayerChange: false,
      envelope: false,
    });
    const expected = `# metadata-required_pbm_version: 0.3.4

install_macro_plugin ProconBypassMan::Plugin::Splatoon3::Macro::DaseiCancel
install_macro_plugin ProconBypassMan::Plugin::Splatoon3::Macro::RotationLeftStick

prefix_keys_for_changing_layer %i()

layer :up do
  flip :a, force_neutral: %i(y)
  macro ProconBypassMan::Plugin::Splatoon3::Macro::DaseiCancel, if_pressed: %i(y l), if_tilted_left_stick: true
  macro ProconBypassMan::Plugin::Splatoon3::Macro::RotationLeftStick, if_pressed: %i(left)
end

layer :right do
end

layer :down do
end

layer :left do
end`;
    expect(actual).toBe(expected);
  });
});
