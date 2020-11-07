# open-contract

> Easily get public address from active wallet and initialize contract method accessor.🚀

[![NPM](https://img.shields.io/npm/v/open-contract.svg)](https://www.npmjs.com/package/open-contract) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save open-contract
```

## Usage

```jsx
import React, { useEffect } from 'react'
//import your contract json
import ContractJSON from './build/contracts/MyContract.json' // path to your contract build

import { CleanContract } from 'clean-contract'

export default function App() {
  const [account, setAccount] = useState('')
  const [contract, setContract] = useState(null)
  const [loading, setLoading] = useState(false)

  // get your api and contract address
  const { apiKey, contractAddress } = process.env

  useEffect(() => {
    (async function fetchData() {
      const result = await CleanContract(apiKey, ContractJSON, contractAddress)
      const { account, contract, contractState } = result

      setAccount(account)
      setContract(contract)
      setLoading(contractState)
    })()
  }, [])
  return (
    {
      !loading ? 
      <div>Happy Hacking!🚀</div>: 
      <h1> Loading... </h1>
    }
  )
}
```