const Fallback = artifacts.require("Fallback")
const SendToFallback = artifacts.require("SendToFallback")

contract("Fallback", async (accounts) => {
    describe('Ownership', async () => {
        beforeEach(async () => {
            this.fallback = await Fallback.deployed()
        })
        it('confirms contract owner', async () => {
            assert.equal(await this.fallback.owner().valueOf(), accounts[0])
        })
    })
})