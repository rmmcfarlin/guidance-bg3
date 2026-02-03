import { useState } from 'react'
import { type ThemeContextValue } from "../context-providers/theme-provider.tsx"
import { type SettingsProps } from './app-wrapper.tsx'
import { ClassGeneratorMain } from './class-generators/class-generator-main'
import { SettingsMenu } from './sidebar/settings-menu-main.tsx'

interface AppMainProps {
    themeProps: ThemeContextValue
    settingsProps: SettingsProps
}


export const AppMain = ({ themeProps, settingsProps }: AppMainProps) => {

    const [appContent, setAppContent] = useState("classGenerator")

    const renderContent = () => {
        if (appContent == "classGenerator") {
            return <ClassGeneratorMain />
        }
    }

    return(
        <div id="appMain" className="w-full relative flex justify-center flex-0 lg:flex-1 lg:min-w-0 pb-5 mr-auto ml-auto lg:px-50">
            {renderContent()}
            <SettingsMenu
                settingsProps={settingsProps}
                />
        </div>
    )
}