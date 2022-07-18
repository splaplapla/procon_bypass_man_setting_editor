/** @jsx jsx */

import { jsx, css } from "@emotion/react";
import React, { useContext } from "react";
import { useModal } from "../hooks/useModal";
import { Button } from "../types/button";
import { updatePrefixKeysType } from "../reducers/setting_reducer";
import { SettingContext } from "./../contexts/buttons_setting";
import { ButtonsModal } from "../components/buttons_modal";

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
