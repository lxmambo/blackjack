//javascript object
let blackjackGame = {
    'you':{'scoreSpan':'#your-blackjack-result',
            'div':'#your-box',
            'score':0},
    'dealer':{'scoreSpan':'#dealer-blackjack-result',
                'div':'#dealer-box',
                'score':0},
    'cards':['2','3','4','5','6','7','8','9','10','K','J','Q','A'],
    'cards-map':{'2':2, '3':3, '4':4, '5':5, '6':6,'7':7,'8':8,'9':9,'10':10,'K':10,'J':10,'Q':10,'A':[1,11]},
    'wins': 0,
    'losses': 0,
    'draws': 0,
    'isStand': false, //it keeps track if stand mode has been activated
    'turnsOver': false, //to know when we can hit 'deal'
}

const YOU = blackjackGame['you'];
const DEALER = blackjackGame['dealer'];
const hitSound = new Audio('../sounds/swish.m4a');
const winSound = new Audio('../sounds/cash.mp3');
const lossSound = new Audio('../sounds/aww.mp3');

//if 'hit' button is clicked, run the blackjackHit function
document.querySelector('#blackjack-hit-button').addEventListener('click',blackjackHit);
//if 'stand' button is clicked, run the dealer logic function
document.querySelector('#blackjack-stand-button').addEventListener('click',dealerLogic);
//if 'deal' button is clicked, run the deal function
document.querySelector('#blackjack-deal-button').addEventListener('click',blackjackDeal);

function blackjackHit(){
    //hit button should only work if we didn't use 'stand' yet
    if(blackjackGame['isStand'] === false){
        let card = randomCard();
        showCard(card,YOU);
        updateScore(card,YOU);
        showScore(YOU);
    }
}

function randomCard(){
    let randomIndex = Math.floor(Math.random()*13);
    return blackjackGame['cards'][randomIndex];
}

function showCard(card,activePlayer){
    if(activePlayer['score'] <= 21){
        let cardImage = document.createElement('img');
        //we are going to use string templating instead of string
        //concatenation
        cardImage.src = `../img/${card}.png`;
        document.querySelector(activePlayer['div']).appendChild(cardImage);
        hitSound.play();
    }
}

function blackjackDeal(){
    if(blackjackGame['turnsOver'] === true){
        //showResult(computeWinner());
        blackjackGame['isStand'] = false;
        //this way we get a list of all the images in 
        //our div with id your-box, an array of images
        let yourImages = document.querySelector('#your-box').querySelectorAll('img');
        let dealerImages = document.querySelector('#dealer-box').querySelectorAll('img');
        //console.log(yourImages);
        //console.log(yourImages.length);
        for(let i = 0; i < yourImages.length; i++){
            yourImages[i].remove();
        }
        for(let j = 0; j < dealerImages.length; j++){
            dealerImages[j].remove();
        }
        YOU['score'] = 0;
        DEALER['score'] = 0;
        document.querySelector('#your-blackjack-result').textContent = 0;
        document.querySelector('#your-blackjack-result').style.color = 'white';
        document.querySelector('#dealer-blackjack-result').textContent = 0;
        document.querySelector('#dealer-blackjack-result').style.color = 'white';
        document.querySelector('#blackjack-result').textContent = "Let's Play";
        document.querySelector('#blackjack-result').style.color = 'black';

        blackjackGame['turnsOver'] = true;
    }
}

function updateScore(card, activePlayer){
    if(card === 'A'){
        //if adding 11 keeps me below 21, add 11. Otherwise, add 1
        if(activePlayer['score'] + blackjackGame['cards-map'][card][1] <=21){
            activePlayer['score'] += blackjackGame['cards-map'][card][1];
        } else {
            activePlayer['score'] += blackjackGame['cards-map'][card][0];
        }
    } else {
        activePlayer['score'] += blackjackGame['cards-map'][card];
    }
}

function showScore(activePlayer){
    if(activePlayer['score'] > 21){
        document.querySelector(activePlayer['scoreSpan']).textContent = 'BUST!';
        document.querySelector(activePlayer['scoreSpan']).style.color = 'red';
    } else {
        document.querySelector(activePlayer['scoreSpan']).textContent = activePlayer['score'];
    }
}

function sleep(ms){
    return new Promise(resolve => setTimeout(resolve,ms));
    //it returns a promise object
}

async function dealerLogic(){
    blackjackGame['isStand'] = true;
    
    while(DEALER['score'] < 16 && blackjackGame['isStand'] === true){
        let card = randomCard(); //generates a random card
        showCard(card,DEALER);
        updateScore(card,DEALER);
        showScore(DEALER);
        await sleep(1000);
    }
    
    //executes when DEALER['score'] >= 15
    blackjackGame['turnsOver'] = true;
    let winner = computeWinner();
    showResult(winner);
}

//compute winner and return who just won
//update the wins, draws, and losses <- main function
function computeWinner(){
    let winner;
    if(YOU['score'] <= 21){
        //condition: higher score than dealer
        //or dealer busts and you are under 21
        if(YOU['score'] > DEALER['score'] || (DEALER['score'] > 21)){
            blackjackGame['wins']++;
            winner = YOU;
        } else if (YOU['score'] < DEALER['score']){
            blackjackGame['losses']++;
            winner = DEALER;
        } else if (YOU['score'] === DEALER['score']) {
            blackjackGame['draws']++;
            console.log('you drew!');
        }
    //condition when user busts but dealer don't
    } else if (YOU['score'] > 21 && DEALER['score'] <=21){
        console.log('you lost!');
        blackjackGame['losses']++;
        winner = DEALER;
    //condition when YOU and DEALER busts
    } else if (YOU['score'] > 21 && DEALER['score'] > 21){
        blackjackGame['draws']++;
        console.log('you drew!');
    }
    console.log('winner is', winner);
    return winner;
}

function showResult(winner){
    let message, messageColor;

    if(blackjackGame['turnsOver'] === true){

        if(winner == YOU){
            document.querySelector('#wins').textContent = blackjackGame['wins'];
            message = 'you won!';
            messageColor = 'green';
            winSound.play();

        } else if (winner == DEALER) {
            document.querySelector('#losses').textContent = blackjackGame['losses'];
            message = 'you lost!';
            messageColor = 'red';
            lossSound.play();

        } else {
            document.querySelector('#draws').textContent = blackjackGame['draws'];
            message = 'you drew';
            messageColor = 'black';
    }
    document.querySelector('#blackjack-result').textContent = message;
    document.querySelector('#blackjack-result').style.color = messageColor;
    }
}