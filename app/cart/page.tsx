import Cart from "@/components/Cart/Cart";
import LayoutRegularPage from "@/components/ui/LayoutRegularPage";
import { getSession } from "@/utils/session";

export default async function CartPage() {
  const session = await getSession();

  return (
    <LayoutRegularPage session={session}>
      <Cart />
    </LayoutRegularPage>
  );
}
