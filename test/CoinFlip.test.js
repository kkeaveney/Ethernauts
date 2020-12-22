const CoinFlip = artifacts.require("CoinFlip")
const CoinFlipAttack = artifacts.require("CoinFlipAttack")

contract("CoinFlip", () => {
    let coinFlip
    let attacker
    
    describe('Ownership', async () => {
        beforeEach(async () => {
            coinFlip = await CoinFlip.deployed()
            attacker = await CoinFlipAttack.deployed()
        })

        it('should allow the player to guess correctly x10', async () => {
            
            for(var i = 0; i < 10; i ++) {
               await attacker.attack(coinFlip.address)
               
            }
            assert.equal(await coinFlip.consecutiveWins().valueOf(), 10)          
        })
    })
})