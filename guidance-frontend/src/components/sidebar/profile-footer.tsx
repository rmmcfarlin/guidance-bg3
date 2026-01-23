import ProfilePlaceholder from '../../assets/ui-icons/profile-placeholder.png'
import DotsIcon from '../../assets/ui-icons/dots-horizontal.svg?react'
import { OptionDropdown } from '../ui-components/option-dropdown'
import { useState } from 'react'
import { type SettingsProps, type SettingsTabOption } from '../app-wrapper'

interface ProfileFooterProps {
    sidebarExpanded: boolean
    settingsProps: SettingsProps
}

export const ProfileFooter = ({sidebarExpanded, settingsProps}: ProfileFooterProps) => {

    const [showProfileDropdown, setShowProfileDropdown] = useState<boolean>(false)

    const { setSettingsTab, setShowSettingsMenu } = settingsProps

    const footerExpanded: string = "flex p-5 hover:bg-leather-100 w-full items-center relative"
    const footerCollapsed: string = "hidden"

    const profileMenuOptions: SettingsTabOption[] = [
        "Profile",
        "Settings"
    ]

    const profileMenuClass: string = `${showProfileDropdown ? '' : 'hidden'} w-full round-xl flex flex-col p-[1rem] absolute left-0 bottom-[90%] bg-leather-300`
    const dropdownButtonClass: string = "w-full text-parchment-300 bg-leather-300 hover:bg-leather-100 p-3 rounded-xl"

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
            <OptionDropdown
                options={profileMenuOptions}
                containerClass={profileMenuClass}
                buttonClass={dropdownButtonClass}
                setValue={handleSettingsMenuSelection}
                />
            {/* <span className={dropdownButtonClass}>Logout</span> */}
        </div>
    )
}