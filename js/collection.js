// ガチャカードのデータ
const gachaCards = [
  { name: "キャラA", detail: "☆5のキャラクター", image: "images/card_a.png", rarity: 5, probability: 0.01, obtained: false, count: 0 },
  { name: "キャラB", detail: "☆4のキャラクター", image: "images/card_b.png", rarity: 4, probability: 0.05, obtained: false, count: 0 },
  { name: "キャラC", detail: "☆3のキャラクター", image: "images/card_c.png", rarity: 3, probability: 0.15, obtained: false, count: 0 },
  { name: "キャラD", detail: "☆2のキャラクター", image: "images/card_d.png", rarity: 2, probability: 0.29, obtained: false, count: 0 },
  { name: "キャラE", detail: "☆1のキャラクター", image: "images/card_e.png", rarity: 1, probability: 0.5, obtained: false, count: 0 }
];

// Local Storageからコレクションデータを読み込む
function loadCollection() {
  const savedCollection = JSON.parse(localStorage.getItem("collection")) || [];
  savedCollection.forEach(savedCard => {
    const card = gachaCards.find(c => c.name === savedCard.name);
    if (card) {
      card.obtained = true;
      card.count = savedCard.count;
    }
  });
}

// コレクションを表示する
function displayCollection() {
  loadCollection(); // ローカルストレージからコレクションデータを読み込む
  const collectionContainer = document.getElementById("collection");

  gachaCards.forEach(card => {
    const cardElement = document.createElement("div");
    cardElement.className = "card";

    if (card.obtained) {
      cardElement.innerHTML = `<img src="${card.image}" alt="${card.name}">`;
      cardElement.addEventListener("click", () => showPopup(card)); // クリックでポップアップ表示
    } else {
      cardElement.classList.add("gray");
      cardElement.innerHTML = `<div class="card-name">未取得</div>`;
    }

    collectionContainer.appendChild(cardElement);
  });
}

// ポップアップを表示
function showPopup(card) {
  document.getElementById("popup-image").src = card.image;
  document.getElementById("popup-name").textContent = card.name;
  document.getElementById("popup-detail").textContent = `${card.detail}\n取得枚数: ${card.count}枚`;
  document.getElementById("card-popup").style.display = "flex";
}

// ポップアップを閉じる
function closePopup() {
  document.getElementById("card-popup").style.display = "none";
}

// ページ読み込み時にコレクションを表示
document.addEventListener("DOMContentLoaded", displayCollection);
