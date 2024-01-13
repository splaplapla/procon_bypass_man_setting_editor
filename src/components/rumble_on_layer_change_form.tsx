import React, { useContext } from "react";
import Form from "react-bootstrap/Form";
import { updateRumbleOnLayerChangeType } from "../reducers/setting_reducer";
import { SettingContext } from "./../contexts/buttons_setting";

export const RumbleOnLayerChangeForm: React.FC = () => {
  const { setting, settingDispatch } = useContext(SettingContext);

  const handleClick = (event: React.MouseEvent<HTMLInputElement>) => {
    settingDispatch({
      type: updateRumbleOnLayerChangeType,
      payload: {
        rumbleOnLayerChange: (event.target as HTMLInputElement).checked,
      },
    });
  };

  return (
    <>
      <Form.Group className="mb-3">
        <Form.Group className="mb-3">
          <Form.Check
            type="switch"
            id="custom-switch"
            label="レイヤー変更時にコントローラーを振動させる"
            onClick={handleClick}
          />
        </Form.Group>
      </Form.Group>
    </>
  );
};
