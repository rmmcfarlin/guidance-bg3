import { Header } from "./header"
import { Sidebar } from "./sidebar/sidebar-main"
import { AppMain } from "./app-main"
import { useTheme } from '../context-providers/theme-provider.tsx'
import { type ThemeContextValue } from "../context-providers/theme-provider.tsx"

export interface ThemeProps {
    themeProps: ThemeContextValue
}
 
export const AppWrapper = ({}) => {
    
    const {mainTheme, accentTheme, toggleAccentTheme, toggleMainTheme } = useTheme()

    const themeProps = {
        mainTheme,
        accentTheme,
        toggleAccentTheme,
        toggleMainTheme
    }

    return(
        <div id="appWrapper" className="bg-parchment-300 min-h-[100vh] w-[100vw] flex justify-center items-center relative m-0 overflow-auto">
            <Header />
            <Sidebar themeProps={themeProps} />
            <AppMain themeProps={themeProps} />
        </div>  
    )
}