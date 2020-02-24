/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls 2 dices as many times as he whishes. The result of both dices will get added to his ROUND score
- BUT, if any of the player's dices rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- If a player dices come to a total of 6 twice in a row, the player will loose his GLOBAL score and it will be the next playe's turn
- The default target is 69, but can be changed at anytime during the game at the bottom of the screen


*/
var scores, roundScore, activePlayer, gamePlaying, scoresPlayer, maxScore;
maxScore = document.getElementById("maxScore").value;


document.querySelector('.submit').addEventListener('click', function() {
    maxScore = document.getElementById("maxScore").value;
    console.log(maxScore);
})
init();



document.querySelector('.btn-roll').addEventListener('click', function(){
    if (roundScore + scores[activePlayer] >= maxScore) { setWinner()}
    if (gamePlaying) {
        // 1. Random number 
    var dice1 = Math.floor(Math.random() * 6) + 1;
    var dice2 = Math.floor(Math.random() * 6) + 1;

    // 2. Display the result
    var diceDOM1 = document.querySelector('.dice1');
    diceDOM1.style.display = 'block';
    diceDOM1.src = 'dice-' + dice1 + '.png';

    var diceDOM2 = document.querySelector('.dice2');
    diceDOM2.style.display = 'block';
    diceDOM2.src = 'dice-' + dice2 + '.png';


    // 3. Update the round score IF the rolled number was NOT a 1
    if (dice1 !== 1 && dice2 !== 1) {
        //add score
        roundScore = roundScore + dice1 + dice2;
        document.querySelector('#current-' + activePlayer).textContent = roundScore;
        scoresPlayer.push(dice1 + dice2)
        console.log(scoresPlayer)
        console.log(scores[activePlayer])
        if (scoresPlayer[scoresPlayer.length-1] === 6 && scoresPlayer[scoresPlayer.length-2] === 6) {
            scores[activePlayer] = 0
            document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
            console.log(scores[activePlayer])
            nextPlayer();
        }
       
    } else if (roundScore + scores[activePlayer] >= maxScore) {
        setWinner()
    } else {
        scoresPlayer = []
        //next player
        nextPlayer();
    }
   }
    

});

document.querySelector('.btn-hold').addEventListener('click', function() {
    if (gamePlaying) {
        // Add CURRENT score to GLOBAL score
    scores[activePlayer] += roundScore;

    //Udate the UI
    document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
    
    // Cheick if player won the game
    if (scores[activePlayer] >= maxScore) {
        setWinner()
    } else {nextPlayer();}  //next player
    }
    
  
    

});

function nextPlayer() {
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;
    
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');
    
    //document.querySelector('.player-0-panel').classList.remove('active');
    //document.querySelector('.player-1-panel').classList.add('active');

    document.querySelector('.dice1').style.display = 'none';
    document.querySelector('.dice2').style.display = 'none';
}

function setWinner() {
    document.querySelector ('#name-' + activePlayer).textContent = 'Winner!';
        document.querySelector('.dice1').style.display = 'none';
        document.querySelector('.dice2').style.display = 'none';
        document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
        document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
        gamePlaying = false;
        console.log(gamePlaying)
}

document.querySelector('.btn-new').addEventListener('click', init);


function init() {
    
    scores = [0,0];
    roundScore = 0;
    activePlayer = 0;
    gamePlaying = true;
    scoresPlayer = [];
    document.querySelector('.dice1').style.display = 'none';
    document.querySelector('.dice2').style.display = 'none';

    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    document.querySelector('.player-0-panel').classList.remove('winner')
    document.querySelector('.player-1-panel').classList.remove('winner')
    document.querySelector('.player-0-panel').classList.remove('active')
    document.querySelector('.player-1-panel').classList.remove('active')
    document.querySelector('.player-0-panel').classList.add('active')
}

// Setter (sets the value into HTML)
//document.querySelector('#current-' + activePlayer).textContent = dice;
//document.querySelector('#current-' + activePlayer).innerHTML = '<em>' + dice + '</em>';

// Getter (gets the value from HTML)
//var x = document.querySelector('#score-0').textContent;
//console.log(x)



































