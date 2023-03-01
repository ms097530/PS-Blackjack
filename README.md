# Chaos Blackjack
![Chaos Symbol](https://static.wikia.nocookie.net/warhammerfb/images/b/b3/Warhammer_Chaos_Symbols.png/revision/latest?cb=20170406224324)

## Premise

This project is an implementation of the well-known card game Blackjack, but with the twist of being themed around the Chaos gods from Warhammer Fantasy. They are:

- [Khorne](https://warhammerfantasy.fandom.com/wiki/Khorne): god of war, rage, blood
- [Nurgle](https://warhammerfantasy.fandom.com/wiki/Nurgle): god of disease, decay, death and rebirth
- [Slaanesh](https://warhammerfantasy.fandom.com/wiki/Slaanesh): god of pleasure, passion, excess, pain
- [Tzeentch](https://warhammerfantasy.fandom.com/wiki/Tzeentch): god of change, destiny, lies, trickery, sorcery

Images of important characters in the setting serving each deity are used for the face cards.

## Rules
- Each player at the table is playing against the dealer, not against each other.
- Number cards use their number as their score value.
- Face cards all have a score value of 10.
- Aces can be scored as either a 1 or 11. If using an ace as 11 would cause a player to bust, it is automatically counted as a 1.
- If the player's score for the round is higher than the dealer's the player wins the round, receiving 200% of what they bet.
- If the player's score for the round is equal to the dealer's, the round is a tie and no chips are exchanged.
- If the player's score is less than the dealer's, the player loses the chips they bet for the round.
- If the dealer busts, all players who haven't busted win the round.
- A score of 21 is a "Blackjack". If the player gets a Blackjack, they win the round (unless the dealer also has Blackjack) and receive 250% of their bet.

## Flow of a Round
1. To start a round, the deck gets shuffled and players place bets in a clockwise direction, starting to the left of the dealer. 
2. Each player is then dealt two cards. The dealer is also dealt two cards, with one remaining face down. 
3. Proceeding in the same clockwise fashion, each player decides to hit (as many times as they like) or stand, deciding to challenge the dealer with the cards they currently have.
4. Once all players finish with their hands, the dealer draws cards until their score is 17+.
5. Chips are distributed based on individual outcome and cards are recollected. 


## Sources
- [Masters Traditional Games (The Rules of Blackjack)](https://www.mastersofgames.com/rules/blackjack-rules.htm)
- [Warhammer Fantasy Fandom Wiki](https://warhammerfantasy.fandom.com/wiki/Warhammer_Wiki)