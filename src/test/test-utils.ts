import { prismaClient } from "../application/database";

export class AuthTest {
  static async create() {
    const password = await Bun.password.hash("example", {
      algorithm: "bcrypt",
      cost: 5,
    });
    try {
      await prismaClient.user.create({
        data: {
          username: "example",
          password: password,
          name: "example",
        },
      });
      console.log("User created successfully");
    } catch (error) {
      console.error("Error creating user:", error);
    }
  }

  static async delete() {
    try {
      const user = await prismaClient.user.findUnique({
        where: { username: "example" },
      });

      if (!user) {
        console.log("User not found, nothing to delete.");
        return;
      }

      await prismaClient.user.delete({
        where: { username: "example" },
      });
      console.log("User deleted successfully");
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  }
}
