import { Card } from "./card.js";

export class Dealer
{
    #deck
    #hand = []

    constructor()
    {
        this.#deck = Card.createDeck()
    }

    // getters
    getDeck()
    {
        return this.#deck
    }

    getHand()
    {
        return this.#hand
    }

    // methods
    shuffle()
    {
        Card.shuffle(this.#deck)
    }

    deal()
    {
        return this.#deck.pop()
    }

    hitSelf()
    {
        this.#hand.push(this.deal())
    }

    collectCards(...players)
    {
        // return cards from players
        for (let player of players)
        {
            let playerHand = player.getHand()
            for (let card of playerHand)
            {
                this.#deck.push(card)
            }
            player.clearHand()
        }

        // return dealer's hand to deck
        for (let card of this.#hand)
        {
            this.#deck.push(card)
        }
        this.#hand = []
    }


}