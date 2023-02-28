import { Dealer } from "./dealer.js";
import { Player } from "./player.js";

console.log(`-------------- DEALER TESTS --------------`)

// -------------------------------------------------
let myDealer = new Dealer()
console.log('dealer deck before shuffle:')
console.log(myDealer)
myDealer.shuffle()
console.log('dealer deck after shuffle')
console.log(myDealer)

// -------------------------------------------------
myDealer.hitSelf()
console.log('dealt self a card...')
console.log(myDealer.getHand())
console.log(myDealer.getDeck())

// -------------------------------------------------
let playerOne = new Player('Bob Dob', 500, 'nurgle')
let playerTwo = new Player('Dob Bobbins', 500, 'slaanesh')
myDealer.collectCards(playerOne, playerTwo)

console.log('collected cards...')
console.log(myDealer.getHand())
console.log(myDealer.getDeck())

// -------------------------------------------------
playerOne.hit(myDealer)
playerTwo.hit(myDealer)

console.log('dealt playerOne and playerTwo each a card')
console.log('playerOne:')
console.log(playerOne)
console.log('playerTwo:')
console.log(playerTwo)
console.log('dealer status:')
console.log(myDealer.getHand())
console.log(myDealer.getDeck())

// -------------------------------------------------
console.log('deal self a card')
myDealer.hitSelf()
console.log(myDealer.getHand())
console.log(myDealer.getDeck())

// -------------------------------------------------
myDealer.collectCards(playerOne, playerTwo)

console.log('collected cards...')
console.log('playerOne:')
console.log(playerOne)
console.log('playerTwo:')
console.log(playerTwo)
console.log('dealer status:')
console.log(myDealer.getHand())
console.log(myDealer.getDeck())