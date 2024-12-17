import { Hono } from "hono";
import { UserService } from "../service/user-service";
import { ApplicationVariables } from "../model/app-model";
import { User } from "@prisma/client";
import { toUserResponse } from "../model/user-model";

export const userController = new Hono<{ Variables: ApplicationVariables }>();

userController.use(async (c, next) => {
  const token = c.req.header("Authorization");

  const user = await UserService.get(token);

  c.set("user", user);

  await next();
});

userController.get("/current", async (c) => {
  const user = c.get("user") as User;
  return c.json({
    data: toUserResponse(user),
  });
});
