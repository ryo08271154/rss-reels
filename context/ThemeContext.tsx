import { themes } from "@/constants/theme";
import { createContext, FC, ReactNode } from "react";
import { useColorScheme } from "react-native";

export const ThemeContext = createContext(themes.light);
export const ThemeProvider: FC<{ children: ReactNode }> = ({
  children,
}: {
  children: ReactNode;
}) => {
  const colorScheme = useColorScheme();
  const theme = themes[colorScheme === "dark" ? "dark" : "light"];
  return (
    <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
  );
};
