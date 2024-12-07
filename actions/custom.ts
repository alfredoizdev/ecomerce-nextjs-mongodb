"use server";

import { THEME_DEFAULT } from "@/constants/theme";
import cloudinary from "@/lib/cloudinary";
import connectToMongoDB from "@/lib/database";
import { FormStateHomeTheme, HomeThemeFormSchema } from "@/lib/definitions";
import HomeTheme from "@/models/HomeTheme";
import { revalidatePath } from "next/cache";

type DTOTheme = {
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
  footerBackgroundColor: string;
  footerColorTitle: string;
  footerColorText: string;
  navbarColor: string;
  navbarTextColor: string;
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
      footerBackgroundColor: theme.footer.backgroundColor,
      footerColorTitle: theme.footer.footerColorTitle,
      footerColorText: theme.footer.color,
      navbarColor: theme.navbar.navbarColor,
      navbarTextColor: theme.navbar.navbarTextColor,
    },
  };
};

export const updateHomePageThemeAction = async (
  state: FormStateHomeTheme,
  formData: FormData
): Promise<FormStateHomeTheme> => {
  const validatedFields = HomeThemeFormSchema.safeParse({
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
    footerBackgroundColor: formData.get("footerBackgroundColor"),
    footerColorTitle: formData.get("footerColorTitle"),
    footerColorText: formData.get("footerColorText"),
    navbarTextColor: formData.get("navbarTextColor"),
    navbarColor: formData.get("navbarColor"),
  });

  if (!validatedFields.success) {
    console.log(validatedFields.error.flatten().fieldErrors);
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const {
    background,
    text,
    backgroundBtn,
    textBtn,
    heroTitle,
    heroSubtitle,
    heroBannerImage,
    heroColorTitle,
    heroColorSubtitle,
    footerBackgroundColor,
    footerColorTitle,
    footerColorText,
    cardColor,
    navbarColor,
    navbarTextColor,
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
  theme.footer.backgroundColor = footerBackgroundColor || "";
  theme.footer.footerColorTitle = footerColorTitle || "";
  theme.footer.color = footerColorText || "";
  theme.navbar.navbarColor = navbarColor || "";
  theme.navbar.navbarTextColor = navbarTextColor || "";

  // Guardamos los cambios
  await theme.save();

  revalidatePath("/admin/custom", "page");

  return {
    success: true,
    message: "Theme updated successfully",
  };
};

export const resetHomePageThemeAction = async (
  imageId: string
): Promise<{
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

  if (imageId) {
    await cloudinary.api.delete_resources([imageId], {
      type: "upload",
      resource_type: "image",
    });
  }

  // Actualizamos las propiedades del tema
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
  theme.footer.backgroundColor = THEME_DEFAULT.footerBackgroundColor;
  theme.footer.footerColorTitle = THEME_DEFAULT.footerColorTitle;
  theme.footer.color = THEME_DEFAULT.footerColorText;
  theme.navbar.navbarColor = THEME_DEFAULT.navbarColor;
  theme.navbar.navbarTextColor = THEME_DEFAULT.navbarTextColor;

  // Guardamos los cambios
  await theme.save();

  revalidatePath("/admin/custom", "page");

  return {
    success: true,
    message: "Theme reset successfully",
  };
};
