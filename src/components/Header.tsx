import styles from "@/styles/Header.module.css"
import { useState } from "react"

export default function Header() {
    const [connectWallet, setConnectWallet] = useState(false)

    function whenConnectWallet() {
        setConnectWallet(!connectWallet)
    }

    return (
        <>
            {connectWallet ? (
                <header className={styles.header}>
                    <div className={styles.logo}>
                        <a href="/" className={styles.navbar_logo_link}>TODO LIST</a>
                    </div>
                    <nav>
                        <ul className={styles.navbar_list}>
                            <li>
                                <button 
                                    className={styles.navbar_list_button}
                                    onClick={whenConnectWallet}
                                >
                                Conectar Carteira
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
                                <button
                                    onClick={whenConnectWallet} 
                                    className={styles.navbar_list_button}
                                >
                                    Desconectar Carteira
                                </button>
                            </li>
                        </ul>
                    </nav>    
                </header>
            ) }
        </>
        
    )
}
    
    

