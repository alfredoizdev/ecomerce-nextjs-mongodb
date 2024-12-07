"use client";

import Footer from "../shared/Footer";
import MobileMenu from "../shared/MobileMenu";
import { Session } from "@/types/Session";
import SetTheme from "./SetTheme";
import { THEME_DEFAULT } from "@/constants/theme";

type Props = {
  children: React.ReactNode;
  session?: Session;
  background?: string;
};

const LayoutRegularPage = ({ children, session, background }: Props) => {
  return (
    <>
      <SetTheme />
      <main
        className="flex-grow "
        style={{
          background: `${background || THEME_DEFAULT.background}`,
        }}
      >
        {children}
      </main>
      <MobileMenu session={session} />
      <Footer />
    </>
  );
};

export default LayoutRegularPage;
