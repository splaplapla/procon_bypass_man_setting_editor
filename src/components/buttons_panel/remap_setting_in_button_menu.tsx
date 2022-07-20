import { jsx, css } from "@emotion/react";
import React, { useState, useContext } from "react";
import { Button, buttons } from "../../types/button";
import { useModal } from "../../hooks/useModal";
import { LayerKey } from "../../types/layer_key";
import { SettingContext } from "./../../contexts/buttons_setting";
import { ButtonsModal } from "../../components/buttons_modal";
import { ButtonState } from "./../../lib/button_state";
import { remapType } from "../../reducers/layers_setting_reducer";

type ButtonProps = {
  layerKey: LayerKey;
  name: Button;
};

export const RemapSettingInButtonMenu: React.FC<ButtonProps> = ({
  layerKey,
  name,
}) => {
  const [modalProps, openModal] = useModal();
  const { layersSetting, layersSettingDispatch } = useContext(SettingContext);
  const buttonValue = layersSetting[layerKey][name] || {};
  const buttonState = new ButtonState(
    name,
    buttonValue.flip,
    buttonValue.remap
  );
  // リマップ
  const setRemapButtonsWithPersistence = (bs: Array<Button>) => {
    layersSettingDispatch({
      type: remapType,
      payload: { layerKey: layerKey, button: name, targetButtons: bs },
    });
  };
  const handleRemapButton = (e: React.ChangeEvent<HTMLInputElement>) => {
    openModal({
      title: "リマップ",
      prefill: buttonValue.remap?.to || [],
      callbackOnSubmit: setRemapButtonsWithPersistence,
    });
  };

  return (
    <>
      <ButtonsModal {...modalProps} />

      <div className="border m-2 p-2">
        <div>
          <b>リマップ設定</b>
        </div>
        <label>
          <input
            type="checkbox"
            onChange={handleRemapButton}
            checked={buttonState.isRemap()}
            disabled={!buttonState.isDisabledFlip()}
          />
          別のボタンに置き換える
          {buttonState.isRemap() && `(${buttonValue.remap?.to?.join(", ")})`}
        </label>
      </div>
    </>
  );
};
