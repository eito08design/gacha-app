// ポップアップメッセージの表示
function showPopup(message) {
  document.getElementById("popup-message").textContent = message;
  document.getElementById("popup").style.display = "flex";

  // 3秒後に自動でポップアップを閉じる
  setTimeout(() => {
    closePopup();
  }, 1000);
}

// ポップアップを閉じる
function closePopup() {
  document.getElementById("popup").style.display = "none";
}

// 購入ボタンを押したときの処理
function purchaseItem() {
  const itemLimit = 5;
  let currentCount = parseInt(localStorage.getItem("skipItemCount") || "0");

  if (currentCount >= itemLimit) {
    showPopup("購入上限に達しています。");
  } else {
    localStorage.setItem("skipItemCount", currentCount + 1);
    showPopup("アイテムを購入しました！");
  }
}

// 広告視聴ボタンを押したときの処理
function watchAd() {
  let currentCount = parseInt(localStorage.getItem("skipItemCount") || "0");
  const adDuration = 5; // 広告時間を5秒に設定

  if (currentCount >= 5) {
    showPopup("アイテムの所持上限に達しています。");
    return;
  }

  // 広告ポップアップ表示
  document.getElementById("ad-popup").style.display = "flex";
  const countdownElement = document.getElementById("ad-countdown");
  const closeButton = document.getElementById("ad-close-button");
  closeButton.style.display = "none"; // 初期は非表示

  let countdown = adDuration;
  countdownElement.textContent = `${countdown}秒`;

  const countdownInterval = setInterval(() => {
    countdown -= 1;
    countdownElement.textContent = `${countdown}秒`;

    if (countdown === 0) {
      clearInterval(countdownInterval);
      countdownElement.style.display = "none"; // カウントダウンを非表示
      closeButton.style.display = "inline-block"; // バツボタンを表示
    }
  }, 1000);
}

// 広告ポップアップを閉じる
function closeAdPopup() {
  document.getElementById("ad-popup").style.display = "none";

  let currentCount = parseInt(localStorage.getItem("skipItemCount") || "0");
  localStorage.setItem("skipItemCount", currentCount + 1);
  showPopup("広告を見てアイテムを獲得しました！");
}
