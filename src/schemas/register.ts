import { z } from "zod";

export const registerSchema = z.object({
  username: z
    .string()
    .min(3, "ユーザー名は3文字以上です")
    .max(20, "ユーザー名は20文字以内です"),

  email: z.email("メールアドレスを入力してください"),

  password: z
    .string()
    .min(8, "パスワードは8文字以上です"),
});

export type RegisterInput = z.infer<typeof registerSchema>;