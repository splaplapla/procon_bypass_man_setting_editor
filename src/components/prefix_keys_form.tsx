import { jsx, css } from "@emotion/react";
import React, { useContext } from "react";
import { ModalProps } from "../components/buttons_modal";
import { Button } from "../types/button";
import { ButtonsModal } from "../components/buttons_modal";
import { updatePrefixKeys } from "../reducers/layer_reducer";
import { ButtonsSettingContext } from "./../contexts/buttons_setting";
import { useModal } from "../hooks/useModal";

export const PrefixKeysForm: React.FC = () => {
  const [modalProps, openModal] = useModal();

  const { setting, layersDispatch } = useContext(
    ButtonsSettingContext
  );

  const update = (buttons: Array<Button>) => {
      layersDispatch({
        type: updatePrefixKeys,
        payload: { buttons: buttons },
      });
    }

  const handlePrefixKeysField = () => {
    openModal({
      title: "キープレフィックスの変更",
      prefill: setting.prefixKeys,
      callbackOnSubmit: update,
    });
  };

  return(
    <>
      <div
        css={css`
          position: relative;
          margin-bottom: 20px;
        `}
      >
        <input
          type="text"
          value={setting.prefixKeys.join(', ')}
          readOnly={true}
          onClick={handlePrefixKeysField}
        />
        <ButtonsModal {...(modalProps as ModalProps)} />
      </div>
    </>
  )
}
