const gachaCards = [
  { name: "キャラA", detail: "☆5のキャラクター", image: "images/card_a.png", rarity: 5, probability: 0.01, obtained: false, count: 0 },
  { name: "キャラB", detail: "☆4のキャラクター", image: "images/card_b.png", rarity: 4, probability: 0.05, obtained: false, count: 0 },
  { name: "キャラC", detail: "☆3のキャラクター", image: "images/card_c.png", rarity: 3, probability: 0.15, obtained: false, count: 0 },
  { name: "キャラD", detail: "☆2のキャラクター", image: "images/card_d.png", rarity: 2, probability: 0.29, obtained: false, count: 0 },
  { name: "キャラE", detail: "☆1のキャラクター", image: "images/card_e.png", rarity: 1, probability: 0.5, obtained: false, count: 0 }
];

const COOLDOWN_HOURS = 8;
const MAX_DAILY_DRAWS = 10;

let nextAvailableTime;

function loadCollection() {
  const savedCollection = JSON.parse(localStorage.getItem("collection")) || [];
  savedCollection.forEach(savedCard => {
    const card = gachaCards.find(c => c.name === savedCard.name);
    if (card) {
      card.obtained = true;
      card.count = savedCard.count;
    }
  });
  nextAvailableTime = localStorage.getItem("nextAvailableTime");
  if (nextAvailableTime) {
    nextAvailableTime = new Date(nextAvailableTime);
  }
}

function saveCollection() {
  localStorage.setItem("collection", JSON.stringify(gachaCards.filter(card => card.obtained)));
  localStorage.setItem("nextAvailableTime", nextAvailableTime);
}

function checkDailyDrawLimit() {
  const currentDate = new Date().toISOString().split('T')[0];
  const drawDate = localStorage.getItem("drawDate") || "";
  let dailyDrawCount = parseInt(localStorage.getItem("dailyDrawCount") || "0");

  if (drawDate !== currentDate) {
    dailyDrawCount = 0;
    localStorage.setItem("drawDate", currentDate);
  }

  if (dailyDrawCount >= MAX_DAILY_DRAWS) {
    alert("今日はこれ以上ガチャを引けません。");
    return false;
  }
  return true;
}

function drawGacha() {
  if (!checkDailyDrawLimit()) return;

  if (!canDrawGacha()) {
    alert(`次のガチャまで ${formatRemainingTime()} 残っています。`);
    return;
  }

  const randomCard = getRandomCardByProbability();
  randomCard.obtained = true;
  randomCard.count += 1;
  displayCard(randomCard);
  saveCollection();

  nextAvailableTime = new Date();
  nextAvailableTime.setHours(nextAvailableTime.getHours() + COOLDOWN_HOURS);
  saveCollection();
  updateTimerDisplay();

  let dailyDrawCount = parseInt(localStorage.getItem("dailyDrawCount") || "0");
  localStorage.setItem("dailyDrawCount", dailyDrawCount + 1);
}

function canDrawGacha() {
  if (!nextAvailableTime) return true;
  const now = new Date();
  return now >= nextAvailableTime;
}

function formatRemainingTime() {
  const now = new Date();
  const diffMs = nextAvailableTime - now;

  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffMinutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
  const diffSeconds = Math.floor((diffMs % (1000 * 60)) / 1000);

  const hours = String(diffHours).padStart(2, '0');
  const minutes = String(diffMinutes).padStart(2, '0');
  const seconds = String(diffSeconds).padStart(2, '0');

  return `${hours}:${minutes}:${seconds}`;
}

function updateTimerDisplay() {
  const timerElement = document.getElementById("timer");
  if (canDrawGacha()) {
    timerElement.textContent = "ガチャが引けます！";
    timerElement.classList.add("ready"); // readyクラス追加
  } else {
    timerElement.textContent = `次のガチャまで\n${formatRemainingTime()}`;
    timerElement.classList.remove("ready"); // readyクラスを除去
  }
}

function getRandomCardByProbability() {
  const randomValue = Math.random();
  let cumulativeProbability = 0;

  for (const card of gachaCards) {
    cumulativeProbability += card.probability;
    if (randomValue < cumulativeProbability) {
      return card;
    }
  }
  return gachaCards[gachaCards.length - 1];
}

function displayCard(card) {
  const cardElement = document.getElementById("card");
  const cardImage = document.getElementById("cardImage");
  const cardName = document.getElementById("cardName");
  const cardDetail = document.getElementById("cardDetail");

  cardImage.src = card.image;
  cardName.textContent = card.name;
  cardDetail.textContent = card.detail + " - " + card.count + "枚目";

  cardElement.classList.add("show");
}

// ページ読み込み時にコレクションをロードしてタイマーを更新
loadCollection();
updateTimerDisplay();
setInterval(updateTimerDisplay, 1000);
