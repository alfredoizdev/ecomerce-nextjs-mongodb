import Footer from "../shared/Footer";
import MobileMenu from "../shared/MobileMenu";

type Props = {
  children: React.ReactNode;
  isLogin?: boolean;
};

const LayoutRegularPage = async ({ children, isLogin }: Props) => {
  return (
    <>
      {children}
      <MobileMenu isLogin={isLogin} />
      <Footer />
    </>
  );
};

export default LayoutRegularPage;
