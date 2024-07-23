import z from "zod";

const userValidator = z.object({
  name: z
    .string({
      message: "Name must be string",
    })
    .min(8, "Name must be at least 8 characters"),
  email: z
    .string({
      message: "Email must be string",
    })
    .email("Email is invalid"),
});

export default userValidator;
