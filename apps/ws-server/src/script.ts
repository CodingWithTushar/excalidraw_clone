import { WebSocketServer } from "ws";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "@repo/backend_common/config";

const wss = new WebSocketServer({port:8080})


wss.on('connection' , (ws , request) => {

    const url = request.url;

    if (!url) {
        return;
    }

    const queryParams = new URLSearchParams(url.split('?')[1])
    const token = queryParams.get('tokens') || "";

    const decoded = jwt.verify(token,JWT_SECRET)

    if (typeof decoded == "string") {
        return;
    }

    if (!decoded || !decoded.userId) {
        ws.close();
        return
    } 

    ws.on('error' , console.error)

    ws.on('message' , function message(data) {
        console.log("Received Data" , data)
    })

    ws.send("SomeThing")
})