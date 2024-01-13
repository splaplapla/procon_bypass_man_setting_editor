# procon_bypass_man_setting_editor

- https://github.com/splaplapla/procon_bypass_man で使う、コントローラーへの設定ファイル GUI エディターです
- https://splaplapla.github.io/procon_bypass_man_setting_editor/ で公開しています

# 開発

## セットアップ

- $ nodenv install
- $ yarn

## 開発用サーバの起動

- $ yarn dev
- Open http://localhost:8080/

## test

- yarn test

## リリース手順

- $ yarn release-build
- ./dist/index.html を開いて動作確認をする
- $ yarn deploy

## TODO

- pbm-cloud から import する機能
  - oauth2 で認証する
  - import して、pbm-cloud に反映したい
- 他のオプションを列挙する
  - open_macro
- 左スティックの感度を設定できるようにする
