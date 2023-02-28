import { Card } from "./card.js";

export class Dealer
{
    #deck
    #hand = []

    constructor()
    {
        this.#deck = Card.createDeck()
    }

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
        this.deal().push(this.#hand)
    }
}