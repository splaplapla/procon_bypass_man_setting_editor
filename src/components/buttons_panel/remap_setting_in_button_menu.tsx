import { jsx, css } from "@emotion/react";
import React, { useState, useContext } from "react";
import { Button, buttons } from "../../types/button";
import { useModal } from "../../hooks/useModal";
import { LayerKey } from "../../types/layer_key";
import { SettingContext } from "./../../contexts/buttons_setting";
import { ButtonsModal } from "../../components/buttons_modal";
import { ButtonState } from "./../../lib/button_state";
import {
  remapType
} from "../../reducers/layer_reducer";

type ButtonProps = {
  layerKey: LayerKey;
  name: Button;
};

export const RemapSettingInButtonMenu: React.FC<ButtonProps> = ({
  layerKey, name
}) => {

  const [modalProps, openModal] = useModal();
  const { setting, layerDispatch } = useContext(SettingContext);
  const buttonValue = setting[layerKey][name] || {};
  const buttonState = new ButtonState(
    name,
    buttonValue.flip,
    buttonValue.remap
  );
  // リマップ
  const setRemapButtonsWithPersistence = (bs: Array<Button>) => {
    layerDispatch({
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

      <fieldset>
        <legend>
          <strong>リマップ設定</strong>
        </legend>
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
      </fieldset>
    </>
  )
}