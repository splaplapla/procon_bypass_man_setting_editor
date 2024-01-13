/** @jsx jsx */

import { css } from "@emotion/react";
import React from "react";
import { ButtonsPanel } from "../components/buttons_panel";
import { InstallableMacros } from "../components/installable_macros";
import { LayersTab } from "../components/layers_tab";
import { PrefixKeysForm } from "../components/prefix_keys_form";
import { Preview } from "../components/preview";
import { RumbleOnLayerChangeForm } from "components/rumble_on_layer_change_form";
import { layerKeys } from "../types/layer_key";

import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";

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
              <h3>全体設定</h3>
              <PrefixKeysForm />
              <hr />

              <RumbleOnLayerChangeForm />
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
