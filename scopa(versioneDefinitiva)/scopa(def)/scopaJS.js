let deck = [];
let deckLength = 40;
let obtainedCards;
let turn = 0;
let table = [];
let tableHTML = [];
let mazzettoHTML = [];
let suits = ["hearts", "diamonds", "clubs", "spades"];
let numbers = ["ace", "two", "three", "four", "five", "six", "seven", "jack", "queen", "king"];
let takenCards;
let playing;
let newCard;
let cartaHTML;
let mano1HTML;
let mano0HTML;
let tavoloHTML;
let yourButton;
let messaggiDestriSopraSopra;
let messaggiSinistriSopra;
let messaggiSinistriSotto;
let messaggiDestriSopra;
let messaggiDestriSotto;
let messages;
let haiFattoScopa;
let centerContainer;
let rightContainer;
let leftContainer;
let lastRound;
let prime;
let index;
let card;
let x;
let takable;
let clicked;
let newRoundButton;
let mainMenuButton;
let deckCounter;
let clickedCardsHand = undefined;
let clickedCardsTable = [];
let winMessage;
let scopeMessage;
let carteMessage;
let primieraMessage;
let oriMessage;
let settebelloMessage;
let assoDiCescoMessage;
let playedTurns = 0;
let playedRounds = 0;
let table_size = 4;
let hand_size = 3;
let assoDiCesco;

let blank = document.createElement("div");
blank.style.height = "250px"


//ai

let tableCopy;
let WithoutCombination;
let WithCombination;
let botLevel;
let botIsPlaying = false;
let allTablePossibilities;
let evaluation;
let bestEval;
let bestLength;
let pseudoTakenCards;
let pseudoHandCard;
let pseudoTakenCard;
let cardValueMax;
let bestCard;
let bestTableCards;
let combination;



function Cards(value, suit, number, isFigure, puntiPrimiera) { //oggetto "carta"

	this.value = value;
	this.number = number;
	this.suit = suit;
	this.isFigure = isFigure;
	this.puntiPrimiera = puntiPrimiera;

}

function createDeck() { //crea il mazzo. un loop per ogni seme

	for (suit of suits) {

		x = 1

		for (number of numbers) {

			card = new Cards(undefined, suit, number, false);

			card.value = x;
			x++;

			if (card.value > 7) {

			card.isFigure = true;
			card.puntiPrimiera = 10;

			}

			switch (card.value) {
				case 1:
					card.puntiPrimiera = 16;
					break
				case 2:
					card.puntiPrimiera = 12;
					break
				case 3:
					card.puntiPrimiera = 13;
					break
				case 4:
					card.puntiPrimiera = 14;
					break
				case 5: 
					card.puntiPrimiera = 15;
					break
				case 6:
					card.puntiPrimiera = 18;
					break
				case 7:
					card.puntiPrimiera = 21;
			}


			deck.push(card);

		}


	}


}

function shuffleDeck(deck) { //mischia il mazzo casualmente esegue 400 scambi
 
	for (let i = 0; i < 10 * deck.length; i++) {


		j = Math.floor(Math.random() * deck.length);


		let temp = deck[i % 40];
		deck[i % 40] = deck[j];
		deck[j] = temp;

	}

}

let players = [ 	//oggetto player

	{
		name: "Tu",
		hand: [],
		obtainedCards: 0,
		mazzetto: [],
		ores: 0,
		settebello: false,
		assoDiCesco: false,
		scope: 0,
		primiera: 0,
		lastTaken: false,
		handHTML: [],
		punti: 0,
	},

	{
		name: "Avversario",
		hand: [],
		obtainedCards: 0,
		mazzetto: [],
		ores: 0,
		settebello: false,
		assoDiCesco: false,
		scope: 0,
		primiera: 0,
		lastTaken: false,
		handHTML: [],
		punti: 0,
	},
]

function changeTurn() { //funzione per cambiare il turno. Chiama anche la funzione che fa giocare il bot
	
	turn++;
	turn = turn % players.length;

	if(playing && turn == 1) {

		setTimeout(() => {evaluatePosition()}, 500);

	} 

	messaggiDestriSotto.innerHTML = "hai: " + players[0].obtainedCards + " carte; Avversario ha: " + players[1].obtainedCards + " carte";
	console.log("TURNO CAMBIATO. TURNO: " + turn);
}

function cardEventListener(newCard) {	//event listener da dare alle carte in mano

	

	if(!botIsPlaying) {

		let nodes = document.querySelectorAll(".card");
			

		nodes.forEach(function(node) {

			node.style.border = "1px black solid";

		})

		newCard.style.border = "5px red solid";

	
		clickedCardsHand = players[turn].hand[players[turn].handHTML.indexOf(newCard)];

		console.log(clickedCardsHand);
	}

}

function tableEventListener(newCard, i) { //event listener da dare alle carte in tavola

	if(!botIsPlaying) {

		if(newCard.getAttribute("clicked") == "false") {

			newCard.style.border = "5px red solid";
			clickedCardsTable.push(table[tableHTML.indexOf(newCard)]);
			newCard.setAttribute("clicked", true);
	
			console.log(clickedCardsTable);
	
		} else {
	
			newCard.style.border = "1px black solid";
			let clickedcard = clickedCardsTable.splice(clickedCardsTable.indexOf(table[i]), 1);
			newCard.setAttribute("clicked", false);
	
			console.log(clickedCardsTable);
			console.log(clickedcard);
			console.log(table[i]);
	
	
		}

	}
}


function giveCards() { //dà le carte

	playing = false;

	document.getElementById("mano0").innerHTML = "";
	document.getElementById("mano1").innerHTML = "";

	for (let i = 0; i < hand_size; i++) {

		players[turn].hand[i] = (deck.shift(i));
		newCard = document.createElement("img");

		if (turn == 0){

			newCard.src = "./assets/" + players[turn].hand[i].number + "_" + players[turn].hand[i].suit + ".png";
			newCard.height = "250";
			newCard.width = "165";
			newCard.style.marginLeft = "2px";
			newCard.style.marginRight = "2px";
			newCard.classList.add("card");
			newCard.style.border = "1px black solid";
			document.getElementById("mano" + turn).appendChild(newCard);

			newCard.addEventListener("click", function() {

				cardEventListener(this);
	
			})

		} else {

			newCard.src = "./assets/dietro.png";
			newCard.height = "250";
			newCard.width = "165";
			newCard.style.marginLeft = "2px";
			newCard.style.marginRight = "2px";
			newCard.classList.add("card");
			newCard.style.border = "1px black solid";
			document.getElementById("mano" + turn).appendChild(newCard);

		}
	
		players[turn].handHTML.push(newCard);


	}

	changeTurn();

	for (let i = 0; i < hand_size; i++) {

		players[turn].hand[i] = (deck.shift(i));
		newCard = document.createElement("img")

		if (turn == 0){

			newCard.src = "./assets/" + players[turn].hand[i].number + "_" + players[turn].hand[i].suit + ".png"
			newCard.height = "250"
			newCard.width = "165"
			newCard.style.marginLeft = "2px"
			newCard.style.marginRight = "2px"
			newCard.classList.add("card")
			newCard.style.border = "1px black solid"
			document.getElementById("mano" + turn).appendChild(newCard)

			newCard.addEventListener("click", function() {

				cardEventListener(this)
	
			})

		} else {

			newCard.src = "./assets/dietro.png"
			newCard.height = "250"
			newCard.width = "165"
			newCard.style.marginLeft = "2px"
			newCard.style.marginRight = "2px"
			newCard.classList.add("card")
			newCard.style.border = "1px black solid"
			document.getElementById("mano" + turn).appendChild(newCard)

		}
	
		players[turn].handHTML.push(newCard);

		

	}
	changeTurn()

	playing = true

}



function startGame() { //comincia la partita

	giveCards();
	refreshTable();
	
}

function refreshTable() { //refresha il tavolo 

	if(playing) {
		
		document.getElementById("messaggiSinistriSopra").innerHTML = "";
		document.getElementById("messaggiSinistriSotto").innerHTML = "";

		clickedCardsHand = undefined;
		clickedCardsTable = [];


		if (playedTurns == 0) {

			table_size = 4

		} else {
			table_size = table.length
			tableHTML = []
			document.querySelector("#tavolo").innerHTML = ""
		}

		for (let i = 0; i < table_size; i++) {

			if(playedTurns == 0){

				table[i] = deck.shift(i);
			}

			newCard = document.createElement("img");
			newCard.src = "./assets/" + table[i].number + "_" + table[i].suit + ".png";
			newCard.height = "250"
			newCard.width = "165"
			newCard.style.marginLeft = "3px"
			newCard.style.marginRight = "3px"
			newCard.setAttribute("clicked", false)
			newCard.setAttribute("class", "tableCard")
			newCard.style.border = "1px black solid"


			newCard.addEventListener("click", function() {

				tableEventListener(this, i)

			})

			document.querySelector("#tavolo").appendChild(newCard);
			tableHTML.push(newCard);

		}

	}	
	
	messaggiDestriSopra.innerHTML = "mazzo: " + deck.length + " carte"

	if(deck.length == 0) {

		messaggiDestriSopra.style.color = "red"
	}

	playing = true;

	
}

function generalTakeability(card, table) { //controlla se puoi prendere almeno una carta


	if (table.lenght == 0) {
		return false 
	}

	if (table.length == 1) {
		if(card.value == table[0]) {
			return true
		}
	}

	if (table.length == 2) {
		if (card.value == table[0] || card.value == table[1] || card.value == table[0] + table[1]) {
			return true
		}
	}
	
	let allPossibilities = [];

	function subsets(index, sum, subset) {

		allPossibilities.push(sum);

		for(let i = index + 1; i < table.length; i++) {
			subsets(i, sum + table[i].value, subset.concat([table[i].value]));
		}
	}

	for (let i = 0; i < table.length; i++) {
		subsets(i, table[i].value, [table[i].value])
	}

	for (i in allPossibilities) {
		
		if (card != undefined && card.value == allPossibilities[i]) {

			console.log("card is takable");
			return true
		}
	}

	console.log(allPossibilities)
	return false

}


function checkTakeability(card, cardsOnTable) { //controlla se delle carte si possono prendere

	if(players[turn].hand.length != 0 && cardsOnTable.length > 0 && noFigures(card, table, cardsOnTable)){

		if(cardsOnTable != undefined) {

			if(card.value == cardsOnTable.reduce(sumCardsOnTable, 0)) {

				return 0

			} else {

				return 2
			}

		} else {
			
			return 2
		}

	} else if (!noFigures(card, table, cardsOnTable)) {

		return 1

	} else {

		return 2
	}

}

function noFigures(card, table, cardsOnTable) { //controlla se ci sono delle figure da prendere, che hanno la priorità
	
	if (cardsOnTable.length > 1) {

		for(i = 0; i < table.length; i++) {

			if(card.value == table[i].value && card.isFigure == true) {

				return false
			}
		}

	}
	

	return true

}

function sumCardsOnTable(total, number) { //somma il valore delle carte sul tavolo

	return total + number.value;

}


function insertInMazzetto(mazzetto) { //mette nel tuo mazzetto le carte


	if(!playing) {

		for(let player of players) {

			if(player.lastTaken == true) {

				mazzetto.forEach(function(card) {mazzetto.splice(mazzetto.indexOf(card), 1, [card])});

				player.obtainedCards += mazzetto.length;
				player.mazzetto.push(...mazzetto);
			}
		}

	} else {

		players[turn].obtainedCards += mazzetto.length;
		players[turn].mazzetto.push(...mazzetto);

	}

	
}

function calculatePrimiera(mazzetto, i) { //calcola la primiera con i punti 7: 21punti 6: 18punti ecc.

 	for (let i in mazzetto) {

		for(let suit of suits) {

			if(mazzetto[i][0].suit == suit && mazzetto[i][0].puntiPrimiera > prime[suits.indexOf(suit)]) {

				prime[suits.indexOf(suit)] = mazzetto[i][0].puntiPrimiera
				console.log(mazzetto[i][0].puntiPrimiera)
				console.log(mazzetto[i])
			}
		}
	}

	prime.forEach(element => { //se non hai preso almeno una carta di ogni seme, la primiera è nulla

		if(element == 0) {

			players[i].primiera = 0
			return
		}

	})

	players[i].primiera = prime.reduce(function(total, number) {return total + number}, 0)
	console.log(players[i].primiera)
}

function calculatePoints() {	//a fine partita, calcola i punti per ogni player e li mostra sullo schermo

	
	carteMessage = document.createElement("div");
	oriMessage = document.createElement("div");
	settebelloMessage = document.createElement("div");
	scopeMessage = document.createElement("div");
	primieraMessage = document.createElement("div");
	assoDiCescoMessage = document.createElement("div");

	carteMessage.classList.add("messages")
	oriMessage.classList.add("messages")
	settebelloMessage.classList.add("messages")
	scopeMessage.classList.add("messages")
	primieraMessage.classList.add("messages")
	assoDiCescoMessage.classList.add("messages")

	winMessage = document.createElement("div");
	winMessage.id = "winMessage";

	newRoundButton = document.createElement("button");
	newRoundButton.id = "newRoundButton";

	mainMenuButton = document.createElement("button");
	mainMenuButton.innerHTML = "torna al menu principale"
	mainMenuButton.addEventListener("click", () => {location.reload()})


	for (let i = 0; i < 2; i++) {

		prime = [0, 0, 0, 0]

		calculatePrimiera(players[i].mazzetto, i)

		for(let j = 0; j < players[i].mazzetto.length; j++) {


			if (players[i].mazzetto[j][0].suit == "diamonds" && players[i].mazzetto[j][0].value == 7) {
				
				players[i].settebello = true;
				players[i].ores++;

				settebelloMessage.innerHTML = "settebello: " + players[i].name + " sì" 

			} else if (players[i].mazzetto[j][0].suit == "diamonds") {

				players[i].ores++;


			} else if(players[i].mazzetto[j][0].suit == "spades" && players[i].mazzetto[j][0].value == 1 && assoDiCesco == "1") {

				players[i].assoDiCesco = true;

				assoDiCescoMessage.innerHTML = "asso di Cesco: " + players[i].name + " sì";
			}
			
		}
	}

	

	if(players[0].obtainedCards > players[1].obtainedCards) {
		players[0].punti++;
	} else if (players[0].obtainedCards == players[1].obtainedCards) {
		
	} else {
		players[1].punti++;
	}

	if(players[0].ores > players[1].ores) {
		players[0].punti++;
	} else if (players[0].ores == players[1].ores) {
		
	} else {
		players[1].punti++;
	}

	if(players[0].settebello == true ) {
		players[0].punti++;
	} else {
		players[1].punti++;
	}

	if(players[0].primiera > players[1].primiera) {
		players[0].punti++;

	} else if (players[0].primiera == players[1].primiera) {
		
	}  else {
		players[1].punti++
	}

	if(players[0].assoDiCesco == true && assoDiCesco == "1" ) {
		players[0].punti++;
	} else if(players[1].assoDiCesco == true && assoDiCesco == "1") {
		players[1].punti++;
	}

	players[0].punti += players[0].scope
	players[1].punti += players[1].scope


	carteMessage.innerHTML = "carte: " + players[0].name  + " " + players[0].obtainedCards + " ;  " + players[1].name + " " + players[1].obtainedCards 
	oriMessage.innerHTML = "denari: " + players[0].name  + " " + players[0].ores + " ;  " + players[1].name + " " + players[1].ores 
	scopeMessage.innerHTML = "scope: " + players[0].name  + " " + players[0].scope + " ;  " + players[1].name + " " + players[1].scope 
	primieraMessage.innerHTML = "primiera: " + players[0].name  + " " + players[0].primiera + " ;  " + players[1].name + " " + players[1].primiera 

	messages = document.querySelectorAll(".messages")
	messages.forEach(message => {

		message.style.font = "25px Georgia, serif"
		message.style.color = "black"

	})
	
	winMessage.style.font = "35px Georgia, serif"
	winMessage.style.color = "white"

	if(players[0].punti >= 11 && players[0].punti > players[1].punti) {

		winMessage.innerHTML ="Hai vinto!  Tu: " + players[0].punti + " ; " + "Avversario: " + players[1].punti;
		document.body.appendChild(winMessage);

	} else if (players[1].punti >= 11 && players[1].punti > players[0].punti) {

		winMessage.innerHTML = players[1].name + " ha vinto" + ";  Tu: " + players[0].punti + " , " +  "Avversario: " +  players[1].punti;
		document.body.appendChild(winMessage);

	} else {

		winMessage.innerHTML = "nessun vincitore ancora" + ";  Tu: " + players[0].punti + " , " +  "Avversario: " + players[1].punti;
		newRoundButton.innerHTML = "new round"
		newRoundButton.addEventListener("click", () => {newRound()})

		document.body.appendChild(winMessage);
		document.body.appendChild(newRoundButton);

	}

	document.body.style.flexDirection = "column"

	document.body.appendChild(mainMenuButton);

	document.body.appendChild(carteMessage);
	document.body.appendChild(oriMessage);
	document.body.appendChild(scopeMessage);
	document.body.appendChild(primieraMessage);
	document.body.appendChild(settebelloMessage);

	if(assoDiCesco == "1") {

		document.body.appendChild(assoDiCescoMessage);

	}

}

function checkNewTurn() { //controlla se bisogna giocare una nuova mano o se il gioco è finito 

	console.log("checking turn")

	if(players[0].hand.length == 0 && players[1].hand.length == 0) {
		
		if(deck.length == 0) {

			playing = false;
			checkVictory()

		} else {

			console.log("giving cards")	
			giveCards()

			console.log(players[turn].hand, players[(turn + 1) % 2].hand, table);

		}
	}
		
	if(table.length == 0 && playing) {

		players[turn].scope++;

		haiFattoScopa = document.createElement("div")
		haiFattoScopa.style.border = "5px black solid"
		haiFattoScopa.style.zIndex = "1"
		haiFattoScopa.style.font = "40px Georgia, serif"
		haiFattoScopa.style.color = "red"
		haiFattoScopa.innerHTML = "SCOPA!"
		document.getElementById("tavolo").appendChild(haiFattoScopa)

		setTimeout(() => {refreshTable()}, 1000)

		console.log(players[turn].name + "ha fatto scopa")

	} else {
		refreshTable();
	}

	deckCounter.innerHTML = deck.length

}


function checkVictory() { //eseguita a fine partita, varie esecuzioni per far finire la mano/partita e pulire la pagina statistiche

	playing = false

	insertInMazzetto(table)

	document.body.removeChild(document.getElementById("leftContainer"))
	document.body.removeChild(document.getElementById("centerContainer"))
	document.body.removeChild(document.getElementById("rightContainer"))


	console.log("game finished");

	calculatePoints()

}


function placeCard (card) { //piazza la carta sul tavolo se non puoi prendere nulla (con essa)

	if(card == undefined) {

		document.getElementById("messaggiSinistriSopra").innerHTML = "seleziona nuovamente la/e carta/e che desideri selezionare"
		return 4

	}

	if(!generalTakeability(card, table)) { //controlla se non puoi prendere nulla

		index = players[turn].hand.indexOf(card)

		table.push(players[turn].hand.splice(index, 1)[0]);	

		cartaHTML = document.querySelector("#mano" + turn).removeChild(players[turn].handHTML.splice(index, 1)[0])

		if(players[turn].handHTML.length == 0) {

			document.getElementById("mano" + turn).appendChild(blank)
	
		}

		tableHTML.push(cartaHTML)

		document.querySelector("#tavolo").appendChild(cartaHTML)

		playedTurns += 0.5

		checkNewTurn();

		if (botIsPlaying) {

			botIsPlaying = false;
			changeTurn();

		} else {

			botIsPlaying = true;
			setTimeout(() =>{changeTurn()}, 500);
		}

	} else {

		document.getElementById("messaggiSinistriSopra").innerHTML = "se puoi, devi prendere qualcosa. Seleziona un'altra carta, o delle carte sul tavolo"

	}

}


function takeCards(card, cardsOnTable) { //prende le carte e le mette nei rispettivi mazzi 
											
	let playersHand = players[turn].hand;

	if((card == undefined || cardsOnTable == undefined) && botIsPlaying == false) {

		document.getElementById("messaggiSinistriSopra").innerHTML = "seleziona nuovamente la/e carta/e che desideri selezionare"
		return 4

	}

	console.log(checkTakeability(card, cardsOnTable))
	if(checkTakeability(card, cardsOnTable) == 0) {

		takenCards = [];
		index = playersHand.indexOf(card);

		cartaHTML = document.querySelector("#mano" + turn).removeChild(players[turn].handHTML.splice(index, 1)[0]);

		if(players[turn].handHTML.length == 0) {

			document.getElementById("mano" + turn).appendChild(blank)
	
		}

		takenCards.push(playersHand.splice(index, 1))

		for (let i = 0; i < cardsOnTable.length; i++) {

			index = table.indexOf(cardsOnTable[i])

			document.querySelector("#tavolo").removeChild(tableHTML.splice(index, 1)[0])

			takenCards.push(table.splice(index, 1));

		}

		players[turn].lastTaken = true;
		players[(turn + 1) % 2].lastTaken = false;

		playedTurns += 0.5

		insertInMazzetto(takenCards);

		checkNewTurn();

		if (botIsPlaying) {

			botIsPlaying = false;
			changeTurn();
			
		} else {

			botIsPlaying = true;
			setTimeout(() =>{changeTurn()}, 500);
		}

	} else if (checkTakeability(card, cardsOnTable) == 1) {

		document.getElementById("messaggiSinistriSotto").innerHTML = "se hai la possibilità, devi prima prendere la figura";

	} else {

		document.getElementById("messaggiSinistriSopra").innerHTML = "non puoi prendere queste carte, ricontrolla"

	}

	console.log(players[0])
	console.log(players[1])
	console.log(table)
	console.log(takenCards)

}

function HTMLhandler() { //gestisce i bottoni

	document.getElementById("yourButton").addEventListener("click", function() {

		if (clickedCardsTable != 0) {

			setTimeout(() => {takeCards(clickedCardsHand, clickedCardsTable)}, 200)

		} else {

			setTimeout(() => {placeCard(clickedCardsHand)}, 200)
			
		}
	} )
}

function newRound() { //prepara il tavolo e le variabili a un nuovo round

	for(let player of players) {

		player.hand = [];
		player.obtainedCards = 0;
		player.mazzetto = [];
		player.ores = 0;
		player.settebello = false;
		player.scope = 0;
		player.lastTaken = false;
		player.handHTML = [];
		player.primiera = 0;
		player.assoDiCesco = false

	}

	table = [];
	tableHTML = [];
	mazzettoHTML = [];
	playedTurns = 0;
	turn = 0;
	botIsPlaying = false;


	playedRounds++;

	document.body.removeChild(winMessage);
	document.body.removeChild(newRoundButton);
	document.body.removeChild(carteMessage);
	document.body.removeChild(oriMessage);
	document.body.removeChild(scopeMessage);
	document.body.removeChild(primieraMessage);
	document.body.removeChild(settebelloMessage);

	if(assoDiCesco == "1") {
		document.body.removeChild(assoDiCescoMessage);
	}

	document.body.removeChild(mainMenuButton);

	main()
}


function createWindow() { //crea la pagina per il gioco

	if(playedRounds == 0) {

		document.body.removeChild(document.getElementById("titolo"))
		document.body.removeChild(document.getElementById("startButton"))
		document.body.removeChild(document.getElementById("blank"))
		document.body.removeChild(document.getElementById("regolamento"))
		document.body.removeChild(document.getElementById("botLevel"))
		document.body.removeChild(document.getElementById("assoDiCesco"))
	}

	document.body.style.flexDirection = "row"

	mano1HTML = document.createElement("div");
	mano0HTML = document.createElement("div");
	tavoloHTML = document.createElement("div");
	yourButton = document.createElement("button"); 

	deckCounter = document.createElement("div");
	deckCounter.height = "250"
	deckCounter.width = "165"
	deckCounter.style.border = "3px solid black"
	deckCounter.style.fontSize = "15px"

	messaggiDestriSopraSopra = document.createElement("div");
	messaggiDestriSopra = document.createElement("div");
	messaggiDestriSotto = document.createElement("div");
	messaggiSinistriSopra = document.createElement("div");
	messaggiSinistriSotto = document.createElement("div");
	centerContainer = document.createElement("div");
	rightContainer = document.createElement("div");
	leftContainer = document.createElement("div");	
	rightContainer.appendChild(messaggiDestriSopraSopra);
	rightContainer.appendChild(messaggiDestriSopra);
	rightContainer.appendChild(messaggiDestriSotto);
	leftContainer.appendChild(messaggiSinistriSopra);
	leftContainer.appendChild(messaggiSinistriSotto);

	mano1HTML.id = "mano1"
	mano0HTML.id = "mano0"
	tavoloHTML.id = "tavolo"
	yourButton.id = "yourButton"

	messaggiDestriSopra.id = "messaggiDestriSopraSopra";
	messaggiDestriSopra.id = "messaggiDestriSopra";
	messaggiDestriSotto.id = "messaggiDestriSotto";
	messaggiSinistriSopra.id = "messaggiSinistriSopra";
	messaggiSinistriSotto.id = "messaggiSinistriSotto";

	rightContainer.id = "rightContainer";
	centerContainer.id = "centerContainer";
	leftContainer.id = "leftContainer";

	yourButton.innerHTML = "prendi o posiziona le carte"
	yourButton.style.font = "25px Georgia, serif"

	mano1HTML.classList.add("mani")
	mano1HTML.classList.add("mano")

	document.body.appendChild(leftContainer)
	document.body.appendChild(centerContainer)
	document.body.appendChild(rightContainer)

	centerContainer.appendChild(mano1HTML)
	centerContainer.appendChild(tavoloHTML)
	centerContainer.appendChild(yourButton)
	centerContainer.appendChild(mano0HTML)

	rightContainer.style = "display: flex; justify-content: flex-end; width: 15vw; height: 100vh; flex-direction: column;"
	centerContainer.style = "display: flex; height: 100vh; width: 80vw; flex-direction: column; align-items: center; justify-content: space-around; flex-wrap: nowrap;"
	leftContainer.style = "display: flex; justify-content: center; width: 15vw; height: 100vh; flex-direction: column;"

	messaggiDestriSopraSopra.style = "font: 20px Georgia, serif; color: black; height: 30vh; text-align: center;"
	messaggiDestriSopra.style = "font: 20px Georgia, serif; color: orange; height: 30vh; text-align: center;"
	messaggiDestriSotto.style = "font: 34px Georgia, serif; color: blue; height: 25vh; text-align: center;"
	messaggiSinistriSopra.style = "font: 20px Georgia, serif; color: red; height: 10vh; text-align: center;"
	messaggiSinistriSotto.style = "font: 20px Georgia, serif; color: red; height: 10vh; text-align: center;"

	messaggiDestriSopraSopra.innerHTML = "Avversario: bot di livello " + botLevel;
}


//qui inizia lo sviluppo dell'ai

function generateCombinations(arr, length) {  //questa funzione serve per trovare tutte le combinazioni di
	let result = [];						  //carte prendibili dal tavolo. Gentilmente offerta da ChatGPT 3.5
  
	function generate(prefix, start, remainingLength) {
	  if (remainingLength === 0) {
		result.push(prefix);
		return;
	  }
  
	  for (let i = start; i < arr.length; i++) {
		generate(prefix.concat(arr[i]), i + 1, remainingLength - 1);
	  }
	}
  
	generate([], 0, length);
	return result;
  }
  
  function findAllSubarrays(arr) {
	let allSubarrays = [];
	const maxLength = arr.length;
  
	for (let length = 1; length <= maxLength; length++) {
	  const combinations = generateCombinations(arr, length);
	  allSubarrays = allSubarrays.concat(combinations);
	}
  
	return allSubarrays;
}

function evaluatePosition() { //questa funzione calcola le migliori carte da giocare, secondo certi criteri

	/*ATTENZIONE: anche il bot di livello 4 NON è imbattibile:
	c'è sempre la variante FORTUNA che non è stata calcolata, oltre ad ulteriori
	criteri di valutazione della propria mano e quella dell'avversario che non sono stati presi in considerazione.*/

	allTablePossibilities = findAllSubarrays(table);
	bestEval = 0;
	bestLength = 0;
	pseudoTakenCards = [];
	cardValueMax = 0;
	bestCard = undefined;
	bestTableCards = []
	takable = false;

	//il bot se può prendere, prende sempre. 
	
	for(pseudoHandCard of players[turn].hand) {

		if (generalTakeability(pseudoHandCard, table)) {

			takable = true;

		}
	}
	
	//nel caso in cui nessuna carta può prendere:
	if (!takable) {

		for(pseudoHandCard of players[turn].hand) {

			evaluation = 0;
			WithCombination = tableWithCombination(pseudoHandCard);
			
			if (pseudoHandCard.value > cardValueMax) {

				cardValueMax = pseudoHandCard.value;

				if(botLevel == 2) { 					//il bot di livello 2 gioca solo la carta più alta

					evaluation = cardValueMax;

				} else {
					
					evaluation++;
				}
			} else {

				evaluation += 0.5
			}

			if(botLevel > 3) { //il bot di livello 4 conosce la mano dell'avversario!!!

				players[(turn + 1) % 2].hand.forEach((card) => {

					if(Object.values(card).includes(pseudoHandCard.value)) {

						console.log("può essere presa")
						evaluation--;

					} else { 

						evaluation += 0.5;

					}

					if(checkTakeability(card, WithCombination) == 0 && table.length == 0) {
						console.log("oh no, può fare scopa")
						evaluation -= 3

					}

				})

			}
			
			if(pseudoHandCard.value == 7 && pseudoHandCard.suit == "diamonds" && botLevel > 2) { //vari downgrade dell'eval se viene avvantaggiato l'avversario con il posizionamento della carta

				evaluation += -1.5;

			}

			if (pseudoHandCard.value == 1 && pseudoHandCard.suit == "spades" && botLevel > 2 && assoDiCesco == "1") {
				
				evaluation += -1.5;
			}

			if(pseudoHandCard.suit == "diamonds" && botLevel > 2) {
			
				evaluation += -1;
			} 

			if(evaluation > bestEval || bestEval == 0) {

				bestEval = evaluation;
				bestCard = pseudoHandCard;

			}

			if(botLevel == 1) {			//il bot di livello 1 gioca solo la prima carta che si ritrova in mano

				bestCard = players[turn].hand[0]

			}
		}

		console.log(`best eval ${bestEval}`)
		console.log(`best card ${bestCard}`)

		players[turn].handHTML[players[turn].hand.indexOf(bestCard)].src = "./assets/" + bestCard.number + "_" + bestCard.suit + ".png"
		players[turn].handHTML[players[turn].hand.indexOf(bestCard)].style.border = "4px solid red"
		setTimeout(() => {placeCard(bestCard)}, 1500);
		
		return 0
	}

	//caso in cui il bot può prendere qualcosa 

	for(pseudoHandCard of players[turn].hand) {
		
		if (generalTakeability(pseudoHandCard, table)) {

			for (combination of allTablePossibilities) {

				if(checkTakeability(pseudoHandCard, combination) == 0) {

					evaluation = 0;

					WithoutCombination = tableWithoutCombination(combination)

					pseudoTakenCards = combination.concat(pseudoHandCard);

					for (pseudoTakenCard of pseudoTakenCards) {

						//vari upgrade o downgrade dell'eval nel caso in cui avvantaggi/svantaggi l'avversario
						
						if(pseudoTakenCard.suit == "diamonds" && botLevel > 1) {
							
							evaluation++;

						}

						if(pseudoTakenCard.suit == "diamonds" && pseudoTakenCard.value == 7 && botLevel > 1) {

							evaluation += 2;

						} else if (pseudoTakenCard.suit == "spades" && pseudoTakenCard.value == 1 && assoDiCesco == "1" && botLevel > 1) {

							evaluation += 2;
						}

						if(pseudoTakenCard.value == 7 && botLevel > 1) {

							evaluation += 0.75;

						}

						if(pseudoTakenCard.value == 6 && botLevel > 2) {

							evaluation += 0.5;

						}

						if(pseudoTakenCard.value == 1 && botLevel > 2) {

							evaluation += 0.25;

						}
						
					}

					//un punto all'eval va anche se la combinazione è quella che ti permette di prendere più carte possibili

					if (pseudoTakenCards.length > bestLength && botLevel > 2) {

						bestLength = pseudoTakenCards.length;
						evaluation++;

					}

					//se puoi fare scopa ovviamente la valutazione sale di molto

					if(combination.length == table.length && botLevel > 1) {

						evaluation += 2;

					}

					if(botLevel > 3) { //feature solo per il bot di livello 4: se dopo aver preso, puoi far scopa, la valutazione si abbassa di molto 
										
						//anche in questo caso il bot livello 4 conosce la mano dell'avversario

						players[(turn + 1) % 2].hand.forEach((card) => {

							if(checkTakeability(card, WithoutCombination) == 0 && table.length == 0) {
								console.log("oh no, può fare scopa")
								evaluation -= 3

							}
						})
					}

					if(evaluation > bestEval || bestEval == 0) {

						bestEval = evaluation;
						bestCard = pseudoHandCard;
						bestTableCards = combination.slice();

					}
				}
			}
		}
	}

	console.log("best card")
	console.log(bestCard)
	console.log(`best table cards`)
	console.log(bestTableCards)
	console.log(`best eval ${bestEval}`)


	bestTableCards.forEach(function(tableCard) {

		tableHTML[table.indexOf(tableCard)].style.border = "4px solid red"; 

	})
	

	players[1].handHTML[players[1].hand.indexOf(bestCard)].src = "./assets/" + bestCard.number + "_" + bestCard.suit + ".png";
	players[1].handHTML[players[1].hand.indexOf(bestCard)].style.border = "4px solid red"

	setTimeout(() => {takeCards(bestCard, bestTableCards)}, 1800);


	return 0

}

function tableWithoutCombination(combination) { //crea un array che rappresenta come sarebbe il tavolo se non avesse le carte che il bot vorrebbe prendere

	tableCopy = table.slice();
					
	combination.forEach((element) => {

		tableCopy.splice(tableCopy.indexOf(element), 1);

	})

	return tableCopy;

}

function tableWithCombination(pseudoHandCard) { //crea un array che rappresenta il tavolo più la carta che il bot vorrebbe piazzare

	tableCopy = table.slice();

	return tableCopy.concat(pseudoHandCard)
}


function main() { //funzione principale

	createWindow()
	createDeck()
	shuffleDeck(deck)
	startGame()
	HTMLhandler()

	
	if(playedRounds % 2 != 0){

		botIsPlaying = true;
		changeTurn();

	} 
	
}


document.getElementById("startButton").addEventListener("click", () => { //eventListener per il bottone che fa partire il tutto
	botLevel = document.getElementById("level").value

	if(botLevel == 0) {
		return
	}
	assoDiCesco = document.getElementById("assoCesco").value
	main()
})

//last modified 12.01.2924 22:55

//Copyright © 2024 Francesco Dozio 

