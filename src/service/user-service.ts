import { HTTPException } from "hono/http-exception";
import { prismaClient } from "../application/database";
import { UserValidation } from "../validation/user-validation";
import { User } from "@prisma/client";

export class UserService {
  static async get(token: string | undefined | null): Promise<User> {
    token = UserValidation.TOKEN.parse(token);
    const user = await prismaClient.user.findFirst({
      where: {
        token: token,
      },
    });
    if (!user) {
      throw new HTTPException(401, {
        message: "Unauthorized",
      });
    }
    return user;
  }
}
