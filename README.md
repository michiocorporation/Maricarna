# Maricarna 製品紹介LP

HTML・CSS・JavaScriptのみ。ビルド、npm、PHP、データベースは不要です。

## 編集箇所
- index.html：製品の文章・構成
- style.css：色・文字サイズ・レイアウト・アニメーション
- script.js：横から入るスクロール表示・使い方のタブ・外部リンクの設定反映
- config.js：Googleフォームの回答用URL、Square URL、販売条件の確定フラグ、確認用表示
- tokushoho.html：特定商取引法に基づく表記（未確定項目を実際の情報へ置換）
- assets/：画像

## 確認用サイト
GitHub Pagesでmainブランチのrootを選択。検索用metaはnoindex,nofollowです。
URL未設定のリンクは準備中表示になり、送信・注文は実行しません。
Googleフォームには事業者のプライバシーポリシーと利用目的を掲載してください。
販売条件は消費者庁のガイドを参考に項目を用意していますが、実際の事業者情報・取引条件の記入が必要です。
https://www.no-trouble.caa.go.jp/what/mailorder/advertising.php

## 自社HP配下へ移行する手順
1. このフォルダーのHTML/CSS/JSとassets/を、自社サーバーの任意のサブフォルダー（例：/maricarna/）へコピー。Git関連ファイルとREADMEは公開不要です。
2. config.jsのgoogleFormUrl、squareUrlを設定。パスはすべて相対指定のためサイトドメインの書き換えは不要です。
3. tokushoho.htmlの全ての「準備中」を実際の内容へ置換し、冒頭の準備中説明を正式な案内へ変更。Square側の送料・支払・返品条件も一致させます。
4. config.jsのsalesInformationReadyをtrueにすると、URL設定済みのSquareボタンが有効になります。
5. previewModeをfalseに変更。検索掲載する場合は両HTMLのrobots noindexメタタグを削除します。
6. 実際のGoogleフォームの回答受付とSquareの申込内容を確認して公開します。

フォルダー単位で設置する独立LPです。既存HPのテンプレート内へHTMLを直接貼り付ける場合は、共通CSSと干渉しないよう調整が必要です。
Googleフォームへの遷移のみを実装し、LP内では個人情報を収集・保存しません。
外部へのテスト送信やSquareの決済は実施していません。
