import Footer from "../shared/Footer";
import MobileMenu from "../shared/MobileMenu";
import { Session } from "@/types/Session";

type Props = {
  children: React.ReactNode;
  session?: Session;
};

const LayoutRegularPage = async ({ children, session }: Props) => {
  return (
    <>
      {children}
      <MobileMenu session={session} />
      <Footer />
    </>
  );
};

export default LayoutRegularPage;
