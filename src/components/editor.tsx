/** @jsx jsx */

import { jsx, css } from "@emotion/react";
import React, { useState } from "react";
import { InstallableMacros } from "../components/installable_macros";
import { PrefixKeysForm } from "../components/prefix_keys_form";
import { LayersTab } from "../components/layers_tab";
import { layerKeys } from "../types/layer_key";
import { ButtonsPanel } from "../components/buttons_panel";
import { Preview } from "../components/preview";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export const Editor: React.FC = () => {
  return (
    <>
      <Container
        className="mt-5"
        css={css`
          height: 1500px;
        `}
      >
        <Row>
          <Col sm={{ span: 8 }} md={{ span: 8 }}>
            <h1>PBM Setting Generator</h1>
            <a href="https://github.com/splaplapla/procon_bypass_man">
              https://github.com/splaplapla/procon_bypass_man
            </a>{" "}
            の設定ファイルを生成します
          </Col>
          <Col>
            <Preview />
          </Col>
        </Row>

        <Row>
          <Col>
            <div className="border p-2 mt-4">
              <h3>インストール可能なマクロ</h3>
              <InstallableMacros />
            </div>

            <div className="border p-2 mt-4">
              <h3>レイヤーを変更するプレフィックスキー</h3>
              <PrefixKeysForm />
            </div>

            <LayersTab>
              {layerKeys.map((layerKey, index) => (
                <ButtonsPanel layerKey={layerKey} key={index} />
              ))}
            </LayersTab>
          </Col>
        </Row>
      </Container>
    </>
  );
};
