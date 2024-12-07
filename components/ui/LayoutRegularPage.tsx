"use client";

import Footer from "../shared/Footer";
import MobileMenu from "../shared/MobileMenu";
import { Session } from "@/types/Session";
import SetTheme from "./SetTheme";
import { THEME_DEFAULT } from "@/constants/theme";

type Props = {
  children: React.ReactNode;
  session?: Session;
  theme?: {
    background?: string;
    footerBackgroundColor?: string;
    footerColorTitle?: string;
    footerColorText?: string;
  };
};

const LayoutRegularPage = ({ children, session, theme }: Props) => {
  return (
    <>
      <SetTheme />
      <main
        className="flex-grow "
        style={{
          background: `${theme?.background || THEME_DEFAULT.background}`,
        }}
      >
        {children}
      </main>
      <MobileMenu {...theme} session={session} />
      <Footer {...theme} />
    </>
  );
};

export default LayoutRegularPage;
