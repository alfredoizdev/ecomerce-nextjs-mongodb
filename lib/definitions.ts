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
  role: z.string().optional(),
  avatar: z.string().optional(),
  id: z.string().optional(),
});

export const UpdateUserFormSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Name must be at least 2 characters long." })
    .trim(),
  email: z.string().email({ message: "Please enter a valid email." }).trim(),
  avatar: z.string().optional(),
  id: z.string().optional(),
  publicImageId: z.string().optional(),
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

export const HomeThemeFormSchema = z.object({
  background: z.string().min(1, { message: "Please enter a background color" }),
  text: z.string().min(1, { message: "Please enter a text color" }),
  backgroundBtn: z.string().min(1, { message: "Please enter a button color" }),
  textBtn: z.string().min(1, { message: "Please enter a button text color" }),
  heroTitle: z.string().min(1, { message: "Please enter a title" }),
  heroSubtitle: z.string().min(1, { message: "Please enter a subtitle" }),
  cardColor: z.string().min(1, { message: "Please enter a card color" }),
  heroColorTitle: z
    .string()
    .min(1, { message: "Please enter a title for Hero color" }),
  heroColorSubtitle: z
    .string()
    .min(1, { message: "Please enter a subtitle for Hero color" }),
  heroBannerImage: z.string().optional(),
  id: z.string().optional(),
  footerBackgroundColor: z
    .string()
    .min(1, { message: "Please enter a footer backgrond color" }),
  footerColorTitle: z
    .string()
    .min(1, { message: "Please enter a color for footer title" }),
  footerColorText: z
    .string()
    .min(1, { message: "Please enter a color for footer text" }),
  navbarColor: z.string().min(1, { message: "Please enter a navbar color" }),
  navbarTextColor: z
    .string()
    .min(1, { message: "Please enter a navbar text color" }),
});

export type FormState =
  | {
      errors?: {
        name?: string[];
        email?: string[];
        password?: string[];
        role?: string[];
        avatar?: string[];
        publicImageId?: string[];
      };
      message?: string;
      success?: boolean;
    }
  | undefined;

export type SessionPayload = {
  userId: string | number;
  expiresAt: Date;
  role: string;
  name: string;
  email: string;
};

export type FormStateHomeTheme =
  | {
      errors?: {
        id?: string[];
        background?: string[];
        text?: string[];
        backgroundBtn?: string[];
        textBtn?: string[];
        heroTitle?: string[];
        heroSubtitle?: string[];
        heroBannerImage?: string[];
        heroColorTitle?: string[];
        heroColorSubtitle?: string[];
        cardColor?: string[];
        footerBackgroundColor?: string[];
        footerColorTitle?: string[];
        footerColorText?: string[];
        navbarColor?: string[];
        navbarTextColor?: string[];
      };
      message?: string;
      success?: boolean;
      data?: {
        id?: string;
        background: string;
        text: string;
        cardColor: string;
        button: {
          background: string;
          text: string;
        };
        hero: {
          title: string;
          subtitle: string;
          bannerImage: string;
          heroColorTitle: string;
          heroColorSubtitle: string;
        };
        footer: {
          footerColorTitle: string;
          backgroundColor: string;
          footerColorText: string;
        };
        navbar: {
          navbarColor: string;
          navbarTextColor: string;
        };
      };
    }
  | undefined;

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
