import { ETHER_ADDRESS } from '../helpers'
const Fallout = artifacts.require("Fallout")

contract("Fallout", ([owner, hacker]) => {
    let fallout
    
    
    describe('Ownership', async () => {
        beforeEach(async () => {
            fallout = await Fallout.deployed()
        })

        // contract owner confirmation
        it('confirms contract owner', async () => {
            assert.equal(await fallout.owner().valueOf(), ETHER_ADDRESS)      
        })
        // transfer of ownership
        // The contructor was renamed, but the previous one is still accessable
        // and can change ownership
        it('confirms allows transfer of ownership', async () => {
            await fallout.Fal1out({ from: hacker })
            assert.equal(await fallout.owner().valueOf(), hacker)  
        })
    })


})

