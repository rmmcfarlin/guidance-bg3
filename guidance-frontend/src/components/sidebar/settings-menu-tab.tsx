import { useState, useRef } from 'react'
import { OptionDropdown } from "../ui-components/option-dropdown"
import { type MainTheme, type AccentTheme } from "../../context-providers/theme-provider"
import { useTheme } from "../../context-providers/theme-provider"
import DownArrowSVG from '../../assets/ui-icons/down-arrow.svg?react'
import { useClickOutside } from '../../hooks/use-click-outside'

export const SettingsTab = ({}) => {

    const {mainTheme, accentTheme, setMainTheme, setAccentTheme } = useTheme()
    const [selectedDropdown, setSetlectedDropdown] = useState<string>('')
    const ref = useRef<HTMLDivElement>(null)

    const downArrowClass: string = "w-[20px] fill-text-primary ml-2"
    const dropdownContainerClass: string = `flex flex-col items-center pt-3 pb-1 rounded-xl bg-background-sidebar-secondary w-[150%] z-10 absolute top-7 right-0`
    const dropdownButtonClass: string = "w-[90%] hover:bg-sidebar-button-hover text-text-primary rounded-xl text-center mb-2 py-2"
    const settingsOptionClass: string = "flex justify-between mb-7"

    const mainThemeOptions: MainTheme[] = [
        "light",
        "dark"
    ]
    const accentThemeOptions: AccentTheme[] = [
        "cleric",
        "druid",
        "sorcerer",
        "warlock",
        "wizard"
    ]

    const handleSetMainTheme = (option: MainTheme) => {
        setMainTheme(option)
    }

    const handleSetAccentTheme = (option: AccentTheme) => {
        setAccentTheme(option)
    }

    const handleShowDropdown = (id: string) => {
        if (id == selectedDropdown) {
            setSetlectedDropdown('')
        } else {
            setSetlectedDropdown(id)
        }
    }

    useClickOutside(ref, () => setSetlectedDropdown(''))

    const getDropdownClass = (id: string) => {
        if (id == selectedDropdown) {
            return `${dropdownContainerClass}`
        } else {
            return 'hidden'
        }
    }

    const toTitleCase = (theme: string) => {
        return theme.charAt(0).toUpperCase() + theme.slice(1)
    }

    const themeMain: string = toTitleCase(mainTheme)
    const themeAccent: string = toTitleCase(accentTheme)



    return(
        <div className="size-full flex flex-col">
            <div className={settingsOptionClass}>
                <span className="text-text-primary">Main Theme:</span>
                <div className="flex relative">
                    <div>
                        <span className="text-text-primary">{themeMain}</span>
                        <OptionDropdown
                            options={mainThemeOptions}
                            containerClass={getDropdownClass('mainTheme')}
                            buttonClass={dropdownButtonClass}
                            setValue={handleSetMainTheme} 
                            />
                    </div>
                    <DownArrowSVG className={downArrowClass} onClick={() => handleShowDropdown('mainTheme')}/>
                    
                </div>
            </div>
            <div className={settingsOptionClass}>
                <span className="text-text-primary">Accent Theme:</span>
                <div className="flex relative">
                     <span className="text-text-primary">{themeAccent}</span>
                     <DownArrowSVG className={downArrowClass} onClick={() => handleShowDropdown('accentTheme')} />
                     <OptionDropdown
                        options={accentThemeOptions}
                        containerClass={getDropdownClass('accentTheme')}
                        buttonClass={dropdownButtonClass}
                        setValue={handleSetAccentTheme}
                        />
                </div>
            </div>
        </div>
    )
}