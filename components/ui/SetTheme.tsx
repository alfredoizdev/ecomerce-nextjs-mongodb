"use client";

import { getHomePageThemeaction } from "@/actions/custom";
import useUiStore from "@/store/useUiStore";
import { useEffect } from "react";

const SetTheme = () => {
  const { setHomeTheme } = useUiStore((state) => state);

  useEffect(() => {
    const getTheme = async () => {
      const { data } = await getHomePageThemeaction();
      if (!data) return;
      setHomeTheme(data);
    };

    getTheme();
  }, [setHomeTheme]);

  return <div></div>;
};

export default SetTheme;
