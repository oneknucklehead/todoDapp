import { useEffect, useState } from 'react'
import detectEthereumProvider from '@metamask/detect-provider'
import Web3 from 'web3'
import Task from './components/Task'
import { loadContract } from './utils/load-contract.js'

function App() {
  const [web3Api, setWeb3Api] = useState({
    provider: null,
    web3: null,
    contract: null,
    isProviderLoaded: false,
  })
  const [account, setAccount] = useState()
  const setAccountListener = (provider) => {
    // provider.on('accountsChanged', (accounts) => setAccount(accounts[0]))
    provider.on('accountsChanged', () => {
      window.location.reload()
    })
    provider.on('chainChanged', () => {
      window.location.reload()
    })
  }
  useEffect(() => {
    const loadProvider = async () => {
      const provider = await detectEthereumProvider()
      if (provider) {
        const contract = await loadContract('Tododapp', provider)
        setAccountListener(provider)
        setWeb3Api({
          web3: new Web3(provider),
          provider,
          contract,
          isProviderLoaded: true,
        })
      } else {
        setWeb3Api((api) => {
          return { ...api, isProviderLoaded: true }
        })
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

  return (
    <>
      {web3Api.isProviderLoaded ? (
        <div>
          Your account is:{' '}
          {account ? (
            <span>{account}</span>
          ) : !web3Api.provider ? (
            <>
              <span>
                {' '}
                No wallet detected, Install{' '}
                <a
                  target='_blank'
                  href='https://docs.metamask.io'
                  rel='noreferrer'
                >
                  metamask
                </a>
                .
              </span>
            </>
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
      ) : (
        <span>Looking for ethereum provider...</span>
      )}
      <Task web3Api={web3Api} account={account} />
    </>
  )
}

export default App
