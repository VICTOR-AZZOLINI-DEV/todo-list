import axios from "axios";
import { useEffect, useState } from "react";
import type { User } from "@/interfaces";
import styles from "@/styles/DashBoard.module.css"

export default function Dashboard() {  
  const [user, setUser] = useState<User>({ID_USER: 0,WALLET_ADDRESS: "", NICKNAME: ""});

  useEffect(() => {
    axios
      .get<User>("http://localhost:3000/api/user/teste123")
      .then((response) => {
        if (response.data) {
          setUser(response.data);
          console.log(response.data);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
        <main className={styles.dashboard}>
            <div className={styles.dashboard_tasks}>
            </div>
            <aside className={styles.dashboard_user_menu}>
                <h2>{user.NICKNAME}</h2>
            </aside>    
        </main> 
    </>
  );
}