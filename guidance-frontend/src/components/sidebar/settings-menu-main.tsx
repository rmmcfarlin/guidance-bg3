import ProfileSVG from '../../assets/ui-icons/profile.svg?react'
import SettingsSVG from '../../assets/ui-icons/settings.svg?react'
import XSVG from '../../assets/ui-icons/x-thin.svg?react'
import { type SettingsProps, type SettingsTabOption } from '../app-wrapper'
import { SettingsTab } from './settings-menu-tab'
import './settings-menu-main.css'


interface SettingsMenuProps {
    settingsProps: SettingsProps
}

export const SettingsMenu = ({ settingsProps }: SettingsMenuProps) => {

    const { showSettingsMenu, setShowSettingsMenu, settingsTab, setSettingsTab } = settingsProps

    const settingsMenuClass: string = `${showSettingsMenu ? '' : 'hidden'} bg-leather-500 rounded-xl p-7`
    const settingsTabClass: string = 'flex w-[30%] lg:w-[90%] p-2 rounded-xl'
    const settingsIconClass: string = `inline w-[20px] fill-parchment-300 mr-2`
    
    const handleCloseSettings = () => {
        setShowSettingsMenu(false)
    }
    
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
        <div id="settingsMenu" className={settingsMenuClass}>
            <div id="settingsInnerWrapper" className="flex flex-col lg:flex-row bg-leather-500 size-full relative rounded-xl">
                <XSVG className="fill-parchment-300 size-[30px] absolute top-1 right-1" onClick={() => handleCloseSettings()} />
                <div id="settings-tab-container" className="w-[40%] pt-10">
                    <div className={`${settingsTabClass} ${settingsTab == 'Profile' ? 'bg-leather-100' : 'bg-leather-500'}`} onClick={() => handleSetTab("Profile")}>
                        <ProfileSVG className={settingsIconClass} />
                        <span className="text-parchment-300">Profile</span>
                    </div>
                    <div className={`${settingsTabClass} ${settingsTab == 'Settings' ? 'bg-leather-100' : 'bg-leather-500'}`} onClick={() => handleSetTab("Settings")}>
                        <SettingsSVG className={settingsIconClass} />
                        <span className="text-parchment-300">Settings</span>
                    </div>
                </div>
                <div id="selected-tab-container">
                    {renderContent()}
                </div>
            </div>
        </div>
    )
}