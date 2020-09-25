//javascript object
let blackjackGame = {
    'you':{'scoreSpan':'#your-blackjack-result',
            'div':'#your-box',
            'score':0},
    'dealer':{'scoreSpan':'#ydealer-blackjack-result',
                'div':'#dealer-box',
                'score':0},
    'cards':['2','3','4','5','6','7','8','9','10','K','J','Q','A'],
    'cards-map':{'2':2, '3':3, '4':4, '5':5, '6':6,'7':7,'8':8,'9':9,'10':10,'K':10,'J':10,'Q':10,'A':[1,11]},
}

const YOU = blackjackGame['you'];
const DEALER = blackjackGame['dealer'];
const hitSound = new Audio('../sounds/swish.m4a')

//if 'hit' button is clicked, run the blackjackHit function
document.querySelector('#blackjack-hit-button').addEventListener('click',blackjackHit);
//if 'deal' button is clicked, run the blackjackHit function
document.querySelector('#blackjack-deal-button').addEventListener('click',blackjackDeal);

function blackjackHit(){
    let card = randomCard();
    showCard(card,YOU);
    //showCard(DEALER);
    updateScore(card,YOU);
    console.log(YOU['score']);
    showScore(YOU);
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
