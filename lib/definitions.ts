import { z } from "zod";

export const SignupFormSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Name must be at least 2 characters long." })
    .trim(),
  email: z.string().email({ message: "Please enter a valid email." }).trim(),
  password: z
    .string()
    .min(8, { message: "Be at least 8 characters long" })
    .regex(/[a-zA-Z]/, { message: "Contain at least one letter." })
    .regex(/[0-9]/, { message: "Contain at least one number." })
    .regex(/[^a-zA-Z0-9]/, {
      message: "Contain at least one special character.",
    })
    .trim(),
});

export const LoginFormSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email." }),
  password: z.string().min(1, { message: "Password field must not be empty." }),
});

export const ProductFormSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Name must be at least 2 characters long." }),
  description: z
    .string()
    .min(10, { message: "Description must be at least 10 characters long." }),
  price: z.number().min(0.01, { message: "Price must be at least $0.01." }),
  category: z.string().min(1, { message: "Please select a category" }),
  gender: z.string().min(1, { message: "Please enter a gender" }),
  discountPercentage: z.number().int().min(0).max(100),
  material: z.string().min(1, { message: "Please enter a material" }),
  sole: z.string().min(1, { message: "Please enter a sole" }),
  weight: z.string().min(1, { message: "Please enter a weight" }),
  colors: z.string().min(1, { message: "Please select a color" }),
  sizes: z.string().min(1, { message: "Please select a size" }),
  inStock: z.string().default("in").optional(),
  id: z.string().optional(),
});

export type FormState =
  | {
      errors?: {
        name?: string[];
        email?: string[];
        password?: string[];
      };
      message?: string;
    }
  | undefined;

export type SessionPayload = {
  userId: string | number;
  expiresAt: Date;
  role: string;
  name: string;
};

export type FormStateProduct =
  | {
      errors?: {
        id?: string[];
        name?: string[];
        description?: string[];
        price?: string[];
        category?: string[];
        discountPercentage?: string[];
        material?: string[];
        sole?: string[];
        colors?: string[];
        sizes?: string[];
        gender?: string[];
        weight?: string[];
        image?: string[];
        inStock?: string[];
      };
      message?: string;
      success?: boolean;
      data?: {
        id?: string;
        name: string;
        description: string;
        price: number;
        category: string;
        discountPercentage: number;
        material: string;
        sole: string;
        colors: string;
        sizes: string;
        weight: string;
        gender: string;
        image?: string;
        inStock: string;
      };
    }
  | undefined;
