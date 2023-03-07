import { Card } from "./card.js";
import { Player } from "./player.js";
import { NPC } from "./npc.js";
import { Dealer } from "./dealer.js";
import { compareHands, getBlackjackHandTotal } from "./util.js";

const startingDialogs = document.querySelectorAll('#starting-dialogs dialog')
const startingDialogBtns = document.querySelectorAll('#starting-dialogs dialog button')
const startingDialogInput = []


// TODO: figure out how to animate backdrop of first dialog coming in so entrance can be delayed - maybe pan downward at start?
// setTimeout(() =>
// {
console.log('showing modal')
// reset input values so that they aren't maintained between visits/refreshes
let firstDialogInput = document.querySelector('dialog input')
firstDialogInput.value = ''
let secondDialogInputs = document.querySelectorAll('#god-prompt input')
secondDialogInputs.forEach(input =>
{
    input.checked = false
})

// show first dialog
startingDialogs[0].showModal()
startingDialogs[0].classList.remove('opacity-0')
// }, 500)

// TODO: add validation and/or input sanitation to dialog buttons
// loop to add progression to starting menus - last one starts game
// assumes menus only have a single text input or a single group of radio buttons for a single value
for (let i = 0; i < startingDialogBtns.length; ++i)
{
    // all but last button
    if (i < startingDialogBtns.length - 1)
    {
        startingDialogBtns[i].textContent = '>'
        startingDialogBtns[i].addEventListener('click', (e) =>
        {
            addInput(startingDialogs[i])
            e.target.parentNode.close()
            startingDialogs[i + 1].showModal()
            startingDialogs[i + 1].classList.remove('opacity-0')
        })
    }
    // last button
    if (i === startingDialogBtns.length - 1)
    {
        startingDialogBtns[i].textContent = 'START'
        startingDialogBtns[i].addEventListener('click', (e) =>
        {
            addInput(startingDialogs[i])
            e.target.parentNode.close()
            console.log(startingDialogInput)
            let gameArea = document.getElementById('game-area')
            let gameBg = document.getElementById('game-bg')
            let playerNameArea = document.querySelector('#player-area .score-name')
            playerNameArea.textContent = startingDialogInput[0]
            playerChipsArea.textContent = STARTING_CHIPS
            let emblemImg = playerEmblemArea.querySelector('img')
            let godName = startingDialogInput[1]
            emblemImg.src = `./img/${godName}/emblem.webp`
            gameArea.classList.remove('opacity-0')
            gameBg.classList.add('blur')

            setTimeout(() =>
            {
                initializePlayers()
            }, 500)
        })
    }
}



function addInput(dialog)
// parses input from menus, assuming text or radio input, and moves relevant input to startingDialogInput array
{
    let id = dialog.id
    let inputs = dialog.querySelectorAll(`#${id} input`)
    // radio input
    if (inputs.length > 1)
    {
        inputs.forEach(input =>
        {
            if (input.checked)
            {
                startingDialogInput.push(input.value)
            }
        })
    }
    // single input
    else
    {
        startingDialogInput.push(inputs[0].value)
    }
}



let dealer
let player
const STARTING_CHIPS = 500
const gameDialogs = document.querySelectorAll('#game-dialogs dialog')
const betDialog = gameDialogs[0]
const drawDialog = gameDialogs[1]
const continueDialog = gameDialogs[2]
const endDialog = gameDialogs[3]
const playerEmblemArea = document.querySelector('#player-area .score-emblem')
const playerChipsArea = document.querySelector('#player-area .chips .amount')
const playerBetArea = document.querySelector('#player-area .bet .amount')
const playerCardsArea = document.querySelector('#player-area .cards-area')
const playerScoreArea = document.querySelector('#player-area .score .amount')
const dealerCardsArea = document.querySelector('#dealer-area .cards-area')
const dealerScoreArea = document.querySelector('#dealer-area .score .amount')


// game functions
function initializePlayers()
{
    dealer = new Dealer()
    let playerName = startingDialogInput[0]
    let playerGod = startingDialogInput[1]
    player = new Player(playerName, STARTING_CHIPS, playerGod)
    setTimeout(startRound, 3500)
}

function startRound()
{
    console.log('STARTING ROUND...')
    playerCardsArea.innerHTML = ''
    dealerCardsArea.innerHTML = ''
    dealer.collectCards(player)

    let betDialogInput = betDialog.querySelector('input')
    betDialogInput.setAttribute('max', player.getNumChips())
    betDialogInput.value = 1
    betDialog.showModal()
}

function setBetAmount(e)
{
    console.log('INSIDE SET BET AMOUNT')
    let betAmount = betDialog.querySelector('input').value
    player.bet(parseInt(betAmount))
    playerBetArea.textContent = player.getBetAmount()
    betDialog.close()
    dealCards()
}

function dealCards()
{
    console.log('INSIDE DEAL CARDS')
    // manipulate objects
    dealer.shuffle()
    player.hit(dealer)
    player.hit(dealer)
    dealer.hitSelf()
    dealer.hitSelf()
    // update UI
    // arrays of Card objects
    let playerHand = player.getHand()
    let dealerHand = dealer.getHand()
    // for Node versions of cards
    let playerCards = []
    let dealerCards = []

    // cards invisible when added
    for (let card of playerHand)
    {
        let pCard = generateCard(card.getValue(), card.getSuit())
        pCard.classList.add('opacity-0')
        playerCards.push(pCard)
    }
    for (let card of dealerHand)
    {
        let dCard = generateCard(card.getValue(), card.getSuit())
        dCard.classList.add('opacity-0')
        dealerCards.push(dCard)
    }
    // console.log(playerCards)
    // console.log(dealerCards)

    for (let card of playerCards)
    {
        // console.log('appending player card')
        // console.log(playerCardsArea)
        playerCardsArea.appendChild(card)
        // needed to get fade-in to work - gets optimized away otherwise
        window.getComputedStyle(card).opacity
    }
    for (let card of dealerCards)
    {
        // console.log('appending dealer card')
        dealerCardsArea.appendChild(card)
        // needed to get fade-in to work - gets optimized away otherwise
        window.getComputedStyle(card).opacity
    }

    // fade cards in
    let newCards = document.querySelectorAll('.card.opacity-0')
    // console.log(newCards)
    for (let card of newCards)
    {
        card.classList.remove('opacity-0')
    }

    // animate cards flipping and update scores
    setTimeout(() =>
    {
        for (let card of playerCards)
        {
            card.classList.add('flip-to-front')
        }
        dealerCards[1].classList.add('flip-to-front')
        // update scores such that hidden card value not accounted for
        let hiddenValue = dealerHand[0].getValue()
        let faceCards = Card.getValues().slice(9)
        // console.log(faceCards)

        if (hiddenValue === faceCards[faceCards.length - 1])
        {
            hiddenValue = 11
        }
        else if (faceCards.includes(hiddenValue))
        {
            hiddenValue = 10
        }

        updateScores(
            getBlackjackHandTotal(player),
            getBlackjackHandTotal(dealer) - parseInt(hiddenValue)
        )


        setTimeout(playerDrawPhase, 1500)

    }, 1000)
}

function playerDrawPhase()
{
    console.log('PLAYER DRAW PHASE')
    setTimeout(() =>
    {
        let handValue = getBlackjackHandTotal(player)
        if (handValue < 21)
        {
            drawDialog.showModal()
        }
        else if (handValue > 21)
        {
            console.log('BUST')
            // proceed to distribute chips and ask if continue
            conclusionPhase()
        }
        else
        {
            console.log('BLACKJACK')
            // don't allow player to decide to hit again - check if dealer also has blackjack before in event of tie
            dealerDrawPhase()
        }
    }, 500)
}

function dealerDrawPhase()
{
    console.log('DEALER DRAW PHASE')
    let hiddenCard = dealerCardsArea.querySelector('.card')
    hiddenCard.classList.add('flip-to-front')

    updateScores(
        getBlackjackHandTotal(player),
        getBlackjackHandTotal(dealer)
    )

    let prevScore = getBlackjackHandTotal(dealer)

    if (prevScore < 17)
    {
        dealer.hitSelf()
    }

    // TODO: figure out how to solve rare situation that dealer has an ace and would not currently beat the player if counting an ace as 11
    setTimeout(() =>
    {
        // have card to add to card area
        if (prevScore < 17)
        {
            console.log('adding new card to dealer\'s card area')
            let dealerHand = dealer.getHand()
            let newCard = dealerHand[dealerHand.length - 1]
            let newCardNode = generateCard(newCard.getValue(), newCard.getSuit())
            newCardNode.classList.add('opacity-0')
            dealerCardsArea.appendChild(newCardNode)
            window.getComputedStyle(newCardNode).opacity
            newCardNode.classList.remove('opacity-0')

            setTimeout(() =>
            {
                newCardNode.classList.add('flip-to-front')
                updateScores(
                    getBlackjackHandTotal(player),
                    getBlackjackHandTotal(dealer)
                )
            }, 1000)
        }

        // new score < 17?
        if (getBlackjackHandTotal(dealer) < 17)
        {
            dealerDrawPhase()
        }
        else
        {
            console.log('go to conclusion phase...')
            conclusionPhase()
        }
    }, 2000)
}

function conclusionPhase()
{
    console.log('CONCLUSION PHASE')
    let result = compareHands(player, dealer)
    let resultStr
    switch (result)
    {
        case -1:
            {
                console.log('You lose, dealer wins.')
                resultStr = 'You lose...'
                player.adjustChips(-1)
                break
            }
        case 0:
            {
                console.log('It\'s a draw!')
                resultStr = 'It\'s a draw.'
                break
            }
        case 1:
            {
                console.log('You win! Collect your chips!')
                resultStr = 'You win!'
                player.adjustChips(1)
                break
            }
        case 2:
            {
                console.log('Blackjack win! Collect even more chips!')
                resultStr = 'Blackjack!'
                player.adjustChips(2)
                break
            }
        default:
            {
                console.log('Something unexpected happened...')
                resultStr = 'Chaos is truly at work...'
                break
            }
    }

    let chipsRemaining = player.getNumChips()

    playerChipsArea.textContent = chipsRemaining
    playerChipsArea.classList.add('gold-text')
    setTimeout(() =>
    {
        console.log('removing gold text')
        playerChipsArea.classList.remove('gold-text')
        if (chipsRemaining <= 0)
        // end game
        {
            console.log('YOU LOSE')
            endGame()
        }
        else
        // prompt to continue
        {
            console.log('CONTINUE?')
            let resultArea = continueDialog.querySelector('#round-result')
            resultArea.textContent = resultStr
            continueDialog.showModal()
        }
    }, 1500)
}


function endGame()
// sets display values in end-window and makes it visible
{
    console.log('ENDING GAME')
    let endAmountArea = endDialog.querySelector('.amount')
    let endResultTextArea = endDialog.querySelector('#result')

    console.log('PLAYER IN ENDGAME:')
    console.log(player)

    let endingChips = player.getNumChips()
    endAmountArea.textContent = endingChips
    let playerGod = player.getChaosGod()
    let godString = playerGod.charAt(0).toUpperCase() + playerGod.slice(1)
    let resultText
    if (endingChips < STARTING_CHIPS)
    {
        resultText = `You have disgraced ${godString}... Your soul is forfeit.`
    }
    if (endingChips >= STARTING_CHIPS && endingChips < 1000)
    {
        resultText = `A meagre result. You will not be part of ${godString}'s favoured with that performance.`
    }
    if (endingChips >= 1000 && endingChips < 1500)
    {
        resultText = `An adequate performance. You have caught ${godString}'s eye.`
    }
    if (endingChips >= 1500)
    {
        resultText = `An outcome expected of ${godString}'s favoured.`
    }

    endResultTextArea.textContent = resultText
    endDialog.showModal()
}

function generateCard(value, suit)
{
    let card = document.createElement('div')
    card.classList.add('card')
    console.log('value: ', value)
    console.log('suit: ', suit)
    let godForSuit
    switch (suit)
    {
        case 'club': godForSuit = 'khorne'; break;
        case 'spade': godForSuit = 'nurgle'; break;
        case 'heart': godForSuit = 'slaanesh'; break;
        case 'diamond': godForSuit = 'tzeentch'; break;
        default: godForSuit = ''; break;
    }

    let frontImagePath = `./img/${godForSuit}/${value}.png`
    card.innerHTML = `<div class="card-back"><img src="./img/undivided_symbol.webp" /></div><div class="card-front ${godForSuit}"></div>`
    let cardFront = card.querySelector('.card-front')
    cardFront.classList.add(godForSuit)
    cardFront.style.backgroundImage = `url(${frontImagePath})`
    // <img class="${godForSuit}" src="${frontImagePath}" />
    // console.log(card)
    return card
}

function updateScores(playerScore, dealerScore)
{
    playerScoreArea.textContent = playerScore
    dealerScoreArea.textContent = dealerScore
}





// adding game functions via event listeners for game flow
let submitBetBtn = betDialog.querySelector('button')
submitBetBtn.addEventListener('click', setBetAmount)

// HIT button
let drawBtns = drawDialog.querySelectorAll('button')
drawBtns[0].addEventListener('click', (e) =>
{
    // close to prevent re-clicking while animation is playing
    drawDialog.close()
    player.hit(dealer)

    // add newly drawn card to player's card area
    let pHand = player.getHand()
    let newCard = pHand[pHand.length - 1]
    let newCardNode = generateCard(newCard.getValue(), newCard.getSuit())
    newCardNode.classList.add('opacity-0')
    playerCardsArea.appendChild(newCardNode)
    window.getComputedStyle(newCardNode).opacity
    newCardNode.classList.remove('opacity-0')

    // play animation and update scores
    setTimeout(() =>
    {
        newCardNode.classList.add('flip-to-front')
        let currDealerVal = dealerScoreArea.textContent
        updateScores(
            getBlackjackHandTotal(player),
            currDealerVal
        )
        // restart draw phase - automatically move to final phase if player has score of 21 or higher
        playerDrawPhase()
    }, 1000)
})

// STAND button
drawBtns[1].addEventListener('click', (e) =>
{
    drawDialog.close()
    dealerDrawPhase()
})

let continueBtns = document.querySelectorAll('#continue-prompt button')
continueBtns[0].addEventListener('click', (e) =>
{
    // clear board and start new round
    continueDialog.close()
    let resultArea = continueDialog.querySelector('#round-result')
    resultArea.textContent = ''
    startRound()
})

continueBtns[1].addEventListener('click', (e) =>
{
    continueDialog.close()
    let resultArea = continueDialog.querySelector('#round-result')
    resultArea.textContent = ''
    endGame()
})

