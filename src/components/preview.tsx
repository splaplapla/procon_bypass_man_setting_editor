import { jsx, css } from "@emotion/react";
import React, { useState, useContext } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from 'react-bootstrap/Form';
import { SettingContext } from "./../contexts/buttons_setting";
import { SettingTextualization } from "../lib/setting_textualization"

export const Preview: React.FC = () => {
  const [show, setShow] = useState(false);
  const { layersSetting, setting } = useContext(SettingContext);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const settingText = SettingTextualization({ layers: layersSetting, prefixKeys: setting.prefixKeys, installed_macros: {} });

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        テキストファイルとして出力する
      </Button>

      <Modal show={show} onHide={handleClose} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>現在の設定ファイル</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Control
            as="textarea"
            value={settingText}
            style={{ "height": '100%' }}
            rows={30}
          />

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
