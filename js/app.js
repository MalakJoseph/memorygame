/*=================================*/
// Setting up the DOM
/*=================================*/

let card = document.querySelectorAll(".card");
let cardsHolder = [...card];
const deck = document.querySelector(".deck");
let moves = document.querySelector(".moves");
let count = 0;
const time = document.querySelector(".timer");
let seconds = 00; minutes = 00; hours = 0;
const stars = document.querySelectorAll(".fa-star");
let openedCards = deck.querySelectorAll(".open");
const matchedCards = document.getElementsByClassName("match");
let startNow;
const modal = document.getElementById("modal");
const modalTitle = document.querySelector(".modal-title");
const superheroFigure = document.querySelector(".superheroFigure");

/*=================================*/
// Shuffling cards
/*=================================*/

shuffle(cardsHolder);
cardsHolder.forEach(function(elem) {
    deck.append(elem);
});

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}


/*=================================*/
// Preparing functions
/*=================================*/

function clickedCard() {
    for (let i = 0; i < cardsHolder.length; i++) {
        cardsHolder[i].addEventListener("click", function() {
            cardsHolder[i].classList.add("open", "show");
            openedCards = deck.querySelectorAll(".open");
            for (let i = 0; i < openedCards.length; i++) {
				if (openedCards.length > 1) {
					startMoves();
	            	openedCards[i].classList.remove("open");
		            if (openedCards[0].type === openedCards[1].type) {
		            	match();
	            	} else {
	            		unmatch();
	            	}
	            }
        	}
        });
        cardsHolder[i].addEventListener("click", figureWindow);
    }
}

// Incase of matching
function match() {
	openedCards[0].classList.add("match", "freeze");
	openedCards[1].classList.add("match", "freeze");
}

// Incase of not matching
function unmatch() {
	openedCards[0].classList.add("unmatch");
	openedCards[1].classList.add("unmatch");
	freeze();
	setTimeout(function() {
		openedCards[0].classList.remove("show", "unmatch");
		openedCards[1].classList.remove("show", "unmatch");
		heat();
	}, 700);
}

// Freezing all cards for a while
function freeze() {
    cardsHolder.forEach(function(card) {
    	card.classList.add("freeze");
    });
}

// Heating all cards but matched cards
function heat() {
	cardsHolder.forEach(function(card) {
		card.classList.remove("freeze");
		for (let i = 0; i < matchedCards.length; i++) {
			matchedCards[i].classList.add("freeze");
		}
	});
}

// Setting moves to be incremented every 2 selected cards
function startMoves() {
	count = count + 1/2;
	moves.innerHTML = count;
	startTimer();
	// Adjusting stars depending on moves
	if (moves.innerHTML > 10 && moves.innerHTML <= 14) {
		stars[2].style.cssText = "color: #7a060f";
		modalTitle.innerHTML = "Intelligent!<br>It can be better!!";
	} else if (moves.innerHTML > 14) {
		stars[1].style.cssText = "color: #7a060f";
		modalTitle.innerHTML = "Great!";
	}
}

// Starting timer right after hitting the first move
function startTimer() {
	if (moves.innerHTML == 1) {
		startNow = setInterval(function () {
			time.innerHTML = minutes + " Min(s) " + seconds + " Sec(s)";
			seconds++;
			if (seconds == 60) {
				seconds = 0;
				minutes++;
			} else if (minutes == 60) {
				minutes = 0;
				hours++;
			}
		}, 1000);
	}
}

// Showing hero's figure
function figureWindow() {
	if (matchedCards.length == 16) {
		// Stopping time
		clearInterval(startNow);
		// Displaying the figure
		superheroFigure.classList.add("show", "figureAnimation");
		setTimeout(modalWindow, 2000);
	}
}

// Popping up a modal that cheers you
function modalWindow() {
	if (matchedCards.length == 16) {
		// Displaying the modal
		modal.classList.add("show");
		// Declare some variables
		let finalTime = time.innerHTML;
        let starRating = document.querySelector(".stars").innerHTML;
        moves = moves.innerHTML;
        // Change footer color for accessibility
        document.getElementById("footer").style.cssText = "color: white";
        // Displaying move, rating and time on modal
        document.getElementById("finalMove").innerHTML = moves;
        document.getElementById("starRating").innerHTML = starRating;
        document.getElementById("totalTime").innerHTML = finalTime;
	}
}

// Refreshing the page
function playAgain() {
	window.location.reload();
}

/*---------------------------------------------*/
// Activating the fun
/*---------------------------------------------*/
clickedCard();
figureWindow();
