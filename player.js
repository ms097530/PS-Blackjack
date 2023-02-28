export class Player
// stand is inaction, so no method necessary? just check choice during round?
{
    #name
    #numChips
    #chaosGod
    #hand = []
    #betAmount = 0

    static victoryCries = {
        khorne: [],
        slaanesh: [],
        tzeentch: [],
        nurgle: []
    }

    constructor(name, numChips, chaosGod)
    {
        this.#name = name
        this.#numChips = numChips
        this.#chaosGod = chaosGod
    }

    bet(amount)
    // set bet amount for current round
    {
        this.#betAmount = amount
    }

    hit(dealer)
    // get card from dealer
    {
        let card = dealer.deal()
        this.#hand.push(card)
    }
}