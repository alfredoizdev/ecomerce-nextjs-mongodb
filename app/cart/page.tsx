import Cart from "@/components/Cart";
import LayoutRegularPage from "@/components/ui/LayoutRegularPage";
import { verifySession } from "@/utils/session";

export default async function CartPage() {
  const session = await verifySession();

  return (
    <LayoutRegularPage session={session}>
      <Cart />
    </LayoutRegularPage>
  );
}
