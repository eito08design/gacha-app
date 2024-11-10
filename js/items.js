function updateItemCount() {
  const skipItemCount = localStorage.getItem("skipItemCount") || 0;
  document.getElementById("skip-item-count").textContent = skipItemCount;
}

function useSkipItem() {
  const skipItemCount = localStorage.getItem("skipItemCount") || 0;
  if (skipItemCount > 0) {
    // 使用可能な場合
    localStorage.setItem("skipItemCount", skipItemCount - 1);
    localStorage.removeItem("nextAvailableTime"); // ガチャ制限時間をリセット
    alert("時間スキップアイテムを使用しました！ガチャが引けます。");
    updateItemCount(); // アイテム数を更新
    window.location.href = "index.html";
  } else {
    alert("アイテムがありません。");
  }
}

// ページ読み込み時にアイテム数を更新
document.addEventListener("DOMContentLoaded", updateItemCount);
