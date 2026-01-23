import ProfileSVG from '../../assets/ui-icons/profile.svg?react'
import SettingsSVG from '../../assets/ui-icons/settings.svg?react'
import XSVG from '../../assets/ui-icons/x-thin.svg?react'
import { type SettingsProps } from '../app-wrapper'
import './settings-menu-main.css'


interface SettingsMenuProps {
    settingsProps: SettingsProps
}

export const SettingsMenu = ({ settingsProps }: SettingsMenuProps) => {

    const { showSettingsMenu, setShowSettingsMenu } = settingsProps

    const settingsMenuClass: string = `${showSettingsMenu ? '' : 'hidden'} bg-leather-500 rounded-xl`
    const settingTabClass: string = 'flex w-full'
    const settingsIconClass: string = 'w-[20px] fill-parchment-300'
    
    const handleCloseSettings = () => {
        setShowSettingsMenu(false)
    }
    const renderContent = () => {
        return null
    }

    return (
        <div id="settingsMenu" className={settingsMenuClass}>
            <div id="settingsInnerWrapper" className="bg-leather-500 size-full relative rounded-xl">
                <XSVG className="fill-parchment-300 size-[30px] absolute top-1 right-1" onClick={() => handleCloseSettings()} />
                <div>
                    <div>
                        <ProfileSVG className={settingsIconClass} />
                        <span className="text-parchment-300">Profile</span>
                    </div>
                    <div>
                        <SettingsSVG className={settingsIconClass} />
                        <span className="text-parchment-300">Settings</span>
                    </div>
                </div>
                <div>
                </div>
            </div>
        </div>
    )
}