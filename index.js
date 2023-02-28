class Card
{
    #value
    #suit
    static #CARD_SUITS = ['club', 'heart', 'diamond', 'spade']
    static #CARD_VALUES = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'jack', 'queen', 'king', 'ace']

    constructor(value, suit)
    {
        let matchingVal = Card.#CARD_VALUES.find(val => value.toString().toLowerCase() === val)
        if (matchingVal)
            this.#value = matchingVal
        else
            throw new Error('Value must be between 2-10 or jack, queen, king, or ace')

        let matchingSuit = Card.#CARD_SUITS.find(s => suit.toLowerCase() === s)
        if (matchingSuit)
            this.#suit = matchingSuit
        else
            throw new Error('Suit must be club, heart, diamond, or spade')
    }

    static printSuits()
    {
        console.log(Card.#CARD_SUITS)
    }

    static createDeck()
    {
        let deck = []

        for (let suit of Card.#CARD_SUITS)
        {
            for (let val of Card.#CARD_VALUES)
            {
                let card = new Card(val, suit)
                deck.push(card)
            }
        }

        return deck
    }

    static shuffle(deck)
    {
        //  remainingIndexes = [ 0... 51 ] - already assigned indexes will be removed after each loop
        //  get randomIndex in remainingIndexes
        //  each entry in newIndexes should be unique, each between 0 and 51 (inclusive), coming from remainingIndexes

        let remainingIndexes = deck.map((val, i) => i)
        let newIndexes = []

        // create mapping of new deck arrangement where the value of newIndexes[x] is a unique value between 0 and 51 (inclusive) such that deck[x] will become deck[newIndexes[x]] 
        // create mapping of new deck arrangment
        //                      index: 13
        // deck[..., { value: '2', suit: 'club'}, ...]   length: 52
        //                      index: 13
        // newIndexes[17, 49, ..., 24, ...]   length: 52
        // so...
        // deck[13] moves to deck[24]
        // deck[0] moves to deck[17]
        // deck[1] moves to deck[49]
        // etc...
        while (remainingIndexes.length > 0)
        {
            let randomIndex = Math.floor(Math.random() * remainingIndexes.length)
            newIndexes.push(remainingIndexes[randomIndex])
            remainingIndexes.splice(randomIndex, 1)
        }

        // console.log(newIndexes)
        // console.log(remainingIndexes)

        // get copy of deck for reference
        let copyDeck = Array.from(deck)

        // rearrange deck using indexes from newIndexes
        for (let i = 0; i < copyDeck.length; ++i)
        {
            deck[i] = copyDeck[newIndexes[i]]
        }
    }

    getValue()
    {
        return this.#value
    }

    getSuit()
    {
        return this.#suit
    }
}

Card.printSuits()
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

let myDeck = Card.createDeck()
console.log(myDeck)

Card.shuffle(myDeck)