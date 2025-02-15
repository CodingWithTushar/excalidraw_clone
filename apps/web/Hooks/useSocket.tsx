import { useEffect, useState } from "react";
import { WS_URL } from "../app/config";

export function useSocket() {
    const [loading, setloading] = useState(true)
    const [socket, setsocket] = useState<WebSocket>()

    useEffect(() => {
      const ws = new WebSocket(`${WS_URL}?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI5ZDc4MDU4Zi0wMTRiLTQxYjAtYjU2MS0wNTY1ZjY0MWUzMDUiLCJpYXQiOjE3Mzk1MjkzNDN9.N_5KttKBR5gr3uP38IVTT3ilmSjLMYfQVFA4WnPZsvo`)

      ws.onopen = () => {
        setloading(false);
        setsocket(ws)
      }
    }, [])

    return {
        socket,
        loading
    }
    
}