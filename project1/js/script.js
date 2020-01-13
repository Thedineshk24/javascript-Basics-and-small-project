//alert('Ayu')

// Challenge 1: Your Age In Days


function AgeInDays()
{
	var birthyear = prompt("What year u Born ? ");
	var today = new Date();
	var date = today.getFullYear();
	var AgeInDayss = (date-birthyear) * 365;

	var h1 = document.createElement('h1');
	var textAnswer = document.createTextNode("You Are "+AgeInDayss.toString()+" Days Old.");
	h1.setAttribute('id','AgeInDays');
	h1.appendChild(textAnswer);
	document.getElementById("flex-box-result").appendChild(h1);

	
}

function reset()
{
	document.getElementById('AgeInDays').remove();
}

function catGen()
{
	var image = document.createElement('img');
	var div = document.getElementById('flex-cat-gen');
	image.src = "https://www.animatedimages.org/data/media/209/animated-cat-image-0181.gif";
	div.appendChild(image);
}

// Challeng  3: rock,paper,scissors

function rpsGame(yourChoice){
	console.log(yourChoice);
	var humanChocie,botChoice;
	humanChocie = yourChoice.id;

	botChoice = numberToChocie(randToRpsInt());
	console.log('computerChoice',botChoice);

	results = decideWinner(humanChocie,botChoice);

	console.log(results);
	message = finalMessage(results);//{'youwon':1,'color':'green'}
	console.log(message);

	rpsFrontEnd(yourChoice.id,botChoice,message);
}

function randToRpsInt(){
	return Math.floor(Math.random() * 3);
}

function numberToChocie(number){
	return['rock','paper','scissors'][number];
}

function decideWinner(yourChoice,computerChoice){
	var rpsDatabase = {
		'rock':{'scissors':1,'rock':0.5,'paper':0},
		'paper':{'rock':1,'paper':0.5,'scissors':0},
		'scissors':{'paper':1,'scissors':0.5,'rock':0}
	};

	var yourScore = rpsDatabase[yourChoice][computerChoice];
	var computerScore = rpsDatabase[computerChoice][yourChoice];//problem variable not taking vals it takes undefined

	return[yourScore,computerScore];
}

function finalMessage(yourScore,computerScore){
	console.log(yourScore,computerScore);
	if(yourScore === 0){
		return {'message':'you lost!','color':'red'};
	}
	else if(yourScore === 0.5){
		return {'message':'you tied!','color':'yellow'};
	}
	else {
		return{'message':'you won!','color':'green'};
	}
}

function rpsFrontEnd(humanChocieImage,botChoiceImage,finalMessage){
	var imageDataBase = {
		'rock':document.getElementById('rock').src,
		'paper':document.getElementById('paper').src,
		'scissors':document.getElementById('scissors').src
	}

	// remove all the images
	document.getElementById('rock').remove();
	document.getElementById('paper').remove();
	document.getElementById('scissors').remove();

	var humanDiv = document.createElement('div');
	var botDiv = document.createElement('div');
	var messageDiv = document.createElement('div');

	humanDiv.innerHTML = "<img src='" + imageDataBase[humanChocieImage] + "'height='150px' width='150px' style='box-shadow:0px 10px 50px rgba(37,50,233,1);'>";
	messageDiv.innerHTML = "<h1 style='color:" + finalMessage['color'] + "; font-size:60px; padding:30px '>" + finalMessage['message'] + "</h1>";
	botDiv.innerHTML = "<img src='" + imageDataBase[botChoiceImage] + "'height='150px' width='150px' style='box-shadow:0px 10px 50px rgba(243,38,24,1);'>";
	
	document.getElementById('flex-box-rps-div').appendChild(humanDiv);
	document.getElementById('flex-box-rps-div').appendChild(botDiv);
	document.getElementById('flex-box-rps-div').appendChild(messageDiv);
}


// Challange 4 : Change All Buttons Colors

var all_buttons = document.getElementsByTagName('button');
console.log(all_buttons);
//var arr = Array.prototype.slice.call(all_buttons);
//var a = [].slice.call( all_buttons );
var copyAllButtons = [];
//let i = 0;
//var l = all_buttons.length;
//console.log(all_buttons);
//var l  = arr.length;
//console.log(l)
for(let i = 0;i < all_buttons.length ;i++){
	copyAllButtons.push(all_buttons[i].classList[1]);
}
console.log(copyAllButtons);


function buttonColorChange(buttonThingy){
	if(buttonThingy.value === 'red'){
		buttonRed();
	}else if(buttonThingy.value === 'green'){
		buttonGreen();
	}else if(buttonThingy.value === 'reset'){
		buttonReset();
	}else if(buttonThingy.value === 'random'){
		randomColors();
	}
}

function buttonRed(){
	for(let i =0 ; i < all_buttons.length;i++){
		all_buttons[i].classList.remove(all_buttons[i].classList[1]);
		all_buttons[i].classList.add('btn-danger');
	}
}

function buttonGreen(){
	for(let i =0; i< all_buttons.length;i++){
		all_buttons[i].classList.remove(all_buttons[i].classList[1]);
		all_buttons[i].classList.add('btn-success');
	}
}

function buttonReset(){
	for(let i =0 ; i < all_buttons.length ; i++){
		all_buttons[i].classList.remove(all_buttons[i].classList[1]);
		all_buttons[i].classList.add(copyAllButtons[i]);
	}
}

function randomColors(){
	let chocies = ['btn-danger','btn-success','btn-warning','btn-primary'];
	for(let i = 0; i < all_buttons.length; i++){
		let randomNumbers = Math.floor(Math.random() * 4);
		all_buttons[i].classList.remove(all_buttons[i].classList[1]);
		all_buttons[i].classList.add(chocies[randomNumbers]);
	}
}


// challange 5 : BlackJack

let blackjackgame = {
	'you':{'scoreSpan':'#your-blackjack-result','div':'#your-box','score':0},
	'dealer':{'scoreSpan':'#dealer-blackjack-result','div':'#dealer-box','score':0},
	'cards':['2','3','4','5','6','7','8','9','10','K','J','Q','A'],
	'cardsMap':{'2':2,'3':3,'4':4,'5':5,'6':6,'7':7,'8':8,'9':9,'10':10,'K':10,'J':10,'Q':10,'A':[1,11]},
	'wins':0,
	'losses':0,
	'draws':0,
	'isStand':false,
	'turnOver':false,
};

const YOU = blackjackgame['you'];
const DEALER = blackjackgame['dealer'];
//sounds
const hitSound = new Audio('sounds/swish.m4a');
const lossSound = new Audio('sounds/aww.mp3');
const winSound = new Audio('sounds/cash.mp3');

document.getElementById("blackjack-hit-button").addEventListener("click",blackjackHit);
document.getElementById("blackjack-stand-button").addEventListener("click",dealerLogic);
document.getElementById("blackjack-deal-button").addEventListener("click",blackjackDeal);
//document.getElementById("blackjack-deal-button").addEventListener("click",)
//console.log(yourImages);

function blackjackHit()
{
	if(blackjackgame['isStand'] === false){
			let cards = randomCard();
			//console.log(cards);
			showCard(cards,YOU);
			updateScore(cards,YOU);
			//console.log(YOU['score']);
			showScore(YOU);

	}
	
}

function randomCard(){
	let randomIndex = Math.floor(Math.random()*13);
	return blackjackgame['cards'][randomIndex];
}


function showCard(cards,activeplayer){
	if(activeplayer['score'] <=21 ){
		let cardImage =document.createElement('img');
		cardImage.src = `img/${cards}.png`;
		document.querySelector(activeplayer['div']).appendChild(cardImage); // write like this so it cannot give u null type of error
		hitSound.play();
	}
}


function blackjackDeal(){
	if(blackjackgame['turnOver'] === true){
			blackjackgame['turnOver'] = false;
			//showResult(computeWinner());; // calling winners function inside showResult();
			let winner = computeWinner();
			showResult(winner);

			let yourImages = document.querySelector('#your-box').querySelectorAll('img');
			let dealerImages = document.querySelector('#dealer-box').querySelectorAll('img');
			//console.log(yourImages);
			for(i=0;i<yourImages.length;i++){
				yourImages[i].remove();
			}

			for(i=0;i<dealerImages.length;i++){
				dealerImages[i].remove();
			}

			YOU['score'] = 0;
			DEALER['score'] = 0;

		// Resetting score to 0
			document.querySelector('#your-blackjack-result').textContent = 0;
			document.querySelector('#dealer-blackjack-result').textContent = 0;
		// Resetting color to white
			document.querySelector('#your-blackjack-result').style.color='#fff';
			document.querySelector('#dealer-blackjack-result').style.color='#fff';

			// resetting let's plays text as it is
			document.querySelector('#blackjack-result').textContent = "Let's Play";
			document.querySelector('#blackjack-result').style.color='black';

			blackjackgame['turnOver'] = true;

	}

}

function updateScore(cards,activeplayer){
	if(cards === 'A'){
		// if adding 11 , keeps score below 21 than add 11 otherwise add 1
		if(activeplayer['score'] + blackjackgame['cardsMap'][cards][1] <= 21){
			activeplayer['score'] += blackjackgame['cardsMap'][cards][1];
		}else{
			activeplayer['score'] += blackjackgame['cardsMap'][cards][0];
		}
	}else{

		activeplayer['score'] += blackjackgame['cardsMap'][cards];

	}	
}

function showScore(activeplayer){
	if(activeplayer['score'] > 21){
		document.querySelector(activeplayer['scoreSpan']).textContent = "BUST!";
		document.querySelector(activeplayer['scoreSpan']).style.color='red';
	}else{
		document.querySelector(activeplayer['scoreSpan']).textContent=activeplayer['score'];
	}
}

function sleep(ms){
	return new Promise(resolve => setTimeout(resolve,ms));
}

async function dealerLogic(){
	blackjackgame['isStand'] = true;

	while(DEALER['score'] <16 && blackjackgame['isStand'] === true){
		let card = randomCard();
		showCard(card,DEALER);
		updateScore(card,DEALER);
		showScore(DEALER);	
		await sleep(1000);
	}
	

		blackjackgame['turnOver'] = true;
		let winner = computeWinner();
		showResult(winner);
		//console.log(blackjackgame['turnOver']);
	
}

// compute winner and return who just won
//update,wind,losses of players
function computeWinner(){
	let winner;


	if(YOU['score'] <=21 ){
		// condition : higher score than dealer or when dealer busts but youre 21 or under
		if(YOU['score'] > DEALER['score'] || (DEALER['score'] >21 )){
			blackjackgame['wins']++;

			winner = YOU;
		}else if(YOU['score'] < DEALER['score']){
			blackjackgame['losses']++;
			winner = DEALER;
		}else if(YOU['score'] === DEALER['score']){
			blackjackgame['draws']++;
			//return winner;
		}
	}
	// condition when user bust! but dealer doesn't
	else if(YOU['score'] >21 && DEALER['score'] <=21){
		blackjackgame['losses']++;
		winner = DEALER;
	}
	// condition when you and the dealer busts


	else if(YOU['score'] > 21 && DEALER['score'] > 21){
		blackjackgame['draws']++;
	}
	console.log(blackjackgame);
	return winner;
}


function showResult(winner){
	let message,messageColor;

	if(blackjackgame['turnOver'] === true){

		if(winner === YOU){
			document.querySelector('#wins').textContent = blackjackgame['wins'];
			message = 'You Won!';
			messageColor = 'green';
			winSound.play();
		}else if(winner === DEALER){
			document.querySelector('#draws').textContent = blackjackgame['draws'];
			message = 'You Lost!';
			messageColor = 'red';
			lossSound.play();
		}else{
			document.querySelector('#losses').textContent = blackjackgame['losses'];
			message = 'We Derw!';
			messageColor = 'black';
		}


	document.getElementById('blackjack-result').textContent = message;
	document.getElementById('blackjack-result').style.color = messageColor;

	}

}


