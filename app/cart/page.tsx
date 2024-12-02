import Cart from "@/components/Cart";
import LayoutRegularPage from "@/components/ui/LayoutRegularPage";
import { cookies } from "next/headers";

export default async function CartPage() {
  const kookieStore = await cookies();
  const cookie = kookieStore.get("session")?.value;
  const isLogin = cookie !== undefined;

  return (
    <LayoutRegularPage isLogin={isLogin}>
      <Cart />
    </LayoutRegularPage>
  );
}
