import { seedDatabase } from "@/actions/seed";

export async function GET() {
  try {
    await seedDatabase();
    return Response.json({ message: "database seeding" });
  } catch (error) {
    console.error(error);
    return Response.json({ message: "An Error" });
  }
}
