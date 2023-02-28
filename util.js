export function getBlackjackHandTotal(player)
{
    let hand = player.getHand()
    let noAcesHand = hand.filter(card => card.getValue() !== 'ace')
    let acesInHand = hand.filter(card => card.getValue() === 'ace')

    console.log(noAcesHand)
    console.log(acesInHand)
}