/** @jsx jsx */

import { jsx, css } from "@emotion/react";
import React, { useState } from "react";
import { LayerKey, layerKeys } from "../types/layer_key";

interface LayerRef {
  setVisibility(status: string): string;
}

type Props = {
  children: React.ReactNode;
};

export const LayersTab: React.FC<Props> = ({ children }) => {
  const [selectedLayer, setSelectedLayer] = useState<LayerKey>("up");
  const layerRefs = layerKeys.map((l) => ({} as LayerRef));
  const switchLayer = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    if (event.target instanceof HTMLElement) {
      setSelectedLayer(event.target.dataset.layerKey as LayerKey);
      layerRefs.forEach((r) => r.setVisibility("hidden"));
      layerRefs[Number(event.target.dataset.layerKeyIndex)].setVisibility(
        "shown"
      );
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

  const liClassName = (layer: LayerKey) => {
    if (layer === selectedLayer) {
      return "active";
    } else {
      return "inactive";
    }
  };

  return (
    <>
      <div
        css={css`
          display: table;
        `}
      >
        <ul css={layersTabStyle()}>
          {layerKeys.map((l, index) => (
            <li key={l} className={liClassName(l)}>
              <a
                data-layer-key-index={index}
                data-layer-key={l}
                onClick={switchLayer}
              >
                {l}
              </a>
            </li>
          ))}
        </ul>
        {children}
      </div>
    </>
  );
};
