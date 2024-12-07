import { resetHomePageThemeAction } from "@/actions/custom";

export async function GET() {
  try {
    const { success, message } = await resetHomePageThemeAction();

    if (!success) {
      return Response.json({ message, success });
    }
    return Response.json({ message, success });
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    }
    return Response.json({ message: "An Error", success: false });
  }
}
