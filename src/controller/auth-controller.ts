import { Hono } from "hono";
import { RegisterUserRequest } from "../model/user-model";
import { AuthService } from "../service/auth-service";

export const authController = new Hono();

authController.post("/api/auth/register", async (c) => {
  const request = (await c.req.json()) as RegisterUserRequest;
  const response = await AuthService.register(request);
  c.status(200)
  return c.json({
    data: response,
  });
});
