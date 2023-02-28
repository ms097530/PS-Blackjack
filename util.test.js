import { Player } from "./player.js";
import { Dealer } from "./dealer.js";
import { getBlackjackHandTotal } from "./util.js";

console.log(`-------------- UTIL TESTS --------------`)

let testPlayer = new Player('Test Testerson', 420, 'tzeentch')
let testDealer = new Dealer()

testDealer.shuffle()

//can only bust with 3+ cards, check if getBlackjackHandTotal will properly avoid busting when passed player has an ace
testDealer.hitSelf()
testDealer.hitSelf()
testDealer.hitSelf()

testPlayer.hit(testDealer)
testPlayer.hit(testDealer)
testPlayer.hit(testDealer)

console.log('hand total of dealer:')
getBlackjackHandTotal(testDealer)
console.log('hand total of player:')
getBlackjackHandTotal(testPlayer)