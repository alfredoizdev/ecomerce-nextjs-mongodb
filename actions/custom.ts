"use server";

import { THEME_DEFAULT } from "@/constants/theme";
import connectToMongoDB from "@/lib/database";
import { FormStateHomeTheme, HomeThemeFormSchema } from "@/lib/definitions";
import HomeTheme from "@/models/HomeTheme";
import { revalidatePath } from "next/cache";

type DTOTheme = {
  primary: string;
  secondary: string;
  background: string;
  text: string;
  backgroundBtn: string;
  textBtn: string;
  heroTitle: string;
  heroSubtitle: string;
  heroBannerImage: string;
  heroColorTitle: string;
  heroColorSubtitle: string;
  cardColor: string;
};

export const getHomePageThemeaction = async (): Promise<{
  success: boolean;
  message?: string;
  data?: DTOTheme;
}> => {
  await connectToMongoDB();

  const theme = await HomeTheme.findOne({}).exec();

  if (!theme) {
    return {
      success: false,
      message: "Theme not found",
      data: undefined,
    };
  }

  return {
    success: true,
    message: "",
    data: {
      primary: theme.colors.primary,
      secondary: theme.colors.secondary,
      background: theme.colors.background,
      text: theme.colors.text,
      backgroundBtn: theme.colors.button.background,
      textBtn: theme.colors.button.text,
      heroTitle: theme.hero.title,
      heroSubtitle: theme.hero.subtitle,
      heroBannerImage: theme.hero.bannerImage,
      heroColorSubtitle: theme.hero.heroColorSubtitle,
      heroColorTitle: theme.hero.heroColorTitle,
      cardColor: theme.colors.cardColor,
    },
  };
};

export const updateHomePageThemeAction = async (
  state: FormStateHomeTheme,
  formData: FormData
): Promise<FormStateHomeTheme> => {
  const validatedFields = HomeThemeFormSchema.safeParse({
    primary: formData.get("primary"),
    secondary: formData.get("secondary"),
    background: formData.get("background"),
    text: formData.get("text"),
    backgroundBtn: formData.get("backgroundBtn"),
    textBtn: formData.get("textBtn"),
    heroTitle: formData.get("heroTitle"),
    heroSubtitle: formData.get("heroSubtitle"),
    heroBannerImage: formData.get("heroBannerImage"),
    heroColorTitle: formData.get("heroColorTitle"),
    heroColorSubtitle: formData.get("heroColorSubtitle"),
    cardColor: formData.get("cardColor"),
  });

  if (!validatedFields.success) {
    console.log(validatedFields.error.flatten().fieldErrors);
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const {
    primary,
    secondary,
    background,
    text,
    backgroundBtn,
    textBtn,
    heroTitle,
    heroSubtitle,
    heroBannerImage,
    heroColorTitle,
    heroColorSubtitle,
    cardColor,
  } = validatedFields.data;

  await connectToMongoDB();

  // Usamos findOne para obtener un único tema
  const theme = await HomeTheme.findOne({}).exec();

  if (!theme) {
    return {
      success: false,
      message: "Theme not found",
    };
  }

  // Actualizamos las propiedades del tema
  theme.colors.primary = primary;
  theme.colors.secondary = secondary;
  theme.colors.background = background;
  theme.colors.text = text;
  theme.colors.button.background = backgroundBtn;
  theme.colors.button.text = textBtn;
  theme.hero.title = heroTitle;
  theme.hero.subtitle = heroSubtitle;
  theme.hero.bannerImage = heroBannerImage || "";
  theme.hero.heroColorTitle = heroColorTitle;
  theme.hero.heroColorSubtitle = heroColorSubtitle;
  theme.colors.cardColor = cardColor;

  // Guardamos los cambios
  await theme.save();

  revalidatePath("/admin/custom", "page");

  return {
    success: true,
    message: "Theme updated successfully",
  };
};

export const resetHomePageThemeAction = async (): Promise<{
  success: boolean;
  message?: string;
}> => {
  await connectToMongoDB();

  // Usamos findOne para obtener un único tema
  const theme = await HomeTheme.findOne({}).exec();

  if (!theme) {
    return {
      success: false,
      message: "Theme not found",
    };
  }

  // Actualizamos las propiedades del tema
  theme.colors.primary = THEME_DEFAULT.primary;
  theme.colors.secondary = THEME_DEFAULT.secondary;
  theme.colors.background = THEME_DEFAULT.background;
  theme.colors.text = THEME_DEFAULT.text;
  theme.colors.button.background = THEME_DEFAULT.backgroundBtn;
  theme.colors.button.text = THEME_DEFAULT.textBtn;
  theme.hero.title = "Your favorite shoe store";
  theme.hero.subtitle = "The best shoes in the world";
  theme.hero.bannerImage = THEME_DEFAULT.heroBannerImage;
  theme.hero.heroColorTitle = THEME_DEFAULT.heroColorTitle;
  theme.hero.heroColorSubtitle = THEME_DEFAULT.heroColorSubtitle;
  theme.colors.cardColor = THEME_DEFAULT.cardColor;

  // Guardamos los cambios
  await theme.save();

  revalidatePath("/admin/custom", "page");

  return {
    success: true,
    message: "Theme reset successfully",
  };
};
