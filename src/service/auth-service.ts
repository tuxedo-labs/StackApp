import { prismaClient } from "../application/database";
import {
  RegisterUserRequest,
  toUserResponse,
  UserResponse,
} from "../model/user-model";
import { AuthValidation } from "../validation/auth-validation";
import { HTTPException } from "hono/http-exception";

export class AuthService {
  static async register(request: RegisterUserRequest): Promise<UserResponse> {
    request = AuthValidation.REGISTER.parse(request);
    const usernameCheck = await prismaClient.user.count({
      where: {
        username: request.username,
      },
    });
    if (usernameCheck != 0) {
      throw new HTTPException(400, {
        message: "Username already exists",
      });
    }

    request.password = await Bun.password.hash(request.password, {
      algorithm: "bcrypt",
      cost: 5,
    });

    const user = await prismaClient.user.create({
      data: request,
    });
    return toUserResponse(user);
  }
}
