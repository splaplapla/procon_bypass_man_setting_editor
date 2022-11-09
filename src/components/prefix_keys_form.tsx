/** @jsx jsx */

import { jsx, css } from "@emotion/react";
import React, { useContext } from "react";
import { useModal } from "../hooks/useModal";
import { Button } from "../types/button";
import { updatePrefixKeysType } from "../reducers/setting_reducer";
import { SettingContext } from "./../contexts/buttons_setting";
import { ButtonsModal } from "../components/buttons_modal";
import { Button as BootstrapButton } from "react-bootstrap";

export const PrefixKeysForm: React.FC = () => {
  const [modalProps, openModal] = useModal();
  const { setting, settingDispatch } = useContext(SettingContext);
  const updatePrefixKeys = (buttons: Array<Button>) => {
    settingDispatch({
      type: updatePrefixKeysType,
      payload: { buttons: buttons },
    });
  };
  const handlePrefixKeysField = () => {
    openModal({
      title: "プレフィックスキーの変更",
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
          className="form-control"
        />
        <div className="form-control">
          <BootstrapButton onClick={handlePrefixKeysField} variant="primary">
            変更する
          </BootstrapButton>
        </div>

        <div
          css={css`
            position: absolute;
          `}
        >
          <ButtonsModal {...modalProps} />
        </div>
      </div>
    </>
  );
};
