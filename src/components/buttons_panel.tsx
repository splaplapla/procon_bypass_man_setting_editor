/** @jsx jsx */

import { jsx, css } from "@emotion/react";
import React, { useState, useContext } from "react";
import { LayerKey } from "../types/layer_key";
import { MacroSettings } from "./../components/macro_settings";
import { ButtonInPanel } from "./../components/buttons_panel/button_in_panel";
import { buttons } from "../types/button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

type Props = {
  layerKey: LayerKey;
};

export const ButtonsPanel: React.FC<Props> = ({ layerKey }) => {
  const liStyle = css`
    border: 1px solid #aaa;
    margin: 0.2em;
    padding: 0.5em;
  `;

  return (
    <>
      <h4>適用可能なマクロ</h4>
      <MacroSettings layerKey={layerKey} />

      <h4>各ボタンの設定</h4>
      <Container>
        <Row>
          {buttons.slice(0, 3).map((button, index) => (
            <Col>
              <div key={index} css={liStyle}>
                <ButtonInPanel layerKey={layerKey} name={button} />
              </div>
            </Col>
          ))}
        </Row>

        <Row>
          {buttons.slice(3, 6).map((button, index) => (
            <Col>
              <div key={index} css={liStyle}>
                <ButtonInPanel layerKey={layerKey} name={button} />
              </div>
            </Col>
          ))}
        </Row>

        <Row>
          {buttons.slice(6, 9).map((button, index) => (
            <Col>
              <div key={index} css={liStyle}>
                <ButtonInPanel layerKey={layerKey} name={button} />
              </div>
            </Col>
          ))}
        </Row>

        <Row>
          {buttons.slice(9, 12).map((button, index) => (
            <Col>
              <div key={index} css={liStyle}>
                <ButtonInPanel layerKey={layerKey} name={button} />
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
};
