import styles from "@/styles/Header.module.css"
import { useWeb3Modal } from "@web3modal/react"
import { useState } from "react"
import { useAccount, useDisconnect } from "wagmi";

export default function Header() {
    const [loading, setLoading] = useState(false)

    const  { open } = useWeb3Modal();
    const { isConnected } = useAccount();
    const { disconnect } = useDisconnect();
    const label = isConnected ? "Disconnect" : "Connect Custom";

    async function whenConnectWallet() {
        setLoading(true);
        await open();
        setLoading(false);
    }

    function onClick() {
        if (isConnected) {
          disconnect();
        } else {
          whenConnectWallet();
        }
      }

    return (
        <>
            {!isConnected ? (
                <header className={styles.header}>
                    <div className={styles.logo}>
                        <a href="/" className={styles.navbar_logo_link}>TODO LIST</a>
                    </div>
                    <nav>
                        <ul className={styles.navbar_list}>
                            <li>
                            <button onClick={onClick} disabled={loading}>
                                {loading ? "Loading..." : label}
                            </button>
                            </li>
                        </ul>
                    </nav>              
                </header>
            ) : (
                <header className={styles.header}>
                    <div className={styles.logo}>
                        <a href="/" className={styles.navbar_logo_link}>TODO LIST</a>
                    </div>
                    <nav>
                        <ul>
                            <li className={styles.navbar_list}>
                                <a href="/" className={styles.navbar_list_link}>DashBoard</a>
                                <button onClick={onClick} disabled={loading}>
                                    {loading ? "Loading..." : label}
                                </button>
                            </li>
                        </ul>
                    </nav>    
                </header>
            ) }
        </>
        
    )
}
    

