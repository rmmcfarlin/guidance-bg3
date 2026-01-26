import ProfileSVG from '../../assets/ui-icons/profile.svg?react'
import SettingsSVG from '../../assets/ui-icons/settings.svg?react'
import XSVG from '../../assets/ui-icons/x-thin.svg?react'
import { type SettingsProps, type SettingsTabOption } from '../app-wrapper'
import { SettingsTab } from './settings-menu-tab'
import { useRef } from 'react'
import { useClickOutside } from '../../hooks/use-click-outside'
import './settings-menu-main.css'


interface SettingsMenuProps {
    settingsProps: SettingsProps
}

export const SettingsMenu = ({ settingsProps }: SettingsMenuProps) => {

    const { showSettingsMenu, setShowSettingsMenu, settingsTab, setSettingsTab } = settingsProps
    const ref = useRef<HTMLDivElement>(null)

    const settingsMenuClass: string = `${showSettingsMenu ? '' : 'hidden'} bg-background-sidebar-main rounded-xl p-7`
    const settingsTabClass: string = 'flex w-[30%] lg:w-[90%] p-2 rounded-xl'
    const settingsIconClass: string = `inline w-[20px] fill-text-primary mr-2`
    
    const handleCloseSettings = () => {
        setShowSettingsMenu(false)
    }

    useClickOutside(ref, () => setShowSettingsMenu(false))
    
    const handleSetTab = (option: SettingsTabOption) => {
        setSettingsTab(option)
        console.log(option)
    }

    const renderContent = () => {
        if (settingsTab == "Profile") {
            return null
        } else if (settingsTab == "Settings") {
            return(
                <SettingsTab />
            )
        } else {
            return null
        }
    }

    return (
        <div ref={ref} id="settingsMenu" className={settingsMenuClass}>
            <div id="settingsInnerWrapper" className="flex flex-col lg:flex-row bg-background-sidebar-main size-full relative rounded-xl">
                <XSVG className="fill-text-primary size-[30px] absolute top-1 right-1" onClick={() => handleCloseSettings()} />
                <div id="settings-tab-container" className="w-[40%] pt-10 border-r-[0.5px] border-r-text-primary">
                    <div className={`${settingsTabClass} ${settingsTab == 'Profile' ? 'bg-sidebar-button-hover' : 'bg-background-sidebar-main'}`} onClick={() => handleSetTab("Profile")}>
                        <ProfileSVG className={settingsIconClass} />
                        <span className="text-text-primary">Profile</span>
                    </div>
                    <div className={`${settingsTabClass} ${settingsTab == 'Settings' ? 'bg-sidebar-button-hover' : 'bg-background-sidebar-main'}`} onClick={() => handleSetTab("Settings")}>
                        <SettingsSVG className={settingsIconClass} />
                        <span className="text-text-primary">Settings</span>
                    </div>
                </div>
                <div id="selected-tab-container">
                    {renderContent()}
                </div>
            </div>
        </div>
    )
}