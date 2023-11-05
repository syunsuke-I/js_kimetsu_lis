/**
 * ロード画面を表示する
 */
export function showLoadingIndicator() {
  document.getElementById('loading-indicator').style.display = 'flex';
}

/**
 * ロード画面を非表示にする
 */
export function hideLoadingIndicator() {
  // あえて少し送らせてます
  setTimeout(() => {
    document.getElementById('loading-indicator').style.display = 'none';
  }, 300);
}