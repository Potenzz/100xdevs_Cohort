const z = require('zod');

const userSignUpSchema = z.object({
  first_name: z.string()
    .max(60, "First name must be at most 60 characters")
    .nonempty("First name is required"),
  
  last_name: z.string()
    .max(60, "Last name must be at most 60 characters")
    .nonempty("Last name is required"),
  
  username: z.string()
    .min(3, "Username must be at least 3 characters")
    .max(30, "Username must be at most 30 characters")
    .regex(/^[a-zA-Z0-9_]+$/, "Username can only contain letters, numbers, and underscores"),
  
  password: z.string()
    .min(8, "Password must be at least 8 characters long")
    .max(64, "Password must be at most 64 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one digit")
    .regex(/[\W_]/, "Password must contain at least one special character"),
});

const userUpateSchema = z.object({
  first_name: z.string()
    .max(60, "First name must be at most 60 characters")
    .optional(),
  
  last_name: z.string()
    .max(60, "Last name must be at most 60 characters")
    .optional(),
 
  username: z.string()
    .min(3, "Username must be at least 3 characters")
    .max(30, "Username must be at most 30 characters")
    .regex(/^[a-zA-Z0-9_]+$/, "Username can only contain letters, numbers, and underscores")
    .optional(),
  
  password: z.string()
    .min(8, "Password must be at least 8 characters long")
    .max(64, "Password must be at most 64 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one digit")
    .regex(/[\W_]/, "Password must contain at least one special character")
    .optional(),
});

module.exports = {
    userSignUpSchema
}
