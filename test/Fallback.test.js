import { ether, EVM_REVERT } from '../helpers'
const Fallback = artifacts.require("Fallback")

contract("Fallback", ([owner, acc1]) => {
    let fallback
    
    describe('Ownership', async () => {
        beforeEach(async () => {
            fallback = await Fallback.deployed()
            
        })
        it('confirms contract owner', async () => {
            assert.equal(await fallback.owner().valueOf(), owner)      
        })
        it('confirms contract contribution', async () => {
            let balance = await fallback.getContribution()
            assert.equal(balance.toString(), ether(10).toString())
            
            balance = await fallback.getContribution({from: acc1});         
            assert.equal(balance.toString(), '0')
        })
    })
    
   
})


