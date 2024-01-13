import { jsx, css } from "@emotion/react";
import React, { useState, useContext } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { SettingContext } from "./../contexts/buttons_setting";
import { SettingTextualization } from "../lib/setting_textualization";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";

export const Preview: React.FC = () => {
  const [show, setShow] = useState(false);
  const { layersSetting, setting } = useContext(SettingContext);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const settingText = SettingTextualization({
    layers: layersSetting,
    prefixKeys: setting.prefixKeys,
    installed_macros: setting.installed_macros,
    rumbleOnLayerChange: setting.rumbleOnLayerChange,
    proconColor: setting.proconColor,
    envelope: true,
  });
  const settingTextForPbmCloud = SettingTextualization({
    layers: layersSetting,
    prefixKeys: setting.prefixKeys,
    installed_macros: setting.installed_macros,
    rumbleOnLayerChange: setting.rumbleOnLayerChange,
    proconColor: setting.proconColor,
    envelope: false,
  });

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        テキストファイルとして出力する
      </Button>

      <Modal show={show} onHide={handleClose} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>現在の設定ファイル</Modal.Title>
        </Modal.Header>

        <Tabs
          defaultActiveKey="profile"
          id="uncontrolled-tab-example"
          className="m-3"
        >
          <Tab eventKey="profile" title="plain">
            <Modal.Body>
              <Form.Control
                as="textarea"
                value={settingText}
                style={{ height: "100%" }}
                readOnly={true}
                rows={30}
              />
            </Modal.Body>
          </Tab>
          <Tab eventKey="home" title="pbm-cloud用">
            <Modal.Body>
              <Form.Control
                as="textarea"
                value={settingTextForPbmCloud}
                style={{ height: "100%" }}
                readOnly={true}
                rows={30}
              />
            </Modal.Body>
          </Tab>
        </Tabs>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
