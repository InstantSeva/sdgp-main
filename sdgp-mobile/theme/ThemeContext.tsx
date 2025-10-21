import React, { createContext, useState, useContext } from "react";
import type { ThemeType } from "@ui-kitten/components";
import { lightTheme, darkTheme } from "./index";

type ThemeTypeName = "light" | "dark";

interface ThemeContextType {
  theme: ThemeTypeName;
  toggleTheme: () => void;
  themeObject: ThemeType;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: "light",
  toggleTheme: () => {},
  themeObject: lightTheme,
});

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState<ThemeTypeName>("light");

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  const themeObject = theme === "light" ? lightTheme : darkTheme;

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, themeObject }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useAppTheme = () => useContext(ThemeContext);
