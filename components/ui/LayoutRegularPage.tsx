import { cookies } from "next/headers";
import Footer from "../shared/Footer";
import MobileMenu from "../shared/MobileMenu";

type Props = {
  children: React.ReactNode;
};

const LayoutRegularPage = async ({ children }: Props) => {
  const kookieStore = await cookies();
  const cookie = kookieStore.get("session")?.value;
  const isLogin = cookie !== undefined;

  return (
    <>
      {children}
      <MobileMenu isLogin={isLogin} />
      <Footer />
    </>
  );
};

export default LayoutRegularPage;
