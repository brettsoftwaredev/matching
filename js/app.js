const deck = document.querySelector(".deck");
const refresh = document.querySelector(".restart");

const cards = document.getElementsByClassName("card");
let cardArr = Array.from(cards);
let openCards = [];
let matchedCards = [];

const moveCounter = document.querySelector(".moves");
let totalMoves = moveCounter.innerHTML.valueOf(moveCounter);

const stars = document.querySelector(".stars");
let starArr = Array.from(stars);

resetFunc();

deck.addEventListener("click", function(e){
    if(openCards.length < 2 && e.target.classList.contains("card") && !e.target.classList.contains("match") && !e.target.classList.contains("open")){   
        flip(e);
        openCards.push(e.target);
        //This flips a card on each click until 2 cards are clicked and sends each card into the openCards array
        if(openCards.length == 2){
            if(openCards[0].innerHTML === openCards[1].innerHTML){
                matched();
                matchedCards.push(openCards[0]);
                matchedCards.push(openCards[1]);
                moveMonitor();
                starPower();
                winFunc();
                //Checks to see if the cards match and then moves them into the matched cards array, then it adds a move and checks to see 
                //if it should remove a star, then checks to see if you won. 
            } else {
                window.setTimeout(failedMatch, 1000);
                moveMonitor();
                starPower();
                //the set timeout lets the player see the cards for .7 seconds then runs the failed match code witch resest the classes
                //Then it adds a move and checks to see if it should remove a star
            }  
        }
    }     
})

refresh.addEventListener("click", function(){
    resetFunc();
})

function winFunc(){
    if(matchedCards.length === 16){
        swal({
            type: "success",
            title: ("You Win!"),
            customClass: "modalClass",
        })  
    }
}

function starPower(){
    if(totalMoves >= 23){
        document.querySelector("#star4").style.display = "none";
    } else if(totalMoves >= 20) {
        document.querySelector("#star3").style.display = "none";
    } else if(totalMoves >= 17) {
        document.querySelector("#star2").style.display = "none";
    } else if(totalMoves >= 14) {
        document.querySelector("#star1").style.display = "none";
    }
}

function moveMonitor(){
    totalMoves++;
    moveCounter.innerHTML = totalMoves;
}

function flip(e){
    if(e.target.classList.contains("card")){
        e.target.classList.add("show", "open");
    }
}

function matched(){
    openCards[0].classList.add("match");
    openCards[1].classList.add("match");
    openCards[0].classList.remove("open", "show");
    openCards[1].classList.remove("open", "show");
    openCards = [];
}

function failedMatch(){
    for(x = 0; x < openCards.length; x++){
        for(y = 0; y < openCards.length; y++);
        openCards[x].classList.remove("open", "show");
    }
    openCards = [];
}

function resetFunc(){
     for(x = 0; x < cardArr.length; x++){
        for(y = 0; y < cardArr.length; y++);
        cardArr[x].classList.remove("open", "show", "match");
    }
    //removes all the classess except the "card class"
    shuffle();
    //shuffles the cards
    deck.innerHTML = "";
    //deletes the contents of the deck
    for (y = 0; y <cardArr.length; y++){
        deck.insertAdjacentElement("afterbegin", cardArr[y]);
    }
    //replaces the contents of the deck with the new shuffled cards
    moveCounter.innerHTML = 0;
    totalMoves = 0;
    matchedCards = [];
    //resets the moves on the page, resets the variaable the stores the moves, and empties the matchedCards array.
    document.querySelector("#star1").style.display = "block";
    document.querySelector("#star2").style.display = "block";
    document.querySelector("#star3").style.display = "block";
    document.querySelector("#star4").style.display = "block";
    //resets all the stars
}

function shuffle(){
    let currentIndex = cardArr.length;
    let temporaryValue;
    let randomIndex;

    while (currentIndex !== 0){
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = cardArr[currentIndex];
        cardArr[currentIndex] = cardArr[randomIndex];
        cardArr[randomIndex] = temporaryValue;
    }
    return cardArr;
}


