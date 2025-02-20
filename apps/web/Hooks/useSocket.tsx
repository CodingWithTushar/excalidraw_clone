import { useEffect, useState } from "react";
import { WS_URL } from "../app/config";

export function useSocket() {
    const [loading, setloading] = useState(true)
    const [socket, setsocket] = useState<WebSocket>()

    useEffect(() => {
      const ws = new WebSocket(`${WS_URL}?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIxNTYyYWIxNi1jYTE0LTRmY2YtOThkOC0zZjZkYTA2MjIwNWMiLCJpYXQiOjE3NDAwNDkzNzJ9.rrMMpHKX-tV3ocExshtdx2Dmmzgxr9dIRNn7BcmjYkg`)

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