import { prismaClient } from "../application/database";

export class AuthTest {
  static async delete(){
    await prismaClient.user.delete({
      where: {
        username: "example"
      }
    })
  }
}
