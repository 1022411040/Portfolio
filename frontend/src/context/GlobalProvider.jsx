import { ThemeProvider } from "./ThemeProvider";

export default function GlobalProvider({ children }) {
  return <ThemeProvider>{children}</ThemeProvider>;
}
