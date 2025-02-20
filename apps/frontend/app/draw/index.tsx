import { HTTP_BACKEND } from "@/config";
import axios from "axios";

type ExistingShapeProps =
  | {
      type: "rect";
      x: number;
      y: number;
      width: number;
      height: number;
    }
  | {
      type: "circle";
      centerX: number;
      centerY: number;
      radius: number;
    };

export default async function InitDraw(
  canvas: HTMLCanvasElement,
  roomId: string,
  socket: WebSocket
) {
  const ctx = canvas.getContext("2d");

  let ExistingShapes: ExistingShapeProps[] = await GetExistingShapes(roomId);

  if (!ctx) {
    return;
  }

  socket.onmessage = (event) => {
    const message = JSON.parse(event.data);

    if (message.type == "chat") {
      const ParsedShape = JSON.parse(message.message);
      ExistingShapes.push(ParsedShape.Shape);
      ClearCanvas(ExistingShapes, canvas, ctx);
    }
  };

  ClearCanvas(ExistingShapes, canvas, ctx);
  let clicked = false;
  let StartX = 0;
  let StartY = 0;

  canvas.addEventListener("mousedown", (e) => {
    clicked = true;
    StartX = e.clientX;
    StartY = e.clientY;
  });
  
  canvas.addEventListener("mouseup", (e) => {
    clicked = false;
    const width = e.clientX - StartX;
    const height = e.clientY - StartY;
    const Shape : ExistingShapeProps = {
      type: "rect",
      x: StartX,
      y: StartY,
      height,
      width,
    }
    ExistingShapes.push(Shape);

    socket.send(JSON.stringify({
      type:"chat",
      message: JSON.stringify({
        Shape
      }),
      roomId: Number(roomId)
    })) 
  });

  canvas.addEventListener("mousemove", (e) => {
    if (clicked) {
      const width = e.clientX - StartX;
      const height = e.clientY - StartY;
      ClearCanvas(ExistingShapes, canvas, ctx);
      ctx.strokeStyle = "rgba(255,255,255)";
      ctx.strokeRect(StartX, StartY, width, height);
    }
  });
}

function ClearCanvas(
  ExistingShapes: ExistingShapeProps[],
  canvas: HTMLCanvasElement,
  ctx: CanvasRenderingContext2D
) {
  // Clear and reset canvas
  ctx.fillStyle = "#000000";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Set default drawing properties
  ctx.strokeStyle = "#ffffff";
  ctx.lineWidth = 2;
  ctx.fillStyle = "#ffffff";

  ExistingShapes.forEach((shape) => {
    if (shape.type === "rect") {
      ctx.strokeRect(shape.x, shape.y, shape.width, shape.height);
    } else if (shape.type === "circle") {
      ctx.beginPath();
      ctx.arc(shape.centerX, shape.centerY, shape.radius, 0, Math.PI * 2);
      ctx.stroke();
    }
  });
}

async function GetExistingShapes(roomId: string) {
 const response =  axios.get(`${HTTP_BACKEND}/chats/${roomId}`)
 const messages = (await response).data.messages;
 const ExistingShapeProps = messages.map((x: {message:string}) => {
  const messageData = JSON.parse(x.message)
  return messageData.Shape;
 })

 return ExistingShapeProps

}
 