import { z } from "zod";

export const formSchema = z.object({
  user_id: z
    .number()
    .int()
    .positive({ message: "Company ID must be a positive number." }),
  title: z.string().min(2, { message: "Title must be at least 2 characters." }),
  question: z
    .string()
    .min(5, { message: "Question must be at least 5 characters." }),
  option_a: z.string().min(1, { message: "Option A cannot be empty." }),
  option_b: z.string().min(1, { message: "Option B cannot be empty." }),
  option_c: z.string().min(1, { message: "Option C cannot be empty." }),
  option_d: z.string().min(1, { message: "Option D cannot be empty." }),
});
