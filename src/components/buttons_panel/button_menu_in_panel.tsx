/** @jsx jsx */

import { jsx, css } from "@emotion/react";
import React, { useState, useContext } from "react";
import { useModal } from "../../hooks/useModal";
import { LayerKey } from "../../types/layer_key";
import { Button, buttons } from "../../types/button";
import { SettingContext } from "./../../contexts/buttons_setting";
import { FlipSettingInButtonMenu } from "./flip_setting_in_button_menu";
import { RemapSettingInButtonMenu } from "./remap_setting_in_button_menu";
import { ButtonState } from "./../../lib/button_state";

type ButtonProps = {
  layerKey: LayerKey;
  name: Button;
};

export const ButtonMenuInPanel: React.FC<ButtonProps> = ({
  layerKey,
  name,
}) => {
  return (
    <>
      <div
        css={css`
          position: relative;
        `}
      >
          <FlipSettingInButtonMenu layerKey={layerKey} name={name} />
          <RemapSettingInButtonMenu layerKey={layerKey} name={name} />
      </div>
    </>
  );
};
