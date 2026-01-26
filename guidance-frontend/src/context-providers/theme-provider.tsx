import { createContext, useContext, useState, useEffect } from 'react';
import { type ReactNode } from 'react';

export type MainTheme = "light" | "dark"
export type AccentTheme = "wizard" | "warlock" | "cleric" | "druid" | "sorcerer"

export interface ThemeContextValue {
    mainTheme: MainTheme
    accentTheme: AccentTheme
    setMainTheme: (theme: MainTheme) => void
    setAccentTheme: (theme: AccentTheme) => void
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined)

export const ThemeProvider = ({ children }: { children: ReactNode }) => {

    const [mainTheme, setMainTheme] = useState<MainTheme>("light")
    const [accentTheme, setAccentTheme] = useState<AccentTheme>('cleric')

    useEffect(() => {
        document.documentElement.setAttribute("data-main-theme", mainTheme);
        document.documentElement.setAttribute("data-accent-theme", accentTheme)
    }, [mainTheme, accentTheme]);


    return(
        <ThemeContext.Provider value={{mainTheme, setMainTheme, accentTheme, setAccentTheme }}>
            {children}
        </ThemeContext.Provider>
    )
}

export const useTheme = () => {
  const ctx = useContext(ThemeContext)
  if (!ctx) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return ctx
}
