"use server";
import Product from "@/models/Product";
import connectToMongoDB from "@/lib/database";
import { PRODUCTS } from "@/lib/data";

export const seedDatabase = async () => {
  try {
    await connectToMongoDB();

    // Eliminar productos existentes
    await Product.deleteMany({});
    console.log("Products cleared");

    // Insertar nuevos productos
    await Product.insertMany(PRODUCTS);
    console.log("Products seeded");
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    }
    console.log("Database seeding completed");
  }
};
