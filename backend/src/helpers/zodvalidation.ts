import { z } from "zod";

export const registerSchema = z.object({
  restaurantName: z
    .string()
    .min(3, "Restaurant name must be at least 3 characters")
    .max(50, "Restaurant name must be less than 50 characters")
    .regex(
      /^[a-zA-Z0-9 ]+$/,
      "Restaurant name can only contain letters, numbers, and spaces"
    ),

  email: z
    .string()
    .email("Invalid email format")
    .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Invalid email format"),

  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/(?=.*[a-z])/, "Password must contain at least one lowercase letter")
    .regex(/(?=.*[A-Z])/, "Password must contain at least one uppercase letter")
    .regex(/(?=.*\d)/, "Password must contain at least one number")
    .regex(
      /(?=.*[@$!%*?&])/,
      "Password must contain at least one special character"
    ),
  role: z.enum(
    ["admin", "superadmin"],
    "Role must be either 'admin' or 'superadmin'"
  ),
});

export const loginSchema = z.object({
  email: z
    .string()
    .email("Invalid email format")
    .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Invalid email format"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/(?=.*[a-z])/, "Password must contain at least one lowercase letter")
    .regex(/(?=.*[A-Z])/, "Password must contain at least one uppercase letter")
    .regex(/(?=.*\d)/, "Password must contain at least one number")
    .regex(
      /(?=.*[@$!%*?&])/,
      "Password must contain at least one special character"
    ),
});

export const userregisterSchema = z.object({
  name: z
    .string()
    .min(3, "Name must be at least 3 characters")
    .max(50, "Name must be less than 50 characters")
    .regex(
      /^[A-Za-z0-9 ]+$/,
      "Name can only contain letters, numbers, and spaces"
    ),
  email: z
    .string()
    .email("Invalid email format")
    .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Invalid email format"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/(?=.*[a-z])/, "Password must contain at least one lowercase letter")
    .regex(/(?=.*[A-Z])/, "Password must contain at least one uppercase letter")
    .regex(/(?=.*\d)/, "Password must contain at least one number")
    .regex(
      /(?=.*[@$!%*?&])/,
      "Password must contain at least one special character"
    ),
});


export const userloginSchema = z.object({
  email: z
    .string()
    .email("Invalid email format")
    .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Invalid email format"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/(?=.*[a-z])/, "Password must contain at least one lowercase letter")
    .regex(/(?=.*[A-Z])/, "Password must contain at least one uppercase letter")
    .regex(/(?=.*\d)/, "Password must contain at least one number")
    .regex(
      /(?=.*[@$!%*?&])/,
      "Password must contain at least one special character"
    ),
});
