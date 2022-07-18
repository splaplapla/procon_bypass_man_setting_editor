/** @jsx jsx */

import { jsx, css } from "@emotion/react";
import React, { useState } from "react";
import { InstallableMacros } from "../components/installable_macros";
import { PrefixKeysForm } from "../components/prefix_keys_form";
import { LayersTab } from "../components/layers_tab";
import { layerKeys } from "../types/layer_key";
import { ButtonsPanel } from "../components/buttons_panel";
import { EditorPreview } from "../components/editor_preview";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export const Editor: React.FC = () => {
  return (
    <>
      <Container className="mt-5">
        <Row>
          <Col sm={{ span: 8 }} md={{ span: 8 }}>
            <h1>PBM Setting Editor</h1>
          </Col>
          <Col>
            <EditorPreview />
          </Col>
        </Row>

        <Row>
          <Col>
            <div className="border p-2 mt-4">
              <h3>インストール可能なマクロ</h3>
              <InstallableMacros />
            </div>

            <div className="border p-2 mt-4">
              <h3>設定中のプレフィックスキー</h3>
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
