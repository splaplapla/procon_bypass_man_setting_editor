import React, { useContext } from "react";
import Form from "react-bootstrap/Form";
import { SettingContext } from "src/contexts/buttons_setting";
import { updateProconColor } from "src/reducers/setting_reducer";
import { colors } from "src/types/procon_color";

export const ProconColorForm: React.FC = () => {
  const { setting, settingDispatch } = useContext(SettingContext);

  const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    if (event.target.value === "") {
      settingDispatch({
        type: updateProconColor,
        payload: { proconColor: null },
      });
    } else {
      settingDispatch({
        type: updateProconColor,
        payload: { proconColor: event.target.value },
      });
    }
  };

  return (
    <Form.Group className="mt-4 mb-3">
      <Form.Label htmlFor="proconColor">プロコンの色を変更する</Form.Label>
      <Form.Select
        value={setting.proconColor}
        onChange={handleSelect}
        id="proconColor"
      >
        <option value={""}>未選択</option>
        {colors.map((color: string, index) => (
          <option key={index} value={color}>
            {color}
          </option>
        ))}
      </Form.Select>
    </Form.Group>
  );
};
