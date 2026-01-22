import ProfilePlaceholder from '../../assets/ui-icons/profile-placeholder.png'
import DotsIcon from '../../assets/ui-icons/dots-horizontal.svg?react'
import { OptionDropdown } from '../ui-components/option-dropdown'
import { useState } from 'react'

interface ProfileFooterProps {
    sidebarExpanded: boolean
}

export const ProfileFooter = ({sidebarExpanded}: ProfileFooterProps) => {

    const [settingsMenuOption, setSettingsMenuOption] = useState<string>('')
    const [showSettingsMenu, setShowSettingsMenu] = useState<boolean>(false)

    const footerExpanded: string = "flex p-5 hover:bg-leather-100 w-full items-center relative"
    const footerCollapsed: string = "hidden"

    const profileMenuOptions: string[] = [
        "Personalization",
        "Settings",
        "Logout"
    ]

    const profileMenuClass: string = `${showSettingsMenu ? '' : 'hidden'} w-full round-xl flex flex-col p-[1rem] absolute left-0 bottom-[90%] bg-leather-300`
    const dropdownButtonClass: string = "w-full text-parchment-300 bg-leather-300 hover:bg-leather-100 p-3 rounded-xl"

    const handleSettingsMenuSelection = (option: string) => {
        setSettingsMenuOption(option)
    }

    const handleShowSettingsMenu = () => {
        setShowSettingsMenu(!showSettingsMenu)
    }

    return(
        <div className={sidebarExpanded ? footerExpanded : footerCollapsed}>
            <img src={ProfilePlaceholder} className="w-[30px] rounded-[100%] mr-4"></img>
            <span className="text-parchment-300">Ryan McFarlin</span>
            <DotsIcon className="w-[17px] fill-parchment-300 ml-auto" onClick={() => handleShowSettingsMenu()} />
            <OptionDropdown 
                options={profileMenuOptions}
                containerClass={profileMenuClass}
                buttonClass={dropdownButtonClass}
                setValue={handleSettingsMenuSelection}
                />
        </div>
    )
}