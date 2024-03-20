let score = 0;
const cardList = [
    "darkness",
    "normal",
    "fairy",
    "fighting",
    "fire",
    "grass",
    "lightning",
    "metal",
    "psychic",
    "water"
]

let cardSet;
let playmat = [];
let rows = 4;
let columns = 5;

let card1Selected;
let card2Selected;

window.onload = function() {
    shuffleCards();
    begin();
}

function shuffleCards() {
    cardSet = cardList.concat(cardList); // For card list. 
    console.log(cardSet);
    for (let i = 0; i < cardSet.length; i++) { // Cards start at 0, go up by 1 but stop at the length of cardSet
        let type = Math.floor(Math.random() * cardSet.length); // Generates random number from list

        let mix = cardSet[i];
        cardSet[i] = cardSet[type];
        cardSet[type] = mix;
    }
    console.log(cardSet);
}

function begin() {
    for(let r = 0; r < rows; r++) { // Instead of using i as usual, I am using other letters to prevent clashing
        let row = [];
        for (let c = 0; c < columns; c++) {
            let cardImg = cardSet.pop(); // pop removes last element of array
            row.push(cardImg); // push adds elements to end of array

            let card = document.createElement("img");
            card.id = r.toString() + "-" + c.toString();
            card.src = cardImg + ".jpg";
            card.classList.add("card");
            card.addEventListener("click", selectCard);
            document.getElementById("playmat").append(card);
            // This section moves the img into the playmat
        }
        playmat.push(row);
    }
    console.log(playmat);
    setTimeout(flipCards, 1000);
}

function flipCards() {
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            let card = document.getElementById(r.toString() + "-" + c.toString());
            card.src = "back.jpg";
        }
    }
}

function selectCard() {
    if (this.src.includes("back")) {
        if (!card1Selected) {
            card1Selected = this;

            let targeta = card1Selected.id.split("-");
            let r = parseInt(targeta[0]);
            let c = parseInt(targeta[1]);

            card1Selected.src = playmat[r][c] + ".jpg";
        }
        else if (!card2Selected && this != card1Selected) {
            card2Selected = this;

            let targeta = card2Selected.id.split("-");
            let r = parseInt(targeta[0]);
            let c = parseInt(targeta[1]);

            card2Selected.src = playmat[r][c] + ".jpg";
            setTimeout(update, 1000);
        }
    }
}

function update() {
    if (card1Selected.src != card2Selected.src) {
        card1Selected.src = "back.jpg";
        card2Selected.src = "back.jpg";
        score += 1;
        document.getElementById("score").innerText = score;
    }

    card1Selected = null;
    card2Selected = null;
}