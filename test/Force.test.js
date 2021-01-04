import { toEther, toWei, EVM_REVERT } from '../helpers'
const Force = artifacts.require("Force")
const ForceAttack = artifacts.require("ForceAttack")


contract("Force", ([owner]) => {
    let force
    let forceAttack
    
    describe('Ownership', async () => {
        beforeEach(async () => {
            force = await Force.deployed()
            forceAttack = await ForceAttack.deployed()
        })

        it('Confirms contract balance', async () => {
            let balance = await web3.eth.getBalance(force.address)
            assert.equal(balance.valueOf(),0)
        })

        it('sends ether to attacker contract', async () => {
            await web3.eth.sendTransaction({from: owner, to: forceAttack.address, value: web3.utils.toWei('0.001', 'ether')})
            let balance = await web3.eth.getBalance(forceAttack.address)
            assert.equal(balance.valueOf(),web3.utils.toWei('0.001', 'ether'))
        })

        it('transfers Eth to the Force address, using self destruct', async () => {
            // Call ForceAttack Self Destruct to trasnfer funds
            await forceAttack.attack(force.address);
            let balance = await web3.eth.getBalance(force.address)
            assert.equal(balance.valueOf(),web3.utils.toWei('0.001', 'ether'))
        })
        
    })
})