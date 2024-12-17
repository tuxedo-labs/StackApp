import { z, ZodType } from "zod";

export class UserValidation {
  static readonly TOKEN: ZodType = z.string().min(1)
}
