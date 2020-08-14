# TheSkyBlock 開発サーバー ワールドバックアップツール

ワールドをgzip圧縮してGoogleDriveにアップロードするツール

`backup_yyyy-MM-dd_HH-mm-ss.tar.gz` で保存されます

## 使い方

### 1. Google APIs

1. [Google Developer Console](https://console.developers.google.com) でGoogle APIsのプロジェクトを作成
1. アプリケーションの種類が `デスクトップ アプリ` のOAuth クライアントIDを作成
1. 作ったクライアントIDのJsonをダウンロードし、 `credentials.json` にリネームして配置
1. `yarn token` を実行し、トークンを発行

### 2. 設定ファイル

1. `template_config.yaml` を基に `config.yaml` 作成
1. ファイル内のコメントに従って設定値を入力

### 3. 実行

1. `yarn`
1. `yarn start`

## ライセンス

[MIT](/LICENSE)
