import { Tool } from "../components/Canvas";
import { GetExistingShapes } from "./HttpRequest";

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
    }
  | {
      type: "pencil";
      centerX: number;
      centerY: number;
      endX: number;
      endY: number;
    };

export class Game {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private ExistingShapes: ExistingShapeProps[];
  private roomId;
  private Clicked: boolean;
  private StartX = 0;
  private StartY = 0;
  private SelectedTool: Tool = "circle";
  
  socket:WebSocket

  constructor(canvas: HTMLCanvasElement, roomId: string, socket: WebSocket) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d")!;
    this.ExistingShapes = [];
    this.roomId = roomId;
    this.socket = socket;
    this.Clicked = false;
    this.init();
    this.initHandlers();
    this.initMouseHandlers();
  }

  destroy() {
    this.canvas.removeEventListener("mousedown", this.mouseDownHandler);

    this.canvas.removeEventListener("mouseup", this.mouseUpHandler);

    this.canvas.removeEventListener("mousemove", this.mouseMoveHandler);
  }

  setTool(tool: "pencil" | "rect" |"circle") {
    this.SelectedTool = tool;
  }

  async init() {
    this.ExistingShapes = await GetExistingShapes(this.roomId);
    this.ClearCanvas();
  }

  initHandlers() {
    this.socket.onmessage = (event) => {
      const message = JSON.parse(event.data);

      if (message.type == "chat") {
        const ParsedShape = JSON.parse(message.message);
        this.ExistingShapes.push(ParsedShape.Shape);
        this.ClearCanvas();
      }
    };
  }

  ClearCanvas() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.fillStyle = "#000000";
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    this.ExistingShapes.map((shape) => {
      if (shape.type === "rect") {
        this.ctx.strokeRect(shape.x, shape.y, shape.width, shape.height);
      } else if (shape.type === "circle") {
        this.ctx.beginPath();
        this.ctx.arc(
          shape.centerX,
          shape.centerY,
          Math.abs(shape.radius),
          0,
          Math.PI * 2
        );
        this.ctx.stroke();
        this.ctx.closePath();
      }
    });
  }

  mouseDownHandler = (e:any) => {
    this.Clicked = true;
    this.StartX = e.clientX;
    this.StartY = e.clientY;
  }
  mouseUpHandler = (e:any) => {
    this.Clicked = false;
    const width = e.clientX - this.StartX;
    const height = e.clientY - this.StartY;
    //@ts-ignore
    const SelectedTool = this.SelectedTool;

    let Shape: ExistingShapeProps | null = null;

    if (SelectedTool === "rect") {
      Shape = {
        //@ts-ignore
        type: "rect",
        x: this.StartX,
        y: this.StartY,
        height,
        width,
      };
    } else if (SelectedTool === "circle") {
      const radius = Math.max(width, height) / 2;
      const Shape: ExistingShapeProps = {
        type: "circle",
        radius: Math.max(width, height),
        centerX: this.StartX + radius,
        centerY: this.StartY + radius,
      };
    }
    if (!Shape) {
      return;
    }

    this.ExistingShapes.push(Shape);

    this.socket.send(
      JSON.stringify({
        type: "chat",
        message: JSON.stringify({
          Shape,
        }),
        roomId: Number(this.roomId),
      })
    );
  }
  mouseMoveHandler = (e:any) => {
    if (this.Clicked) {
      const width = e.clientX - this.StartX;
      const height = e.clientY - this.StartY;
      this.ClearCanvas();
      this.ctx.strokeStyle = "rgba(255,255,255)";
      //@ts-ignore
      const SelectedTool = this.SelectedTool;
      if (SelectedTool === "rect") {
        this.ctx.strokeRect(this.StartX, this.StartY, width, height);
      } else if (SelectedTool === "circle") {
        const centerX = this.StartX + width / 2;
        const centerY = this.StartY + height / 2;
        const radius = Math.max(width, height) / 2;
        this.ctx.beginPath();
        this.ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
        this.ctx.stroke();
        this.ctx.closePath();
      }
    }
  }

  initMouseHandlers() {
    this.canvas.addEventListener("mousedown", this.mouseDownHandler); 
    this.canvas.addEventListener("mouseup", this.mouseUpHandler);
    this.canvas.addEventListener("mousemove", this.mouseMoveHandler);
  }
}
