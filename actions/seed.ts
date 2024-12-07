"use server";
import Product from "@/models/Product";
import connectToMongoDB from "@/lib/database";
import { PRODUCTS, DEFAUL_THEME_HOME } from "@/lib/data";
import HomeTheme from "@/models/HomeTheme";

export const seedDatabase = async () => {
  try {
    await connectToMongoDB();

    // Eliminar productos existentes
    await Product.deleteMany({});
    console.log("Products cleared");

    // Insertar nuevos productos
    await Product.insertMany(PRODUCTS);

    await HomeTheme.deleteOne({});
    console.log("Home theme cleared");

    await HomeTheme.build(DEFAUL_THEME_HOME).save();

    console.log("Products seeded");
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    }
    console.log("Database seeding completed");
  }
};
