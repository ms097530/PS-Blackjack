import { Card } from "./card.js";
import { Player } from "./player.js";
import { NPC } from "./npc.js";
import { Dealer } from "./dealer.js";
import { compareHands, getBlackjackHandTotal } from "./util.js";

const startingDialogs = document.querySelectorAll('#starting-dialogs dialog')
const startingDialogBtns = document.querySelectorAll('#starting-dialogs dialog button')
const startingDialogInput = []

const playerChipsArea = document.querySelector('#players-area .chips .amount')
const playerBetArea = document.querySelector('#players-area .bet .amount')

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
            let playerNameArea = document.querySelector('#players-area .score-name')
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

const gameDialogs = document.querySelectorAll('#game-dialogs dialog')
const betDialog = gameDialogs[0]
const hitDialog = gameDialogs[1]
const continueDialog = gameDialogs[2]

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

// game functions
function initializePlayers(playerName, playerGod)
{
    dealer = new Dealer()
    player = new Player(playerName, STARTING_CHIPS, playerGod)
    startRound()
}

function startRound()
{
    betDialog.querySelector('input').setAttribute('max', player.getNumChips())
    betDialog.showModal()
}

function setBetAmount(e)
{
    let betAmount = betDialog.querySelector('input').value
    player.bet(betAmount)
    playerBetArea.textContent = player.getBetAmount()
    betDialog.close()
}

// adding game functions via event listeners for game flow
let submitBetBtn = betDialog.querySelector('button')
submitBetBtn.addEventListener('click', setBetAmount)

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
