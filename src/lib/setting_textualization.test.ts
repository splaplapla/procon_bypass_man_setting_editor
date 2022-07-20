import { SettingTextualization } from "./setting_textualization";
import yaml from "js-yaml";

describe("内容が空のとき", () => {
  it("validなyamlであること", () => {
    const actual = SettingTextualization({});
    yaml.load(actual);
  });
})

describe("prefixKeysに値があるとき", () => {
  it("validなyamlであること", () => {
    const actual = SettingTextualization({ prefixKeys: ["b"] });
    yaml.load(actual);
  });

  it("設定ファイルを出力すること", () => {
    const actual = SettingTextualization({ layers: null, prefixKeys: ["b"], installed_macros: null });
    const expected = `version: 1.0
setting: |-
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

  it("設定ファイルを出力すること", () => {
    const actual = SettingTextualization({ layers: null, prefixKeys: ["b", "y"], installed_macros: null });
    const expected = `version: 1.0
setting: |-
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
})

describe("installed_macrosに値があるとき", () => {
  it("設定ファイルを出力すること", () => {
    const actual = SettingTextualization({ layers: null, prefixKeys: null, installed_macros: { AAA: true, BBB: true } });
    const expected = `version: 1.0
setting: |-
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
})
