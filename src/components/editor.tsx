/** @jsx jsx */

import { jsx, css } from "@emotion/react";
import React, { useState } from "react";
import { InstallableMacros } from "../components/installable_macros";
import { PrefixKeysForm } from "../components/prefix_keys_form";
import { LayersTab } from "../components/layers_tab";
import { layerKeys } from "../types/layer_key";
import { ButtonsPanel } from "../components/buttons_panel";

export const Editor: React.FC = () => {
  return (
    <>
      <div>
        <a href="#">エクスポートする</a>
      </div>

      <h3>インストール可能なマクロ</h3>
      <InstallableMacros />

      <h3>設定中のプレフィックスキー</h3>
      <PrefixKeysForm />

      <LayersTab>
        {layerKeys.map((layerKey, index) => (
          <ButtonsPanel layerKey={layerKey} />
        ))}
      </LayersTab>
    </>
  );
};
