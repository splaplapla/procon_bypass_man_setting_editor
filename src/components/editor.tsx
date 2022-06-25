import { jsx, css } from "@emotion/react";
import React from "react";
import { InstallableMacros } from "../components/installable_macros";
import { PrefixKeysForm } from "../components/prefix_keys_form";

export const Editor: React.FC = () => {
  return(
    <>
      <h1>設定ファイルエディタ</h1>
      <div>
        <a href="#" >エクスポートする</a>
      </div>

      <h3>インストール可能なマクロ</h3>
      <InstallableMacros />

      <h3>設定中のプレフィックスキー</h3>
      <PrefixKeysForm />
    </>
  )
}
