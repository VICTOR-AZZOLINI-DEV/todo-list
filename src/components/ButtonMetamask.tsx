import { EthereumClient, w3mConnectors, w3mProvider } from '@web3modal/ethereum'
import { Web3Modal } from '@web3modal/react'
import { configureChains, createClient, WagmiConfig } from 'wagmi'
import { goerli, celoAlfajores } from 'wagmi/chains'
import { Web3Button } from '@web3modal/react'

function HomePage() {
  return <Web3Button />
}

const chains = [goerli, celoAlfajores]
const projectId = '47199843a3bf2f392f83c86dd83b7ee0'

const { provider } = configureChains(chains, [w3mProvider({ projectId })])
const wagmiClient = createClient({
  autoConnect: true,
  connectors: w3mConnectors({ projectId, version: 1, chains }),
  provider
})
const ethereumClient = new EthereumClient(wagmiClient, chains)

export default function ButtonMetamask() {
  return (
    <>
    
      <WagmiConfig client={wagmiClient}>
        <HomePage />
      </WagmiConfig>

      <Web3Modal projectId={projectId} ethereumClient={ethereumClient} />
    </>
  )
}