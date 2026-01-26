import { Header } from "./header"
import { Sidebar } from "./sidebar/sidebar-main"
import { AppMain } from "./app-main"
import { useTheme } from '../context-providers/theme-provider.tsx'
import { useState } from 'react'
import { type ThemeContextValue } from "../context-providers/theme-provider.tsx"


export interface ThemeProps {
    themeProps: ThemeContextValue
}

export type SettingsTabOption = "Profile" | "Settings"

export interface SettingsProps {
    settingsMenuOption: string,
    setSettingsMenuOption: (option: string) => void,
    showSettingsMenu: boolean,
    setShowSettingsMenu: (bool: boolean) => void,
    settingsTab: SettingsTabOption,
    setSettingsTab: (option: SettingsTabOption) => void,
}

interface AppWrapperClasses {
    appWrapperBgDark: string,
    appWrapperBgLight: string
}
 
export const AppWrapper = ({}) => {
    
    const [settingsMenuOption, setSettingsMenuOption] = useState<string>('')
    const [showSettingsMenu, setShowSettingsMenu] = useState<boolean>(false)
    const [settingsTab, setSettingsTab] = useState<SettingsTabOption>('Profile')
    const settingsProps = {
        settingsMenuOption,
        setSettingsMenuOption,
        showSettingsMenu,
        setShowSettingsMenu,
        settingsTab,
        setSettingsTab
    }

    const {mainTheme, accentTheme, setMainTheme, setAccentTheme } = useTheme()
    const themeProps = {
        mainTheme,
        accentTheme,
        setMainTheme,
        setAccentTheme
    }

    return(
        <div id="appWrapper" className="bg-background-main min-h-[100vh] w-[100vw] flex justify-center items-center relative m-0 overflow-auto">
            <Header />
            <Sidebar 
                settingsProps={settingsProps} 
                themeProps={themeProps} 
                />
            <AppMain 
                themeProps={themeProps}
                settingsProps={settingsProps} 
                />
        </div>  
    )
}