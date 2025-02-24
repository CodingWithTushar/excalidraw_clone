import { HTTP_BACKEND } from "@/config";
import axios from "axios";

export async function GetExistingShapes(roomId: string) {
    const response = axios.get(`${HTTP_BACKEND}/chats/${roomId}`);
    const messages = (await response).data.messages;
    const ExistingShapeProps = messages.map((x: { message: string }) => {
      const messageData = JSON.parse(x.message);
      return messageData.Shape;
    });
  
    return ExistingShapeProps;
  }