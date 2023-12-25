// src/components/Leaderboard.tsx
import React, { useEffect, useState } from 'react';
import styles from './Leaderboard.module.css';
import { LeaderboardEntry } from '../../types/LeaderboardTypes';
import axios from 'axios';
import { WagmiConfig, createConfig, configureChains, mainnet, useEnsAvatar, useEnsName } from 'wagmi'
import { useAccount, useConnect, useDisconnect, useBalance } from 'wagmi'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc';
import { MintNFT } from '../Mint/mint';

const { chains, publicClient } = configureChains(
  [mainnet],
  [
    jsonRpcProvider({
      rpc: () => ({
        http: "https://compatible-delicate-yard.quiknode.pro/f17a888d1b441249507f591fe65b9c4e9fcbc10b/" // 👈 Replace this with your HTTP URL from the previous step
      }),
    })
  ]
);

const config = createConfig({
  autoConnect: true,
  publicClient,
  connectors: [
    new InjectedConnector({
      chains,
      options: {
        name: 'Injected',
        shimDisconnect: true,
      },
    })
  ]
})

interface LeaderboardProps {
}

const Leaderboard: React.FC<LeaderboardProps> = () => {

  // const { address, connector, isConnected } = useAccount()

  // const {  connectors,connect, error, pendingConnector } =
  //   useConnect()
  // const { disconnect } = useDisconnect()
  // const { data, isError, isLoading } = useBalance({
  //   address: address,
  // })
  // console.log(connectors);
  const { address, connector, isConnected } = useAccount()
  const { data: ensName } = useEnsName({ address })
  const { data: ensAvatar } = useEnsAvatar({ name: ensName })
  const { connect, connectors, error, isLoading, pendingConnector } =
    useConnect()
  const { disconnect } = useDisconnect()


  const handledisconnect = () => {
    disconnect()
  }


  const [leaderboardData, updateLeaderboard] = useState([])

  useEffect(() => {
    axios.get('https://discord-invite-bot-1b452bfc0fdc.herokuapp.com/leaderboard').then(res => {
      updateLeaderboard(res.data.data)
      return
    })
    return
  }, [])

  return (
    <div className={styles.leaderboard}>

      <div>

        <div className={styles.header}>
          {/* Logo Placeholder */}
          <div className={styles.logo}>
            <img src="/logo192.png" alt="logo" className={styles.logoImage} />
          </div>

          {/* Navigation Bar */}
          <div className={styles.navbar}>
            <a href="/" className={styles.navLink}>Home</a>
            <a href="/about" className={styles.navLink}>Discord</a>
            <a href="/contact" className={styles.navLink}>Leaderboard</a>
          </div>


          {/* Search Container */}
          <div className={styles.searchContainer}>
            <input type="text" placeholder="Search" className={styles.searchInput} />
            <i className={`fa-solid fa-magnifying-glass ${styles.searchIcon}`}></i> {/* Font Awesome icon */}
            {/* <i className={`fas fa-search ${styles.searchIcon}`}></i> Font Awesome icon */}
          </div>

          {/* User and notifications */}
          <div className={styles.menu}>
            <i className="fa-regular fa-bell"></i>
            <i className="fa-regular fa-user"></i>
          </div>
        </div>

        {/* Title and Filter Dropdown*/}
        <div className={styles.titleAndFilter}>
          <h1 className={styles.title}>Web3 Dao</h1>

          <div>
            {/* {isConnected ? <div>
              <div>
                <div>{ensName ? `${ensName} (${address})` : address}</div>
                <button onClick={handledisconnect}>Disconnect</button>
              </div>
            </div> : <div>
              {connectors.map((connector) => (

                <button
                  disabled={!connector.ready}
                  key={connector.id}
                  onClick={() => connect({ connector })}
                >
                  {connector.name}
                  {!connector.ready && ' (unsupported)'}
                </button>
              ))}
            </div>} */}
            {
              isConnected ? <MintNFT/>:<div>
              {connectors.map((connector) => (

                <button
                  disabled={!connector.ready}
                  key={connector.id}
                  onClick={() => connect({ connector })}
                >
                  {connector.name}
                  {!connector.ready && ' (unsupported)'}
                </button>
              ))}
            </div>
            }
            <button>All time</button>
            <select className={styles.filter} defaultValue="all">
              <option value="daily">Daily</option>
            </select>
          </div>
        </div>
      </div>

      <table className={styles.table}>
        <thead>
          <tr className={styles.columnHeaders}>
            <th className={styles.column}>Rank</th>
            <th className={styles.column}>Username</th>
            <th className={styles.column}>Invites</th>
            <th className={styles.column}>Token Rewarded</th>
          </tr>
        </thead>
        <tbody>
          {leaderboardData.map((entry: LeaderboardEntry) => (
            <tr key={entry.rank} className={styles.entry}>
              <td className={styles.rank}>{entry.rank}</td>
              <td className={styles.username}>
                <img src={entry.avatarUrl} alt={`${entry.username}'s avatar`} className={styles.avatar} />
                {entry.username}
              </td>
              <td className={styles.invitesCount}>{entry.invitesCount}</td>
              <td className={styles.tokenRewarded}>{entry.tokenRewarded}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Leaderboard;
