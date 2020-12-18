const Fallback = artifacts.require("Fallback")

contract("Fallback", async ([owner, acc1]) => {
    

    describe('Ownership', async () => {
        beforeEach(async () => {
            this.fallback = await Fallback.deployed()
            
        })
        it('confirms contract owner', async () => {
            assert.equal(await this.fallback.owner().valueOf(), owner)      
        })
        it('confirms contract contribution', async () => {
            let balance = await this.fallback.getContribution()
            let balance2 = await this.fallback.getContribution({from: acc1});         
            
        })
    })
    
   
})


