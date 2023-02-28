import { Card } from "./card.js";

export class Dealer
{
    #deck

    constructor()
    {
        this.#deck = Card.createDeck()
    }

    shuffle()
    {
        Card.shuffle(this.#deck)
    }
}