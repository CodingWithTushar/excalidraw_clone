import express from "express";
import jwt from "jsonwebtoken";
import { Middleware } from "./middleware";
import { JWT_SECRET } from "@repo/backend_common/config";
import {
  CreateRoomSchema,
  CreateUserSchema,
  SignInSchema,
} from "@repo/common/types";

const App = express();
App.use(express.json());

const port = 3001;

App.post("/signup", async (req, res) => {
  const data = CreateUserSchema.safeParse(req.body);

  if (!data.success) {
    res.json({
      message: "Incorrect Inputs",
    });
    return;
  }

  res.json({
    userId: 123,
  });
});
App.post("/signin", (req, res) => {
  const data = SignInSchema.safeParse(req.body);

  if (!data.success) {
    res.json({
      message: "Incorrect Inputs",
    });
    return;
  }
  const userId = 9;

  const token = jwt.sign( 
    {
      userId,
    },
    JWT_SECRET
  );

  res.json({
    token: token,
  });
});
App.post("/room", Middleware, (req, res) => {
  const data = CreateRoomSchema.safeParse(req.body);

  if (!data.success) {
    res.json({
      message: "Incorrect Inputs",
    });
    return;
  }
  res.json({
    roomId: 123,
  });
});

App.listen(port, () => {
  console.log(`Server Is Running On ${port}`);
});
