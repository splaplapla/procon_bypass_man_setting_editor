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

  const tabVisibilityClassName = (layer: LayerKey) => {
    if (layer === selectedLayer) {
      return "active nav-item";
    } else {
      return "inactive nav-item";
    }
  };

  const panelVisibilityStyle = (layerKey: LayerKey) => {
    if (/^active/.test(tabVisibilityClassName(layerKey))) {
      return css`
        display: block;
      `;
    } else {
      return css`
        display: none;
      `;
    }
  };

  const tabVisibilityAClassName = (layerKey: LayerKey) => {
    if (/^active/.test(tabVisibilityClassName(layerKey))) {
      return "nav-link active";
    } else {
      return "nav-link";
    }
  };

  return (
    <>
      <ul className="nav nav-tabs mt-4">
        {layerKeys.map((layerKey, index) => (
          <li key={layerKey} className={tabVisibilityClassName(layerKey)}>
            <a
              data-layer-key-index={index}
              data-layer-key={layerKey}
              onClick={switchLayer}
              className={tabVisibilityAClassName(layerKey)}
            >
              {layerKey}
            </a>
          </li>
        ))}
      </ul>

      {layerKeys.map((layerKey, index) => (
        <div key={index} css={panelVisibilityStyle(layerKey)}>
          <div className="mb-4" />
          {children[index]}
        </div>
      ))}
    </>
  );
};
