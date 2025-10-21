import React, { createContext, useContext, useState, ReactNode } from "react";
import * as eva from "@eva-design/eva";
import { ThemeType as EvaThemeType } from "@ui-kitten/components";
import { darkTheme } from "./dark";
import { lightTheme } from "./light";

type ThemeMode = "light" | "dark";

interface ThemeContextProps {
  themeName: ThemeMode;
  toggleTheme: () => void;
  themeObject: EvaThemeType;
}

const ThemeContext = createContext<ThemeContextProps>({
  themeName: "light",
  toggleTheme: () => {},
  themeObject: eva.light,
});

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [themeName, setThemeName] = useState<ThemeMode>("light");

  const toggleTheme = () => {
    setThemeName((prev) => (prev === "light" ? "dark" : "light"));
  };

  const themeObject: EvaThemeType =
    themeName === "light"
      ? ({ ...eva.light, ...lightTheme } as EvaThemeType)
      : ({ ...eva.dark, ...darkTheme } as EvaThemeType);

  return (
    <ThemeContext.Provider value={{ themeName, toggleTheme, themeObject }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useAppTheme = () => useContext(ThemeContext);
