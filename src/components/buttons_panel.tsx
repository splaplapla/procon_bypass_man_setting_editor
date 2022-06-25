/** @jsx jsx */

import { jsx, css } from "@emotion/react";
import React, { useState, useContext } from "react";
import { LayerKey } from "../types/layer_key";
import { MacroSetting } from "./../components/macro_setting";
import { ButtonInPanel } from "./../components/button_in_panel";
import { buttons } from "../types/button";

type Props = {
  layerKey: LayerKey;
};

export const ButtonsPanel: React.FC<Props> = ({ layerKey }) => {
  const ulStyle = css`
    border: 1px solid #666;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    list-style-type: none;
    margin: 0 0 0 1em;
    padding: 0;
    width: 900px;
  `;
  const liStyle = css`
    border: 1px solid #aaa;
    margin: 0.2em;
    padding: 0.5em;
    width: 200px;
  `;

  return (
    <>
      <h4>マクロ</h4>
      <MacroSetting layerKey={layerKey} />

      <h4>各ボタンの設定</h4>
      <div css={ulStyle}>
        {buttons.map((button, index) => (
          <div key={index} css={liStyle}>
            <ButtonInPanel layerKey={layerKey} name={button} />
          </div>
        ))}
      </div>
    </>
  );
};
