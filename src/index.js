import React, { useEffect, useState } from 'react'

export const OpenContract = (apiKey, contractJson, contractAddress) => {
  const [account, setAccount] = useState('')
  const [contract, setContract] = useState(null)
  const [contractState, setContractState] = useState(true)

  async function loadWeb3() {
    var { ethereum, web3 } = window

    if (ethereum) {
      await ethereum.request({ method: 'eth_requestAccounts' })
      ethereum.autoRefreshOnNetworkChange = false
    } else if (web3) {
      web3 = new Web3(web3.currentProvider)
    } else {
      window.alert('Consider using metamask or web3 compatible browser(Mist).')
    }

    // get ethereum accounts
    const accounts = await ethereum.request({ method: 'eth_accounts' })
    setAccount(accounts[0])
  }

  async function loadContract(apiKey, contractJson, contractAddress) {
    // setup contract
    const alchWeb3 = createAlchemyWeb3(apiKey)

    const tempContract = new alchWeb3.eth.Contract(
      contractJson.abi,
      contractAddress
    )
    setContract(tempContract)

    setContractState(false)
  }

  useEffect(() => {
    (async function fetchData() {
      await loadWeb3()
      await loadContract(apiKey, contractJson, contractAddress)
    })()
  }, [])

  return { account, contract, contractState }
}
