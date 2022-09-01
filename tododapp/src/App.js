import { useEffect, useState } from 'react'
import detectEthereumProvider from '@metamask/detect-provider'
import Web3 from 'web3'
import Task from './components/Task'
import { loadContract } from './utils/load-contract.js'

function App() {
  const [web3Api, setWeb3Api] = useState({
    provider: null,
    web3: null,
  })
  const [account, setAccount] = useState()
  useEffect(() => {
    const loadProvider = async () => {
      const provider = await detectEthereumProvider()
      if (provider) {
        const contract = await loadContract('Tododapp', provider)
        setWeb3Api({
          web3: new Web3(provider),
          provider,
          contract,
        })
      } else {
        console.error('connect to your wallet')
      }
    }
    loadProvider()
  }, [])

  useEffect(() => {
    const getAccount = async () => {
      const accounts = await web3Api.web3.eth.getAccounts()
      setAccount(accounts[0])
    }
    web3Api.web3 && getAccount()
  }, [web3Api.web3])

  console.log(web3Api)
  return (
    <>
      <div>
        Your account is:{' '}
        {account ? (
          account
        ) : (
          <span>
            <button
              onClick={() =>
                web3Api.provider.request({ method: 'eth_requestAccounts' })
              }
            >
              Connect wallet
            </button>
          </span>
        )}
      </div>
      <Task account={account} />
    </>
  )
}

export default App
