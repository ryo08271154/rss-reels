type Theme = {
  text: string;
  source: string;
  title: string;
  gradientColors: readonly [string, string];
  background: string;
};
const lightTheme: Theme = {
  text: "#333",
  source: "#2563eb",
  title: "#111",
  gradientColors: ["transparent", "rgba(255,255,255,0.85)"] as const,
  background: "#fff",
};
const darkTheme: Theme = {
  text: "#d1d1d6",
  source: "#60a5fa",
  title: "#fff",
  gradientColors: ["transparent", "rgba(0,0,0,0.75)"] as const,
  background: "#000",
};
export const themes = {
  light: lightTheme,
  dark: darkTheme,
};
