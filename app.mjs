import Util from "./js/util.mjs";
import { log } from "./js/print.mjs";

let cards = [];
let shuffledCards = [];
let cardIndex = 0;

// ---------------------------------------------------------
const cardElement = document.getElementById("card");
cardElement.onclick = flipCard;
cardElement.ondragover = ignoreDefaultBehaviour;
cardElement.ondrop = reciveCardFile;

const nextBt = document.getElementById("navigateNext");
const backBt = document.getElementById("navigateBack");
nextBt.onclick = moveToNextCard;
backBt.onclick = moveToPreviousCard;

updateButtonStatus();

// ---------------------------------------------------------

function moveToNextCard(e) {
  log("move next");
  cardIndex++;
  displayCardAtIndex(cardIndex);
  updateButtonStatus();
}

function moveToPreviousCard(e) {
  log("move prv");
  cardIndex--;
  displayCardAtIndex(cardIndex);
  updateButtonStatus();
}

function updateButtonStatus() {
  if (cards.length == 0) {
    nextBt.setAttribute("disabled", true);
    backBt.setAttribute("disabled", true);
  } else if (cardIndex == 0) {
    nextBt.removeAttribute("disabled");
    backBt.setAttribute("disabled", true);
  } else if (cardIndex == cards.length - 1) {
    nextBt.setAttribute("disabled", true);
    backBt.removeAttribute("disabled");
  }
}

function displayCardAtIndex(index) {
  clearCard();
  setCardContent(shuffledCards[cardIndex]);
  showFrontOfCard();
}

function showFrontOfCard() {
  const card = document.getElementById("card");
  card.classList.remove("flipped");
}

function ignoreDefaultBehaviour(e) {
  e.preventDefault();
}

function reciveCardFile(e) {
  e.preventDefault();

  const files = e.dataTransfer.files;

  if (files.length > 0) {
    const file = files[0];
    const reader = new FileReader();
    reader.onload = parseIncomingData;
    reader.readAsText(file);
  }
}

function parseIncomingData(e) {
  try {
    // GJØR "FARLIGE TING"
    let source = JSON.parse(e.target.result);
    cards = source.cards;
    shuffledCards = Util.shuffle(cards);
    setCardContent(shuffledCards[cardIndex]);
    updateButtonStatus();
  } catch (err) {
    // HÅNDTER FEIL
    alert("Kunne ikke lese filen. Er det en gyldig JSON-fil?");
    cards = [];
    cardIndex = 0;
  }
}

function setCardContent(card) {
  const frontEl = document.getElementById("front");
  const backEl = document.getElementById("back");

  const frontText = document.createElement("P");
  const backText = document.createElement("P");

  frontText.innerText = card.front;
  backText.innerText = card.back;
  clearCard();
  frontEl.appendChild(frontText);
  backEl.appendChild(backText);
}

function clearCard() {
  const frontEl = document.getElementById("front");
  const backEl = document.getElementById("back");
  frontEl.innerHTML = "";
  backEl.innerHTML = "";
}

function flipCard(e) {
  const card = document.getElementById("card");
  card.classList.toggle("flipped");
}

// ---------------------------------------------------------
