import { O_WRONLY } from 'constants'
import { toEther, toWei, EVM_REVERT } from '../helpers'
const Fallback = artifacts.require("Fallback")

contract("Fallback", ([owner, acc1]) => {
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
            let balance = toEther(await fallback.getContribution())
            assert.equal(balance.toString(),contribution.toString())
            
            balance = await fallback.getContribution({from: acc1 });         
            assert.equal(balance.toString(), '0')
        })
    })

    describe('Depositing a contribution', async () => {
        beforeEach(async () => {
            fallback = await Fallback.deployed()
            
         })
         // Non-owner makes a deposit, confirm contribution balance
         it('allows a non-owner to make a deposit', async () => {
             deposit = 100
             await fallback.contribute({ from: acc1, value: deposit  })
             let balance = toEther(await fallback.getContribution({from: acc1 }))
             assert.equal(balance.toString(), toEther(deposit).toString())
        })
        // Non owner calls the fallback function and takes ownership of the contract
         it('Non owner sends Ether to the contract, confirms new owner', async () => {
            await fallback.sendTransaction({ from: acc1, value: 2 })
            assert.equal(await fallback.owner(), acc1)

            const acc1Balance = await fallback.getContribution({from: acc1 })
            const ownerBalance = (toEther(await fallback.getContribution({from: owner })))
            console.log(acc1Balance.toString())
            console.log(ownerBalance.toString())
        })

    })

   
})


// contract.sendTransaction({
//     from: player,
//     value: toWei(...)
//   })
  