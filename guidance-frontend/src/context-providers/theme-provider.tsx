import { createContext, useContext, useState } from 'react';
import { type ReactNode } from 'react';

type MainTheme = "light" | "dark"
type AccentTheme = "wizard" | "warlock" | "cleric" | "druid" | "sorcerer"

export interface ThemeContextValue {
    mainTheme: MainTheme
    accentTheme: AccentTheme
    toggleMainTheme: () => void
    toggleAccentTheme: (theme: AccentTheme) => void
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined)

export const ThemeProvider = ({ children }: { children: ReactNode }) => {

    const [mainTheme, setMainTheme] = useState<MainTheme>("light")
    const [accentTheme, setAccentTheme] = useState<AccentTheme>('wizard')


    const toggleMainTheme = () => setMainTheme( prev => (prev === 'light' ? 'dark' : 'light'))
    const toggleAccentTheme = (theme: AccentTheme) => setAccentTheme(theme)

    return(
        <ThemeContext.Provider value={{mainTheme, toggleMainTheme, accentTheme, toggleAccentTheme }}>
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
