/** @jsx jsx */

import { jsx, css } from "@emotion/react";
import React, { useState } from "react";
import { LayerKey, layerKeys } from "../types/layer_key";

type Props = {
  children: Array<React.ReactNode>;
};

export const LayersTab: React.FC<Props> = ({ children }) => {
  const [selectedLayer, setSelectedLayer] = useState<LayerKey>("up");
  const switchLayer = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    if (event.target instanceof HTMLElement) {
      const layerKey = event.target.dataset.layerKey as LayerKey;
      setSelectedLayer(layerKey);
    }
  };

  const layersTabStyle = () => {
    return css`
      list-style: none;
      display: flex;
      margin: 0;
      padding: 0;
      border-left: 1px solid #aaa;
      margin-bottom: 30px;
      li {
        border-top: 1px solid #aaa;
        border-right: 1px solid #aaa;
        &.active {
          border-bottom: 1px solid #white;
        }
        &.inactive {
          border-bottom: 1px solid #aaa;
        }
        a {
          padding: 20px;
          display: block;
          &:hover {
            cursor: pointer;
          }
        }
      }
    `;
  };

  const tabVisibilityClassName = (layer: LayerKey) => {
    if (layer === selectedLayer) {
      return "active";
    } else {
      return "inactive";
    }
  };

  const panelVisibilityStyle = (layerKey: LayerKey) => {
    if (tabVisibilityClassName(layerKey) == "active") {
      return css`
        display: block;
      `;
    } else {
      return css`
        display: none;
      `;
    }
  };

  return (
    <>
      <ul css={layersTabStyle()}>
        {layerKeys.map((layerKey, index) => (
          <li key={layerKey} className={tabVisibilityClassName(layerKey)}>
            <a
              data-layer-key-index={index}
              data-layer-key={layerKey}
              onClick={switchLayer}
            >
              {layerKey}
            </a>
          </li>
        ))}
      </ul>

      {layerKeys.map((layerKey, index) => (
        <div key={index} css={panelVisibilityStyle(layerKey)}>{children[index]}</div>
      ))}
    </>
  );
};
