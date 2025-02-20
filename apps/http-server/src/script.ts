import express from "express";
import jwt from "jsonwebtoken";
import { Middleware } from "./middleware";
import { JWT_SECRET } from "@repo/backend_common/config";
import {
  CreateRoomSchema,
  CreateUserSchema,
  SignInSchema,
} from "@repo/common/types";
import cors from "cors";
import { prismaClient } from "@repo/db/client";

const App = express();
App.use(express.json());
App.use(cors())

const port = 3001;

App.post("/signup", async (req, res) => {
  const parsedData = CreateUserSchema.safeParse(req.body);

  if (!parsedData.success) {
    res.json({
      message: "Incorrect Inputs",
    });
    return;
  }

  try {
    const user = await prismaClient.user.create({
      data: {
        email: parsedData.data.email,
        password: parsedData.data.password,
        username: parsedData.data.username,
      },
    });
    res.json({
      userId: user.id,
    });
  } catch (e) {
    res.status(411).json({
      message: "User Already Exists With This UserName",
    });
  }
});
App.post("/signin", async (req, res) => {
  const ParsedData = SignInSchema.safeParse(req.body);

  if (!ParsedData.success) {
    res.json({
      message: "Incorrect Inputs",
    });
    return;
  }

  const user = await prismaClient.user.findFirst({
    where: {
      username: ParsedData.data.username,
      password: ParsedData.data.password,
    },
  });

  if (!user) {
    res.status(403).json({
      message: "Unauthorized",
    });
    return;
  }

  const token = jwt.sign(
    {
      userId: user?.id,
    },
    JWT_SECRET
  );

  res.json({
    token: token,
  });
});
App.post("/room", Middleware, async (req, res) => {
  const ParsedData = CreateRoomSchema.safeParse(req.body);

  if (!ParsedData.success) {
    res.json({
      message: "Incorrect Inputs",
    });
    return;
  }

  try {
    //@ts-ignore
    const userId = req.userId;

    const room = await prismaClient.room.create({
      data: {
        slug: ParsedData.data.name,
        adminId: userId,
      },
    });

    res.json({
      roomId: room.id,
    });
  } catch (e) {
    res.status(411).json({
      message: "Room Already ExistsWIth This Name",
    });
  }
});

App.get("/chats/:roomId", async (req, res) => {
  try {
    const roomId = Number(req.params.roomId);

    const messages = await prismaClient.chat.findMany({
      where: {
        roomId: roomId,
      },
      orderBy: {
        id: "desc",
      },
      take: 50,
    });
    res.json({
      messages,
    });
  } catch (error) {
    console.error;
    res.json({
      messages: [],
    });
  }
});

App.get("/room/:slug", async (req, res) => {
  const slug = req.params.slug;

  const room = await prismaClient.room.findFirst({
    where: {
      slug,
    },
  });
  res.json({
    room,
  });
});

App.listen(port, () => {
  console.log(`Server Is Running On ${port}`);
});
