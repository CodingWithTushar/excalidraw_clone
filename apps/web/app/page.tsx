//Beacuse we are state management here
"use client";
import { useState } from "react"; 
import styles from "./page.module.css";
import { useRouter } from "next/navigation";

export default function Home() {
  const [roomId, setroomId] = useState("");

  const router = useRouter()
  return (
    <div className={styles.page}>
      <input
        value={roomId}
        onChange={(e) => {
          setroomId(e.target.value);
        }}
        type="text"
        placeholder="RoomId"
        style={{ fontSize: 50, padding: 10 }}
      />
      <button style={{fontSize: 30,
        fontWeight: 700
      }} onClick={()=>{
router.push(`/chats/${roomId}`)
      }}>Join Room</button>
    </div>
  );
}
