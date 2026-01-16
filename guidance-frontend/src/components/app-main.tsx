import { useState } from 'react'
import { type ThemeContextValue } from "../context-providers/theme-provider.tsx"
import { ClassGeneratorMain } from './class-generators/class-generator-main'

interface AppMainProps {
    themeProps: ThemeContextValue
}

export const AppMain = ({ themeProps }: AppMainProps) => {

    const [appContent, setAppContent] = useState("classGenerator")

    const renderContent = () => {
        if (appContent == "classGenerator") {
            return <ClassGeneratorMain />
        }
    }

    return(
        <div id="appMain" className="w-full flex justify-center items-center flex-0 lg:flex-1 lg:min-w-0 lg:overflow-auto mr-auto ml-auto">
            {renderContent()}
        </div>
    )
}