// CONSOLE VERSION OF GAME
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
