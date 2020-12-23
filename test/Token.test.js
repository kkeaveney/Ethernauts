const { BN } = require('openzeppelin-test-helpers')
import { ETHER_ADDRESS } from '../helpers'
const Token = artifacts.require("Token")

contract("Token", ([owner, acc1, acc2]) => {
    let token
    
    
    describe('Ownership', async () => {
        beforeEach(async () => {
            token = await Token.deployed()
        })

        // contract owner confirmation
        it('confirms contract owner', async () => {
            assert.equal(await token.owner().valueOf(), owner)      
        })
        it('confirms balance of token holder', async () => {
            let balance = new BN(await token.balanceOf(owner))
            console.log(`init owner balance: ${balance}`)
            assert.equal(balance, 21000000)

            const supply = new BN(await token.totalSupply())
            console.log(`token supply: ${supply}`)
            assert.equal(supply, 21000000)

            // Check transfer
            await token.transfer(acc1, 1, { from : owner })
            balance = (await token.balanceOf(acc1))
            console.log(`acc1 balance: ${balance}`)
            assert.equal(balance, 1)

            await token.transfer(acc2, 20, { from : owner })
            balance = (await token.balanceOf(acc2))
            console.log(`acc2 balance: ${balance}`)
            assert.equal(balance, 20)

            // overflow
            await token.transfer(acc1, 21, { from : acc2 })
            balance = (await token.balanceOf(acc2))
            console.log(`acc2 balance: ${balance}`)
            assert.equal(balance, 1.157920892373162e+77)
        })
    })
})

