/* 公開前の設定。URLには https:// から始まる実際のURLを入力してください。 */
window.MARICARNA_CONFIG = Object.freeze({
  googleFormUrl: '', // Googleフォームの回答用URL（編集用URLではありません）
  squareUrl: '', // Squareの申込URL。後日設定
  salesInformationReady: false, // tokushoho.htmlの全項目とSquare側の条件を確定後にtrue
  previewMode: true // 本運用時はfalse。HTMLのnoindexも別途削除してください
});
