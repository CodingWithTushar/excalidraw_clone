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

  let ExistingShapes: ExistingShapeProps[] = [];

  if (!ctx) {
    return;
  }

  socket.onmessage = (event) => {
    const message = JSON.parse(event.data);

    if (message.type == "chat") {
      const ParsedShape = JSON.parse(message.message);
      ExistingShapes.push(ParsedShape);
      ClearCanvas(ExistingShapes, canvas, ctx);
    }
  };

  ctx.fillStyle = "rgb(0,0,0)";
  ctx.fillRect(0, 0, canvas.height, canvas.width);

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
      })
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
  ctx.clearRect(0, 0, canvas.width , canvas.height);
  ctx.fillStyle = "rgba(0 ,0 ,0)";
  ctx.fillRect(0, 0, canvas.width , canvas.height);

  ExistingShapes.map((ExistingShapeProps) => {
    if (ExistingShapeProps.type === "rect") {
      ctx.strokeStyle = "rbga(255,255,255)";
      ctx.strokeRect(ExistingShapeProps.x , ExistingShapeProps.y,ExistingShapeProps.width,ExistingShapeProps.height)
    } else if (ExistingShapeProps.type === "circle") {
      ctx.beginPath();
      ctx.arc(ExistingShapeProps.centerX,ExistingShapeProps.centerY, ExistingShapeProps.radius, 0, Math.PI * 2);
      ctx.stroke();
      ctx.closePath();                
  }
  });
}


