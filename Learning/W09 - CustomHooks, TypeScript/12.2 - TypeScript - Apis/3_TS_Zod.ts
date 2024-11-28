import { z } from "zod";

const UserSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string().email(),
  age: z.number().min(18).max(100),
  isActive: z.boolean(),
});

// Use `z.infer` to derive the TypeScript type from the schema
type User = z.infer<typeof UserSchema>;

const createUser = (user: User): void => {
  console.log("User created:", user);
};


// Basically, we get the type of schema with infer ability. No need to define type again.