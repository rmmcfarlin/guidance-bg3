import { createContext, useContext, useState } from 'react';
import { type ReactNode } from 'react';

export type MainTheme = "Light" | "Dark"
export type AccentTheme = "Wizard" | "Warlock" | "Cleric" | "Druid" | "Sorcerer"

export interface ThemeContextValue {
    mainTheme: MainTheme
    accentTheme: AccentTheme
    setMainTheme: (theme: MainTheme) => void
    setAccentTheme: (theme: AccentTheme) => void
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined)

export const ThemeProvider = ({ children }: { children: ReactNode }) => {

    const [mainTheme, setMainTheme] = useState<MainTheme>("Light")
    const [accentTheme, setAccentTheme] = useState<AccentTheme>('Cleric')

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
