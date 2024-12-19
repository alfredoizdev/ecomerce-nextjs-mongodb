import { z } from "zod";

export const GenderFormSchema = z.object({
  gender: z.string().min(3, { message: "Please enter gender" }),
});

export const categoryFormSchema = z.object({
  category: z.string().min(3, { message: "Please enter gender" }),
});

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
  publicImageId: z.string().optional(),
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

export const UpdateUserDetailFormSchema = z.object({
  phone: z
    .string()
    .min(10, { message: "Phone number must be at least 10 characters long." }),
  address: z
    .string()
    .min(10, { message: "Address must be at least 10 characters long." }),
  city: z
    .string()
    .min(2, { message: "City must be at least 2 characters long." }),
  state: z
    .string()
    .min(2, { message: "State must be at least 2 characters long." }),
  zipCode: z
    .string()
    .min(5, { message: "Zip code must be at least 5 characters long." }),
  country: z
    .string()
    .min(2, { message: "Country must be at least 2 characters long." }),
  id: z.string().optional(),
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
  discountPercentage: z.number().int().min(0).max(100),
  material: z.string().min(1, { message: "Please enter a material" }),
  sole: z.string().min(1, { message: "Please enter a sole" }),
  weight: z.string().min(1, { message: "Please enter a weight" }),
  colors: z.string().min(1, { message: "Please select a color" }),
  sizes: z.string().min(1, { message: "Please select a size" }),
  inStock: z.string().default("in").optional(),
  publicImageId: z.string().optional(),
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
  publicImageId: z.string().optional(),
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

export type FormUserDetailState =
  | {
      errors?: {
        phone?: string[];
        address?: string[];
        city?: string[];
        state?: string[];
        zipCode?: string[];
        country?: string[];
      };
      message?: string;
      success?: boolean;
      data?: {
        phone: string;
        address: string;
        city: string;
        state: string;
        zipCode: string;
        country: string;
        id?: string;
      };
    }
  | undefined;

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
        publicImageId?: string[];
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

export type FormStateGender =
  | {
      errors?: {
        gender?: string[];
      };
      message?: string;
      success?: boolean;
      data?: {
        name: string;
        id?: string;
      };
    }
  | undefined;

export type FormStateCategory =
  | {
      errors?: {
        category?: string[];
      };
      message?: string;
      success?: boolean;
      data?: {
        category: string;
        id?: string;
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
        weight?: string[];
        image?: string[];
        inStock?: string[];
        publicImageId?: string[];
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
        image?: string;
        publicImageId?: string;
        inStock: string;
      };
    }
  | undefined;
