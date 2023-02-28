import { Dealer } from "./dealer.js";

console.log(`-------------- DEALER TESTS --------------`)

let myDealer = new Dealer()
console.log('dealer deck before shuffle:')
console.log(myDealer)
myDealer.shuffle()
console.log('dealer deck after shuffle')
console.log(myDealer)