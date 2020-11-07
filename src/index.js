import * as Util from './utils'
import { createAlchemyWeb3 } from "@alch/alchemy-web3";
import Web3 from "web3";

export const CleanContract = (apiKey, contractJson, contractAddress) => {
  if (!apiKey || !contractJson || !contractAddress) {
    Util.setErrorMessage("One of the parameters for OpenContract is missing!");
    return { errorMessage: Util.getErrorMessage() };
  }

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
    Util.setAccount(accounts[0])
  }

  async function loadContract(apiKey, contractJson, contractAddress) {
    // setup contract
    const alchWeb3 = createAlchemyWeb3(apiKey)

    const tempContract = new alchWeb3.eth.Contract(
      contractJson.abi,
      contractAddress
    )
    Util.setContract(tempContract)

    Util.setContractState(false)
  }

  (async function fetchData() {
    await loadWeb3()
    await loadContract(apiKey, contractJson, contractAddress)
  })()

  return { account: Util.getAccount(), contract: Util.getContract(), contractState: Util.getContractState };
}
