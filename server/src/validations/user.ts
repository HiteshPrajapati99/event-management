import { z } from "zod";

export const userSchema = z.object({
  email: z.string({ required_error: "Email is required" }).email(),
  password: z
    .string({ required_error: "Password is required" })
    .min(3, "Password requied more then 3 chr required"),
});

