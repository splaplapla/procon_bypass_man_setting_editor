# procon_bypass_man_setting_editor
* https://github.com/splaplapla/procon_bypass_man で使う、コントローラーへの設定ファイルGUIエディターです
* https://splaplapla.github.io/procon_bypass_man_setting_editor/ で公開しています

# 開発
## セットアップ
* $ nodenv install
* $ yarn

## 開発用サーバの起動
* $ yarn server
* Open http://localhost:8080/

## リリース手順
* $ yarn release-build
* ./dist/index.html を開いて動作確認をする
* $ yarn deploy

## TODO
* 適用可能なマクロがないタイトルの場合はなしってかく
* import
* 他のオプションを列挙する
  * manual macroとか
* 出力の改行がいまいちなのでリーダブルにする
* pbmのサポートバージョンを明記する
* github ribonをつける
