function handleAuth() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  const messageElement = document.getElementById("auth-message");

  // テストユーザーかどうかをチェック
  if (username === "eito" && password === "eito08") {
    messageElement.textContent = "テスト運用者としてログインしました！";
    localStorage.setItem("loggedIn", "true");
    localStorage.setItem("isTestUser", "true");  // テストユーザーフラグを設定
    window.location.href = "index.html";
    return;
  }

  // 通常のログイン処理
  const storedUser = JSON.parse(localStorage.getItem("user"));
  if (storedUser && storedUser.username === username && storedUser.password === password) {
    messageElement.textContent = "ログイン成功！";
    localStorage.setItem("loggedIn", "true");
    localStorage.removeItem("isTestUser"); // 通常ユーザーの場合はテストフラグを削除
    window.location.href = "index.html";
  } else if (!storedUser) {
    // 新規登録
    localStorage.setItem("user", JSON.stringify({ username, password }));
    messageElement.textContent = "新規登録が完了しました。ログインしました！";
    localStorage.setItem("loggedIn", "true");
    localStorage.removeItem("isTestUser"); // 新規ユーザーの場合もテストフラグを削除
    window.location.href = "index.html";
  } else {
    messageElement.textContent = "ユーザー名またはパスワードが間違っています。";
  }
}

// ページ読み込み時にログイン状態を確認
window.onload = () => {
  const isLoggedIn = localStorage.getItem("loggedIn");
  if (isLoggedIn === "true") {
    const authLinks = document.getElementById("auth-links");
    authLinks.innerHTML = `<a href="#" onclick="logout()">ログアウト</a>`;
  }
};

// ログアウト処理
function logout() {
  localStorage.removeItem("loggedIn");
  localStorage.removeItem("isTestUser"); // ログアウト時にテストユーザーフラグも削除
  window.location.reload();
}
