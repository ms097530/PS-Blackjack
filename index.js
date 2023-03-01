import { Card } from "./card.js";
import { Player } from "./player.js";
import { NPC } from "./npc.js";
import { Dealer } from "./dealer.js";
import { compareHands, getBlackjackHandTotal } from "./util.js";


const STARTING_CHIPS = 500

// initialize dealer and player(s)
const dealer = new Dealer()
const player = new Player('Test Testerson II', STARTING_CHIPS, 'khorne')
let isStillPlaying = true

// start game loop
while (player.getNumChips() > 0 && isStillPlaying)
{
    // get player's bet and place it
    let playerBet = prompt('Place your bet (anything other than number interpreted as walking away):')
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
    let canStillHit = true
    while (canStillHit)
    {
        let answer = prompt('Hit or stand?')
        if (answer === 'hit')
        {
            player.hit(dealer)
            console.log(`New total: ${getBlackjackHandTotal(player)}`)
        }
        else
        {
            canStillHit = false
        }
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

    isStillPlaying = false
}

console.log(`You walked away with ${player.getNumChips()}`)