let field = document.querySelector('#field');
let points = document.querySelector("#points");
let time = document.querySelector('#time');
let start = document.querySelector('#start');
let keysArr = [6,7,8,3,4,5,0,1,2];
let seconds = null;
let timer;
let moleImg = '<img src="img/mole.png" alt="mole">';
let interval;
let moleOnBoard = false;

document.addEventListener('keydown', function(e){
	let areaId = getAreasCollection()[keysArr[e.key - 1]];
	caughtMole.call(areaId);
})

start.addEventListener('click', createMole);

function createMole(){
	points.textContent = 0;

	if(time.value < 1){
		alert('add more time!');
		return;
	}

	createFieldAreas();
	startTimer();
	startSpawningMole();

	start.removeEventListener('click', createMole);
}

function isgameOver(){
	if(seconds == 0){
		stopSpawningMole();
		clearInterval(timer);
		time.removeAttribute('disabled');
		alert('Game over! Your score is ' + points.textContent);
		field.innerHTML = '';
		start.addEventListener('click', createMole);
	}
}

function startTimer(){
	seconds = time.value;
	time.setAttribute('disabled', '');
	timer = setInterval(function(){
		time.value = --seconds;
		isgameOver();
	}, 1000)
}

function createFieldAreas(){
	for(let i = 0; i < 9; i++){
		let area = document.createElement('div');
		area.classList.add('field-area');
		area.setAttribute('data-id', i);
		field.appendChild(area);
	}
	addListenerToAreas();
}

function addListenerToAreas(){
	let areas = document.querySelectorAll('.field-area');
	for(let i = 0; i < areas.length;i++){
		areas[i].addEventListener('click', caughtMole)
	}
}

function increasePoints(){
	points.textContent = +points.textContent + 1;
	isgameOver();
}

function caughtMole(){
	if(this.children[0]){
		increasePoints();
		this.removeEventListener('click', caughtMole);
	}
}

function stopSpawningMole(){
	clearInterval(interval);
}

function startSpawningMole(){
	interval = setInterval(function(){
		if(isMole()){
			let index = getRandomMolePosition();
			let areas = getAreasCollection();
			spawnMole(areas[index]);
			setTimeout(removeMole, 500)
		}
	}, 800)
}

function isMole(){
	return moleOnBoard == true ? moleOnBoard = false: moleOnBoard = true;
}

function getRandomMolePosition(){
	return Math.floor(Math.random() * 9);
}

function getAreasCollection(){
	return document.querySelectorAll('.field-area');
}

function spawnMole(area){
	area.innerHTML = moleImg;
}

function getAreaWithImg(){
	let img = document.querySelector('.field-area img');
	return img.parentElement;
}
	
function removeMole(){
	getAreaWithImg().innerHTML = '';
}

//! 2048
document.addEventListener('DOMContentLoaded', () => {
	const gridDisplay = document.querySelector('.grid');
	const scoreDisplay = document.getElementById('score-2048');
	const resultDisplay = document.getElementById('result');
	let startTwenty = document.getElementById('start-twenty');
	const width = 4;
	let squares = [];
	let score = 0;

	startTwenty.addEventListener('click', function(e){
		e.preventDefault();

		createTwenty();
	})

	function createTwenty() {
		gridDisplay.innerHTML = '';
		for (let i = 0; i < width * width; i++) {
			let square = document.createElement('div');
			square.innerHTML = 0;
			gridDisplay.appendChild(square);
			squares.push(square);
			changeColors();
		}
		generate();
		generate();
	}

	createTwenty();

	function generate() {
		let randomNumber = Math.floor(Math.random() * squares.length);
		if (squares[randomNumber].innerHTML == 0) {
			squares[randomNumber].innerHTML = 2;
			checkForGameOver();
		} else generate();
	}

	function moveRight() {
		for (let i = 0; i < width * width; i++) {
			if (i % 4 === 0) {
				let totalOne = squares[i].innerHTML
				let totalTwo = squares[i + 1].innerHTML
				let totalThree = squares[i + 2].innerHTML
				let totalFour = squares[i + 3].innerHTML
				let row = [parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(totalFour)];

				let filteredRow = row.filter(num => num);
				let missing = 4 - filteredRow.length;
				let zeros = Array(missing).fill(0);
				let newRow = zeros.concat(filteredRow);

				squares[i].innerHTML = newRow[0];
				squares[i + 1].innerHTML = newRow[1];
				squares[i + 2].innerHTML = newRow[2];
				squares[i + 3].innerHTML = newRow[3];
			}
		}
		changeColors();
	}

	function moveLeft() {
		for (let i = 0; i < width * width; i++) {
			if (i % 4 === 0) {
				let totalOne = squares[i].innerHTML
				let totalTwo = squares[i + 1].innerHTML
				let totalThree = squares[i + 2].innerHTML
				let totalFour = squares[i + 3].innerHTML
				let row = [parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(totalFour)];

				let filteredRow = row.filter(num => num);
				let missing = 4 - filteredRow.length;
				let zeros = Array(missing).fill(0);
				let newRow = filteredRow.concat(zeros);

				squares[i].innerHTML = newRow[0];
				squares[i + 1].innerHTML = newRow[1];
				squares[i + 2].innerHTML = newRow[2];
				squares[i + 3].innerHTML = newRow[3];
			}
		}
		changeColors();
	}

	function moveDown() {
		for (let i = 0; i < 4; i++) {
			let totalOne = squares[i].innerHTML;
			let totalTwo = squares[i + width].innerHTML;
			let totalThree = squares[i + (width * 2)].innerHTML;
			let totalFour = squares[i + (width * 3)].innerHTML;
			let column = [parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(totalFour)];

			let filteredColumn = column.filter(num => num);
			let missing = 4 - filteredColumn.length;
			let zeros = Array(missing).fill(0);
			let newColumn = zeros.concat(filteredColumn);

			squares[i].innerHTML = newColumn[0];
			squares[i + width].innerHTML = newColumn[1];
			squares[i + (width * 2)].innerHTML = newColumn[2];
			squares[i + (width * 3)].innerHTML = newColumn[3];
		}
		changeColors();
	}

	function moveUp() {
		for (let i = 0; i < 4; i++) {
			let totalOne = squares[i].innerHTML;
			let totalTwo = squares[i + width].innerHTML;
			let totalThree = squares[i + (width * 2)].innerHTML;
			let totalFour = squares[i + (width * 3)].innerHTML;
			let column = [parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(totalFour)];

			let filteredColumn = column.filter(num => num);
			let missing = 4 - filteredColumn.length;
			let zeros = Array(missing).fill(0);
			let newColumn = filteredColumn.concat(zeros);

			squares[i].innerHTML = newColumn[0];
			squares[i + width].innerHTML = newColumn[1];
			squares[i + (width * 2)].innerHTML = newColumn[2];
			squares[i + (width * 3)].innerHTML = newColumn[3];
		}
		changeColors();
	}

	function combineRow() {
		for (let i = 0; i < 15; i++) {
			if (squares[i].innerHTML === squares[i + 1].innerHTML) {
				let combinedTotal = parseInt(squares[i].innerHTML) + parseInt(squares[i + 1].innerHTML)
				squares[i].innerHTML = combinedTotal;
				squares[i + 1].innerHTML = 0;
				score += combinedTotal;
				scoreDisplay.innerHTML = score;
			}
		}
		checkForWin();
	}

	function combineColumn() {
		for (let i = 0; i < 12; i++) {
			if (squares[i].innerHTML === squares[i + width].innerHTML) {
				let combinedTotal = parseInt(squares[i].innerHTML) + parseInt(squares[i + width].innerHTML)
				squares[i].innerHTML = combinedTotal;
				squares[i + width].innerHTML = 0;
				score += combinedTotal;
				scoreDisplay.innerHTML = score;
			}
		}
		checkForWin();
	}

	function control(e) {
		if (e.keyCode === 39) {
			keyRight();
		} else if (e.keyCode === 37) {
			keyLeft();
		} else if (e.keyCode === 38) {
			keyUp();
		} else if (e.keyCode === 40) {
			keyDown();
		}
	}
	document.addEventListener('keyup', control);

	function keyRight() {
		moveRight();
		combineRow();
		moveRight();
		generate(); changeColors();
	}
	function keyLeft() {
		moveLeft();
		combineRow();
		moveLeft();
		generate(); changeColors();
	}
	function keyDown() {
		moveDown();
		combineColumn();
		moveDown();
		generate(); changeColors();
	}
	function keyUp() {
		moveUp();
		combineColumn();
		moveUp();
		generate(); changeColors();
	}

	function checkForWin() {
		for (let i = 0; i < squares.length; i++) {
			if (squares[i].innerHTML == 2048) {
				resultDisplay.innerHTML = 'You Win!';
				document.removeEventListener('keyup', control);
			}
		}
	}

	function checkForGameOver() {
		let zeros = 0;
		for (let i = 0; i < squares.length; i++) {
			if (squares[i].innerHTML == 0) {
				zeros++;
			}
		}
		if (zeros === 0) {
			resultDisplay.innerHTML = 'You Lose!';
			document.removeEventListener('keyup', control);
		}
	}

	function changeColors() {
		for (let i = 0; i < squares.length; i++) {
			squares[i].className = '';
			if (squares[i].innerHTML == 0) {
				squares[i].classList.add('zero');
			}
			if (squares[i].innerHTML == 2) {
				squares[i].classList.add('two');
			}
			if (squares[i].innerHTML == 4) {
				squares[i].classList.add('four');
			}
			if (squares[i].innerHTML == 8) {
				squares[i].classList.add('eight');
			}
			if (squares[i].innerHTML == 16) {
				squares[i].classList.add('sixteen');
			}
			if (squares[i].innerHTML == 32) {
				squares[i].classList.add('thirty-two');
			}
			if (squares[i].innerHTML == 64) {
				squares[i].classList.add('sixty-four');
			}
			if (squares[i].innerHTML == 128) {
				squares[i].classList.add('one-hundred');
			}
			if (squares[i].innerHTML == 256) {
				squares[i].classList.add('two-hundred');
			}
			if (squares[i].innerHTML == 512) {
				squares[i].classList.add('five-hundred');
			}
			if (squares[i].innerHTML == 1024) {
				squares[i].classList.add('one-thousand');
			}
			if (squares[i].innerHTML == 2048) {
				squares[i].classList.add('two-thousand');
			}
		}
	}
})

//! memory

const cardArray = [
	{
		name: 'batman',
		img: 'img/batman.png'
	},
	{
		name: 'batman',
		img: 'img/batman.png'
	},
	{
		name: 'green',
		img: 'img/green.png'
	},
	{
		name: 'green',
		img: 'img/green.png'
	},
	{
		name: 'minion',
		img: 'img/minion.png'
	},
	{
		name: 'minion',
		img: 'img/minion.png'
	},
	{
		name: 'pacman',
		img: 'img/pacman.png'
	},
	{
		name: 'pacman',
		img: 'img/pacman.png'
	},
	{
		name: 'smile',
		img: 'img/smile.png'
	},
	{
		name: 'smile',
		img: 'img/smile.png'
	},
	{
		name: 'red',
		img: 'img/red.png'
	},
	{
		name: 'red',
		img: 'img/red.png'
	},
]

const grid = document.querySelector('.grid-memory');
const resultDisplay = document.querySelector('#result-memory');
let mess = document.getElementById('mess');
let startMemory = document.getElementById('start-memory');
var cardsChosen = [];
var cardsChosenId = [];
var cardsWon = [];

startMemory.addEventListener('click', function(e){
	e.preventDefault();

	createMemory();
})

function createMemory() {
	grid.innerHTML = '';
	cardsChosen = [];
	cardsChosenId = [];
	cardsWon = [];
	resultDisplay.textContent = cardsWon.length;
	cardArray.sort(() => 0.5 - Math.random());
	mess.textContent = 'Start by just clicking on these rainbow cards!';
	
	for (let i = 0; i < cardArray.length; i++) {
		var card = document.createElement('img');
		card.setAttribute('src', 'img/interpolate_bilinear.jpg');
		card.setAttribute('data-id', i);
		card.addEventListener('click', flipCard);
		grid.appendChild(card);
	}
}


function checkForMatch() {
	var cards = document.querySelectorAll('img');
	const optionOneId = cardsChosenId[0];
	const optionTwoId = cardsChosenId[1];
	if (cardsChosen[0] === cardsChosen[1]) {
		mess.textContent = 'You found a match!';
		cards[optionOneId].style.visibility = 'hidden';
		cards[optionTwoId].style.visibility = 'hidden';
		cardsWon.push(cardsChosen);
	} else {
		cards[optionOneId].setAttribute('src', 'img/interpolate_bilinear.jpg');
		cards[optionTwoId].setAttribute('src', 'img/interpolate_bilinear.jpg');
		mess.textContent = 'It\'s not that!';
	}
	cardsChosen = [];
	cardsChosenId = [];
	resultDisplay.textContent = cardsWon.length;
	if (cardsWon.length === cardArray.length / 2) {
		mess.textContent = 'Congratulations!';
	}
	resetImages();
}

function resetImages() {
	var imgs = document.querySelectorAll('img');
	for (let i = 0; i < imgs.length; i++) {
		let attr = imgs[i].getAttribute('src');
		console.log(attr);
		if (attr == 'img/imgonline-com-ua-Resize-5rVKfa7ZVr5gS2.jpg') {
			continue;
		}
		imgs[i].setAttribute('src', 'img/interpolate_bilinear.jpg');
	}
}

function flipCard() {
	var cardId = this.getAttribute('data-id');
	cardsChosen.push(cardArray[cardId].name);
	cardsChosenId.push(cardId);
	this.setAttribute('src', cardArray[cardId].img);
	if (cardsChosen.length === 2) {
		setTimeout(checkForMatch, 500)
	}
}

createMemory();