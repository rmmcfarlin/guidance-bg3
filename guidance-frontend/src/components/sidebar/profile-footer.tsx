import ProfilePlaceholder from '../../assets/ui-icons/profile-placeholder.png'
import DotsIcon from '../../assets/ui-icons/dots-horizontal.svg?react'
import ProfileSVG from '../../assets/ui-icons/profile.svg?react'
import SettingsSVG from '../../assets/ui-icons/settings.svg?react'
import LogoutSVG from '../../assets/ui-icons/logout.svg?react'
import { useState } from 'react'
import { type SettingsProps, type SettingsTabOption } from '../app-wrapper'

interface ProfileFooterProps {
    sidebarExpanded: boolean
    settingsProps: SettingsProps
}

export const ProfileFooter = ({sidebarExpanded, settingsProps}: ProfileFooterProps) => {

    const [showProfileDropdown, setShowProfileDropdown] = useState<boolean>(false)

    const { setSettingsTab, setShowSettingsMenu } = settingsProps

    const footerExpanded: string = "flex p-5 w-full items-center relative"
    const footerCollapsed: string = "hidden"

    const profileMenuClass: string = `${showProfileDropdown ? '' : 'hidden'} w-full round-xl flex flex-col p-[1rem] absolute left-0 bottom-[90%] bg-leather-300`
    const dropdownButtonClass: string = "w-full flex items-center text-parchment-300 bg-leather-300 hover:bg-leather-100 p-3 rounded-xl"
    const dropdownButtonIconClass: string = "size-[15px] fill-parchment-300 stroke-parchement-300 mr-3"

    const handleSettingsMenuSelection = (option: SettingsTabOption) => {
        setSettingsTab(option)
        setShowSettingsMenu(true)
        setShowProfileDropdown(false)
    }

    const handleProfileDropdown = () => {
        setShowProfileDropdown(!showProfileDropdown)
    }

    return(
        <div className={sidebarExpanded ? footerExpanded : footerCollapsed}>
            <img src={ProfilePlaceholder} className="w-[30px] rounded-[100%] mr-4"></img>
            <span className="text-parchment-300">Ryan McFarlin</span>
            <DotsIcon className="w-[17px] fill-parchment-300 ml-auto" onClick={() => handleProfileDropdown()} />

            <div className={profileMenuClass}>
                <button className={dropdownButtonClass} onClick={() => handleSettingsMenuSelection("Profile")}>
                    <ProfileSVG className={dropdownButtonIconClass}/>
                    <span className="text-parchment-300">Profile</span>
                </button>
                <button className={dropdownButtonClass} onClick={() => handleSettingsMenuSelection("Settings")}>
                    <SettingsSVG className={dropdownButtonIconClass} />
                    <span className="text-parchment-300">Settings</span>
                </button>
                <button className={dropdownButtonClass}>
                    <LogoutSVG className={dropdownButtonIconClass} />
                    <span className="text-parchment-300">Logout</span>
                </button>
            </div>
        </div>
    )
}