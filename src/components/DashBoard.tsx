import axios from "axios";
import { useEffect, useState } from "react";
import type { User } from "@/interfaces";
import styles from "@/styles/DashBoard.module.css"
import avatar from "../../public/avatar.png"

export default function Dashboard() {  
  const [user, setUser] = useState<User>({ID_USER: 0,WALLET_ADDRESS: "", NICKNAME: ""});

  useEffect(() => {
    axios
      .get<User>("http://localhost:3000/api/user/teste123")
      .then((response) => {
          setUser(response.data);
          console.log(response.data); 
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
        <main className={styles.dashboard}>
            <div className={styles.dashboard_tasks}>
              <h2>Tasks</h2>
            </div>
            <aside className={styles.dashboard_user_menu}>
                <div className={styles.dashboard_user_menu_avatar}>
                </div>
                <h3>{user.NICKNAME}</h3>
            </aside>    
        </main> 
    </>
  );
}