/** @jsx jsx */

import { jsx, css } from "@emotion/react";
import React, { useState, useContext } from "react";
import { useModal } from "../../hooks/useModal";
import { LayerKey } from "../../types/layer_key";
import { Button, buttons } from "../../types/button";
import { SettingContext } from "./../../contexts/buttons_setting";
import {
  disableFlipButtonType,
  alwaysFlipButtonType,
  flipIfPressedSelfButtonType,
  flipIfPressedSomeButtonsType,
  ignoreButtonsInFlipingButtonType,
} from "../../reducers/layers_setting_reducer";
import { ButtonsModal } from "../../components/buttons_modal";
import { ButtonState } from "./../../lib/button_state";

type ButtonProps = {
  layerKey: LayerKey;
  name: Button;
};

export const FlipSettingInButtonMenu: React.FC<ButtonProps> = ({
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

  // 無効
  const handleNullFlipValue = (e: React.MouseEvent<HTMLInputElement>) => {
    layersSettingDispatch({
      type: disableFlipButtonType,
      payload: { layerKey: layerKey, button: name },
    });
  };

  // 常に連打
  const handleFlipValue = (e: React.MouseEvent<HTMLInputElement>) => {
    layersSettingDispatch({
      type: alwaysFlipButtonType,
      payload: { layerKey: layerKey, button: name },
    });
  };

  // 自分自身への条件付き連打
  const openIfPressedRadioboxModal = (
    e: React.MouseEvent<HTMLInputElement>
  ) => {
    layersSettingDispatch({
      type: flipIfPressedSelfButtonType,
      payload: { layerKey: layerKey, button: name },
    });
  };

  // 条件付き連打
  const flipIfPressedSomeButtons =
    buttonValue?.flip?.if_pressed || ([] as Array<Button>);
  const setFlipIfPressedSomeButtonsWithPersistence = (bs: Array<Button>) => {
    layersSettingDispatch({
      type: flipIfPressedSomeButtonsType,
      payload: { layerKey: layerKey, button: name, targetButtons: bs },
    });
  };
  const openIfPressedSomeButtonsModal = (
    e: React.MouseEvent<HTMLInputElement>
  ) => {
    openModal({
      title: "特定のキーを押したときだけ",
      prefill: flipIfPressedSomeButtons,
      callbackOnSubmit: setFlipIfPressedSomeButtonsWithPersistence,
    });
  };

  // 無視
  const forceNeutralButtons =
    buttonValue.flip?.force_neutral || ([] as Array<Button>);
  const setIgnoreButtonsOnFlipingWithPersistence = (bs: Array<Button>) => {
    layersSettingDispatch({
      type: ignoreButtonsInFlipingButtonType,
      payload: { layerKey: layerKey, button: name, targetButtons: bs },
    });
  };
  const handleIgnoreButton = (e: React.ChangeEvent<HTMLInputElement>) => {
    openModal({
      title: "連打中は特定のボタンの入力を無視する",
      prefill: buttonValue.flip?.force_neutral || ([] as Array<Button>),
      callbackOnSubmit: setIgnoreButtonsOnFlipingWithPersistence,
    });
  };

  return (
    <>
      <div className="border m-2 p-2">
        <ButtonsModal {...modalProps} />

        <div>
          <b>連打設定</b>
        </div>

        <label>
          <input
            type="radio"
            onClick={handleNullFlipValue}
            checked={buttonState.isDisabledFlip()}
            readOnly={true}
          />
          無効
        </label>
        <br />

        <label>
          <input
            type="radio"
            onClick={handleFlipValue}
            checked={buttonState.isAlwaysFlip()}
            readOnly={true}
          />
          常に連打する
        </label>
        <br />

        <label>
          <input
            type="radio"
            onClick={openIfPressedRadioboxModal}
            checked={buttonState.isFlipIfPressedSelf()}
            readOnly={true}
          />
          このボタンを押している時だけ連打する({name})
        </label>
        <br />

        <label>
          <input
            type="radio"
            onClick={openIfPressedSomeButtonsModal}
            checked={buttonState.isFlipIfPressedSomeButtons()}
            readOnly={true}
          />
          特定のボタンを押したときだけ連打する
          {flipIfPressedSomeButtons.length > 0 &&
            `(${flipIfPressedSomeButtons.join(", ")})`}
        </label>

        <div className="border m-2 p-2">
          <div>
            <b>連打オプション</b>
          </div>
          <label>
            <input
              type="checkbox"
              onChange={handleIgnoreButton}
              checked={forceNeutralButtons.length > 0}
              disabled={buttonState.isDisabledFlip()}
            />
            連打中は特定のボタンの入力を無視する
            {forceNeutralButtons.length > 0 &&
              `(${forceNeutralButtons.join(", ")})`}
          </label>
        </div>
      </div>
    </>
  );
};
