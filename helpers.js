export const ETHER_ADDRESS = '0x0000000000000000000000000000000000000000'

export const EVM_REVERT = 'VM Exception while processing transaction: revert'

export const toEther = (n) => {
  return new web3.utils.BN(web3.utils.fromWei(n.toString(), 'ether'))
}

export const toWei = (n) => {
  return new web3.utils.BN(web3.utils.toWei(n.toString(), 'ether'))
}

