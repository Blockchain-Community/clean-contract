import * as Util from './utils'

// peer dependencies
import { createAlchemyWeb3 } from "@alch/alchemy-web3";
import Web3 from "web3";

// exporting package
export const CleanContract = (apiKey, contractJson, contractAddress) => {
  // empty parameter handling
  if (!apiKey || !contractJson || !contractAddress) {
    Util.setErrorMessage("One of the parameters for OpenContract is missing!");
    return { errorMessage: Util.getErrorMessage() };
  }

  // connect wallet
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

  // load contract
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

  // calling setup
  (async function fetchData() {
    await loadWeb3()
    await loadContract(apiKey, contractJson, contractAddress)
  })()

  // returning value
  return { account: Util.getAccount(), contract: Util.getContract(), contractState: Util.getContractState };
}
