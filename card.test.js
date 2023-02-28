import { Card } from "./card.js"

console.log(`-------------- CARD TESTS --------------`)

// make sure only proper cards can be created
let myCard
try
{
    myCard = new Card('queen', 'club')
}
catch (e)
{
    console.log(e.message)
}
console.log(myCard)

// create deck and shuffle it
let myDeck = Card.createDeck()
console.log(myDeck)
Card.shuffle(myDeck)

console.log('deck is has one of each card initially: ', getIsDeckProper(myDeck))
console.log('deck is has one of each card after shuffle: ', getIsDeckProper(myDeck))

function getIsDeckProper(deck)
{
    let card_suits = Card.getSuits()
    let card_values = Card.getValues()

    // console.log(card_suits)
    // console.log(card_values)
    // console.log(deck)

    for (let suit of card_suits)
    {
        for (let value of card_values)
        {

            let numMatches = deck.filter(card => card.getSuit() === suit && card.getValue() === value).length
            if (numMatches !== 1)
                return false
        }
    }

    return true
}