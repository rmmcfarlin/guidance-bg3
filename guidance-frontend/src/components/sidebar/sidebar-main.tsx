import { useState } from 'react'
import HamburgerIcon from "../../assets/ui-icons/hamburger-icon.svg?react"
import { SidebarOptions } from './options-main.tsx'
import { ProfileFooter } from './profile-footer.tsx'
import { type ThemeContextValue } from "../../context-providers/theme-provider.tsx"
import { type SettingsProps, type SettingsTabOption } from '../app-wrapper.tsx'

interface SidebarProps {
    themeProps: ThemeContextValue,
    settingsProps: SettingsProps
}

interface SidebarClasses {
    sbBase: string
    sbExpanded: string
    sbCollapsed: string
    hamburgerBase: string
    hamburgerExpanded: string
    hamburgerCollapsed: string
}

export const Sidebar = ({ themeProps, settingsProps }: SidebarProps) => {

    const [sidebarExpanded, setSidebarExpanded] = useState<boolean>(false)

    const sidebarClasses: SidebarClasses = {
        sbBase: "h-screen absolute left-0 lg:relative flex-none z-10 flex",
        sbExpanded: "w-[80vw] md:w-[15rem] bg-leather-500 flex flex-col",
        sbCollapsed: "w-[0rem]",
        hamburgerBase: "w-[2.25rem] absolute top-3",
        hamburgerExpanded: "stroke-parchment-500 right-3",
        hamburgerCollapsed: "stroke-charcoal-500 left-3"
    }

    const handleSbExpand: () => void = () => {
        setSidebarExpanded(!sidebarExpanded)
    }

    return(
            <div id="sidebarMain" className={`${sidebarClasses.sbBase} ${sidebarExpanded ? sidebarClasses.sbExpanded : sidebarClasses.sbCollapsed}`}>
                <HamburgerIcon className={`${sidebarClasses.hamburgerBase} 
                    ${sidebarExpanded ? sidebarClasses.hamburgerExpanded : sidebarClasses.hamburgerCollapsed}`} onClick={() => handleSbExpand()} />
                <SidebarOptions sidebarExpanded={sidebarExpanded} />
                <ProfileFooter 
                    sidebarExpanded={sidebarExpanded}
                    settingsProps={settingsProps} 
                    />
            </div>
    )
}