export function getBlackjackHandTotal(player)
{
    // sum values of cards in `player` hand
    // ace can count for either 1 or 11
    // automatically count as 1 if counting as 11 would cause a bust

    let hand = player.getHand()
    let noAcesHand = hand.filter(card => card.getValue() !== 'ace')
    let acesInHand = hand.filter(card => card.getValue() === 'ace')

    // console.log(noAcesHand)
    // console.log(acesInHand)

    let total = 0

    for (let card of noAcesHand)
    {
        total += +card.getValue() ? +card.getValue() : 10
    }

    for (let card of acesInHand)
    {
        if (total > 10)
        {
            total += 1
        }
        else
        {
            total += 11
        }
    }

    // console.log(total)
    return total
}