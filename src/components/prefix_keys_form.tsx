/** @jsx jsx */

import { jsx, css } from "@emotion/react";
import React, { useContext } from "react";
import { ModalProps } from "../components/buttons_modal";
import { Button } from "../types/button";
import { ButtonsModal } from "../components/buttons_modal";
import { updatePrefixKeysType } from "../reducers/layer_reducer";
import { ButtonsSettingContext } from "./../contexts/buttons_setting";
import { useModal } from "../hooks/useModal";

export const PrefixKeysForm: React.FC = () => {
  const [modalProps, openModal] = useModal();
  const { setting, settingDispatch } = useContext(ButtonsSettingContext);
  const updatePrefixKeys = (buttons: Array<Button>) => {
    settingDispatch({
      type: updatePrefixKeysType,
      payload: { buttons: buttons },
    });
  };
  const handlePrefixKeysField = () => {
    openModal({
      title: "キープレフィックスの変更",
      prefill: setting.prefixKeys,
      callbackOnSubmit: updatePrefixKeys,
    });
  };

  return (
    <>
      <div
        css={css`
          margin-bottom: 20px;
        `}
      >
        <input
          type="text"
          value={setting.prefixKeys.join(", ")}
          readOnly={true}
          onClick={handlePrefixKeysField}
        />
        <ButtonsModal {...(modalProps as ModalProps)} />
      </div>
    </>
  );
};
