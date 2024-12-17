import { Hono } from "hono";
import { authController } from "./controller/auth-controller";
import { HTTPException } from "hono/http-exception";
import { ZodError } from "zod";
import { userController } from "./controller/user-controller";

const app = new Hono();

app.route("/api/auth", authController);
app.route("/api/users", userController)

// init zod validation
app.onError(async (err, c) => {
  if (err instanceof HTTPException) {
    c.status(err.status);
    return c.json({
      errors: [{ message: err.message }],
    });
  } else if (err instanceof ZodError) {
    c.status(400);
    return c.json({
      errors: err.errors, // Kirim langsung array errors dari Zod
    });
  } else {
    c.status(500);
    return c.json({
      errors: [{ message: err.message }],
    });
  }
});

export default app;
