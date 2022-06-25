import { jsx, css } from "@emotion/react";
import React, { useContext } from "react";
import { ModalProps } from "../components/buttons_modal";
import { useModal } from "../hooks/useModal";
import { ButtonsModal } from "../components/buttons_modal";
import { ButtonsSettingContext } from "./../contexts/buttons_setting";

export const Editor: React.FC = () => {
  //const { prefixKeys } = useContext(ButtonsSettingContext);
  const [modalProps, openModal] = useModal();

  const { prefixKeys, setPrefixKeys } = useContext(
    ButtonsSettingContext
  );

  const handlePrefixKeysField = () => {
    openModal({
      title: "キープレフィックスの変更",
      prefill: prefixKeys,
      callbackOnSubmit: setPrefixKeys,
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
      xxx<br />
      <h3>設定中のプレフィックスキー</h3>
      <div
        css={css`
          position: relative;
          margin-bottom: 20px;
        `}
      >
        <input
          type="text"
          value={prefixKeys.join(', ')}
          readOnly={true}
          onClick={handlePrefixKeysField}
        />
        {<ButtonsModal {...(modalProps as ModalProps)} />}
      </div>
    </>
  )
}
