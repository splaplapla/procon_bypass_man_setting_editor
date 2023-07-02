/** @jsx jsx */

import { jsx, css } from "@emotion/react";
import React, { useState } from "react";
import { Button, buttons } from "../types/button";
import Form from "react-bootstrap/Form";
import { Button as BootstrapButton } from "react-bootstrap";

export type ModalProps = {
  callbackOnSubmit: (param: Array<Button>) => void;
  callbackOnClose: (param: boolean) => void;
  prefill: Array<Button>;
  title: string;
  visible: boolean;
};

type CheckedButtons = {
  [key in Button]: boolean;
};

export const ButtonsModal = ({
  callbackOnSubmit,
  callbackOnClose,
  title,
  prefill,
  visible,
}: ModalProps) => {
  if (!visible) {
    return null;
  }

  const [checkedButtonMap, setCheckedButtonMap] = useState(
    prefill.reduce(
      (a, b) => {
        a[b] = true;
        return a;
      },
      buttons.reduce((a, b) => {
        a[b] = false;
        return a;
      }, {} as CheckedButtons)
    )
  );

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const bs = Object.entries(checkedButtonMap)
      .reduce((acc, item) => {
        const checked: boolean = item[1];
        const button = item[0] as Button;
        checked && acc.push(button);
        return acc;
      }, [] as Array<Button>)
      .sort();

    callbackOnSubmit(bs);
    callbackOnClose(false);
  };
  const handleCancel = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    callbackOnClose(false);
  };
  const style = () => {
    return css(`
      position: absolute;
      align: left;
      top: 0px;
      left: 20px;
      width: 500px;
      height: 450px;
      border: solid;
      background-color: white;
      z-index: 100;
    `);
  };

  const handleClick = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCheckedButtonMap((previousButtonStats) => {
      previousButtonStats[e.target.value as Button] = e.target.checked;
      return previousButtonStats;
    });
  };

  return (
    <>
      <div className="container" css={style()}>
        <div className="row">
          <div className="col">
            <h5>{title}</h5>
            {buttons.map((b, index) => (
              <div key={index}>
                <Form.Check
                  type="checkbox"
                  value={b}
                  defaultChecked={checkedButtonMap[b]}
                  onChange={handleClick}
                  label={b}
                  id={`${title}-${b}`}
                />
              </div>
            ))}
          </div>
        </div>
        <hr />

        <div className="row">
          <div className="col">
            <BootstrapButton variant="secondary" onClick={handleCancel}>
              変更せず閉じる
            </BootstrapButton>{" "}
            <BootstrapButton variant="primary" onClick={handleSubmit}>
              変更する
            </BootstrapButton>
          </div>
        </div>
      </div>
    </>
  );
};
