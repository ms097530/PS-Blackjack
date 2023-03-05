import { Card } from "./card.js";
import { Player } from "./player.js";
import { NPC } from "./npc.js";
import { Dealer } from "./dealer.js";
import { compareHands, getBlackjackHandTotal } from "./util.js";

const startingDialogs = document.querySelectorAll('#starting-dialogs dialog')
const startingDialogBtns = document.querySelectorAll('#starting-dialogs dialog button')
const startingDialogInput = []



// show first dialog
// setTimeout(() =>
// {
console.log('showing modal')
let firstDialogInput = document.querySelector('dialog input')
firstDialogInput.value = ''
let secondDialogInputs = document.querySelectorAll('#god-prompt input')
secondDialogInputs.forEach(input =>
{
    input.checked = false
})

startingDialogs[0].showModal()
startingDialogs[0].classList.remove('opacity-0')
// }, 500)

for (let i = 0; i < startingDialogBtns.length; ++i)
{
    // console.log(startingDialogBtns)

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
            gameArea.classList.remove('opacity-0')
            gameBg.classList.add('blur')

            setTimeout(() =>
            {
                // playGame()
                initializePlayers()
            }, 500)
        })
    }
}



function addInput(dialog)
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
                // input.checked = false
            }
        })
    }
    // single input
    else
    {
        startingDialogInput.push(inputs[0].value)
        // dialogInput.textContent = ''
    }
}

let dealer
let player
const STARTING_CHIPS = 500
const gameDialogs = document.querySelectorAll('#game-dialogs dialog')
const betDialog = gameDialogs[0]
const drawDialog = gameDialogs[1]
const continueDialog = gameDialogs[2]
const playerChipsArea = document.querySelector('#player-area .chips .amount')
const playerBetArea = document.querySelector('#player-area .bet .amount')
const playerCardsArea = document.querySelector('#player-area .cards-area')
const playerScoreArea = document.querySelector('#player-area .score .amount')
const dealerCardsArea = document.querySelector('#dealer-area .cards-area')
const dealerScoreArea = document.querySelector('#dealer-area .score .amount')


// game functions
function initializePlayers(playerName, playerGod)
{
    dealer = new Dealer()
    player = new Player(playerName, STARTING_CHIPS, playerGod)
    startRound()
}

function startRound()
{
    let betDialogInput = betDialog.querySelector('input')
    betDialogInput.setAttribute('max', player.getNumChips())
    betDialogInput.value = 1
    betDialog.showModal()
}

function setBetAmount(e)
{
    let betAmount = betDialog.querySelector('input').value
    player.bet(parseInt(betAmount))
    playerBetArea.textContent = player.getBetAmount()
    betDialog.close()
    dealCards()
}

function dealCards()
{
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
        console.log(playerCardsArea)
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
    console.log(newCards)
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
        console.log(faceCards)

        if (hiddenValue === faceCards[faceCards.length - 1])
        {
            hiddenValue = 10
        }
        else if (faceCards.includes(hiddenValue))
        {
            hiddenValue = 11
        }

        updateScores(
            getBlackjackHandTotal(player),
            getBlackjackHandTotal(dealer) - parseInt(hiddenValue)
        )


        drawPhase()

    }, 800)
}

function drawPhase()
{
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
        }
        else
        {
            console.log('BLACKJACK')
        }
    }, 500)
}

function generateCard(value, suit)
{
    let card = document.createElement('div')
    card.classList.add('card')
    card.innerHTML = `<div class="card-back"><img src="./img/undivided_symbol.webp" /></div><div class="card-front">${suit}\n${value}</div>`
    console.log(card)
    return card
}

function dealCard(player)
{
    let card = generateCard()
}

function updateScores(playerScore, dealerScore)
{
    playerScoreArea.textContent = playerScore
    dealerScoreArea.textContent = dealerScore
}





// adding game functions via event listeners for game flow
let submitBetBtn = betDialog.querySelector('button')
submitBetBtn.addEventListener('click', setBetAmount)

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
        drawPhase()
    }, 800)
})

function playGame()
{


    // initialize dealer and player(s)
    const dealer = new Dealer()
    const player = new Player(startingDialogInput[0], STARTING_CHIPS, 'khorne')
    playerChipsArea.textContent = player.getNumChips()
    let isStillPlaying = true
    // start game loop
    while (player.getNumChips() > 0 && isStillPlaying)
    {
        let awaitingInput = true
        betDialog.querySelector('input').setAttribute('max', player.getNumChips())
        betDialog.showModal()
        // get player's bet and place it
        while (awaitingInput)
        {
            console.log('awaiting input')
            awaitingInput = false
        }
        // let playerBet = prompt(`Place your bet (current chips: ${player.getNumChips()}):`)
        player.bet(parseInt(playerBet))

        // shuffle deck before dealing cards each round
        dealer.shuffle()

        // player(s) and dealer get two cards
        player.hit(dealer)
        player.hit(dealer)

        dealer.hitSelf()
        dealer.hitSelf()

        console.log('Your hand:')
        console.log(player.getHand())
        console.log(getBlackjackHandTotal(player))

        // player decision time
        let canStillHit = getBlackjackHandTotal(player) >= 21 ? false : true
        while (canStillHit)
        {
            let answer = prompt(`Hit or stand? (current score: ${getBlackjackHandTotal(player)})`)
            if (answer === 'hit')
            {
                player.hit(dealer)
                console.log(`New total: ${getBlackjackHandTotal(player)}`)
            }
            else
            {
                canStillHit = false
            }

            if (getBlackjackHandTotal(player) >= 21)
                canStillHit = false
        }
        console.log('Your hand after possibly hitting:')
        console.log(player.getHand())
        console.log(getBlackjackHandTotal(player))

        // player phase over, finish dealer's hand
        while (getBlackjackHandTotal(dealer) < 17)
        {
            dealer.hitSelf()
        }

        // compare hands
        console.log('Dealer hand after possibly hitting:')
        console.log(dealer.getHand())
        console.log(getBlackjackHandTotal(dealer))

        // 0 = tie, 1 = player win, -1 = dealer win
        let result = compareHands(player, dealer)
        switch (result)
        {
            case -1:
                {
                    console.log('You lose, dealer wins.')
                    player.adjustChips(-1)
                    break
                }
            case 0:
                {
                    console.log('It\'s a draw!')
                    break
                }
            case 1:
                {
                    console.log('You win! Collect your chips!')
                    player.adjustChips(1)
                    break
                }
            case 2:
                {
                    console.log('Blackjack win! Collect even more chips!')
                    player.adjustChips(2)
                    break
                }
            default:
                {
                    console.log('Something unexpected happened...')
                    break
                }
        }

        // collect cards
        dealer.collectCards(player)

        console.log('Dealer\'s deck:')
        console.log(dealer.getDeck())
        console.log('Dealer\'s hand:')
        console.log(dealer.getHand())
        console.log('Player\'s hand:')
        console.log(player.getHand())

        console.log('Total chips: ', player.getNumChips())

        // check if user CAN keep playing
        // if yes, check if user WANTS to continue
        if (player.getNumChips() > 0)
        {
            let keepPlaying = prompt('Continue playing? (Y or N)')
            if (keepPlaying.toLowerCase() === 'n')
                isStillPlaying = false
        }
        else
        {
            isStillPlaying = false
        }

    }

    console.log(`You walked away with ${player.getNumChips()} chips`)
}
