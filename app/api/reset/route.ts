import { resetHomePageThemeAction } from "@/actions/custom";
import { type NextRequest } from "next/server";

import { extractIdFromUrl } from "@/utils/image";

export async function GET(req: NextRequest) {
  // const id = req.query as string;
  const searchParams = req.nextUrl.searchParams;
  const imageId = searchParams.get("id");

  try {
    const { success, message } = await resetHomePageThemeAction(imageId || "");

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
