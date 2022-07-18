/** @jsx jsx */

import { jsx, css } from "@emotion/react";
import React, { useState } from "react";
import { InstallableMacros } from "../components/installable_macros";
import { PrefixKeysForm } from "../components/prefix_keys_form";
import { LayersTab } from "../components/layers_tab";
import { layerKeys } from "../types/layer_key";
import { ButtonsPanel } from "../components/buttons_panel";
import { EditorPreview } from "../components/editor_preview";

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


export const Editor: React.FC = () => {
  return (
    <>
      <Container>
        <h1>PBM Setting Editor</h1>
        <Row>
          <Col sm={{ offset: 8 }}  md={{ offset: 8 }}>
            <EditorPreview />
          </Col>
        </Row>

        <Row>
          <Col>
            <fieldset className="border p-2 mt-4">
              <legend>
                <h3>インストール可能なマクロ</h3>
              </legend>
              <InstallableMacros />
            </fieldset>

            <fieldset className="border p-2 mt-4">
              <legend>
                <h3>設定中のプレフィックスキー</h3>
                <PrefixKeysForm />
              </legend>
            </fieldset>

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
