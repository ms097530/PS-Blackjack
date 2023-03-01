import { Player } from "./player.js";
import { Dealer } from "./dealer.js";
import { compareHands, getBlackjackHandTotal } from "./util.js";

console.log(`-------------- UTIL TESTS --------------`)

let testPlayer = new Player('Test Testerson', 420, 'tzeentch')
let testDealer = new Dealer()

testDealer.shuffle()

//can only bust with 3+ cards, check if getBlackjackHandTotal will properly avoid busting when passed player has an ace
testPlayer.hit(testDealer)
testPlayer.hit(testDealer)
testPlayer.hit(testDealer)

testDealer.hitSelf()
testDealer.hitSelf()
testDealer.hitSelf()


console.log('hand total of player:')
console.log(getBlackjackHandTotal(testPlayer))
console.log('hand total of dealer:')
console.log(getBlackjackHandTotal(testDealer))

// test compareHands
let result = compareHands(testPlayer, testDealer)
console.log(`Result is: ${result}`)