import { jsx, css } from "@emotion/react";
import React, { useContext } from "react";
import { Button } from "../types/button";
import { ModalProps } from "../components/buttons_modal";
import { useModal } from "../hooks/useModal";
import { ButtonsModal } from "../components/buttons_modal";
import { InstallableMacros } from "../components/installable_macros";
import { ButtonsSettingContext } from "./../contexts/buttons_setting";
import { updatePrefixKeys } from "../reducers/layer_reducer";

export const Editor: React.FC = () => {
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
      <h1>設定ファイルエディタ</h1>
      <div>
        <a href="#" >
          エクスポートする
        </a>
      </div>

      <h3>インストール可能なマクロ</h3>
      <InstallableMacros />
      <h3>設定中のプレフィックスキー</h3>
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
