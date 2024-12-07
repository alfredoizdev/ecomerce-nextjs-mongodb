import { getHomePageThemeaction } from "@/actions/custom";
import Cart from "@/components/Cart/Cart";
import LayoutRegularPage from "@/components/ui/LayoutRegularPage";
import { getSession } from "@/utils/session";

export default async function CartPage() {
  const session = await getSession();
  const { data } = await getHomePageThemeaction();

  console.log(data);

  return (
    <LayoutRegularPage theme={data} session={session}>
      <Cart theme={data} session={session} />
    </LayoutRegularPage>
  );
}
