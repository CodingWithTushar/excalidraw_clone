"use client";

import { useEffect, useState } from "react";
import { useSocket } from "../../Hooks/useSocket";

export function ChatRoomClient({
  messages,
  id,
}: {
  messages: { message: string }[];
  id: string;
}) {
    const [currentmessage, setcurrentmessage] = useState("")
    const [chats, setchats] = useState(messages)
  const { socket, loading } = useSocket();

  useEffect(() => {

    socket?.send(JSON.stringify({
        type: "join_room",
        roomId: id
    }))

    if (socket && !loading) {
      socket.onmessage = (e) => {
        const parsedData = JSON.parse(e.data);

        if (parsedData.type === "chat") {
        
            setchats(c => [...c, {message:parsedData.message}])
        }
      };
    }
    return ()=> {
      socket?.close()
    }
  }, [socket, loading , id]);

  return <div>
    {
        chats.map(m => <div>{m.message}</div>)
    }
    <input type="text" value={currentmessage} onChange={e => {
        setcurrentmessage(e.target.value)
    }}  />

    <button onClick={() => {
        socket?.send(JSON.stringify({
            type: "chat",
            roomId: id,
            message: currentmessage
        }))

        setcurrentmessage("")
    }} >Send Message</button>
  </div>
}
