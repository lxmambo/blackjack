//javascript object
let blackjackGame = {
    'you':{'scoreSpan':'#your-blackjack-result',
            'div':'#your-box',
            'score':0},
    'dealer':{'scoreSpan':'#ydealer-blackjack-result',
                'div':'#dealer-box',
                'score':0},
}

const YOU = blackjackGame['you'];
const DEALER = blackjackGame['dealer'];
const hitSound = new Audio('../sounds/swish.m4a')

//if 'hit' button is clicked, run the blackjackHit function
document.querySelector('#blackjack-hit-button').addEventListener('click',blackjackHit);
//if 'deal' button is clicked, run the blackjackHit function
document.querySelector('#blackjack-deal-button').addEventListener('click',blackjackDeal);

function blackjackHit(){
   showCard(YOU);
}

function showCard(activePlayer){
    let cardImage = document.createElement('img');
    cardImage.src = '../img/Q.png';
    document.querySelector(activePlayer['div']).appendChild(cardImage);
    hitSound.play();
}

function blackjackDeal(){
    //this way we get a list of all the images in 
    //our div with id your-box, an array of images
    let yourImages = document.querySelector('#your-box').querySelectorAll('img');
    //console.log(yourImages);
    //console.log(yourImages.length);
    for(let j = 0; j < yourImages.length; j++){
        yourImages[j].remove();
    }
}

(5:54:33)
