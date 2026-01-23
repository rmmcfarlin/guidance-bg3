import { useState } from 'react'
import { OptionDropdown } from "../ui-components/option-dropdown"
import { type MainTheme, type AccentTheme } from "../../context-providers/theme-provider"
import { useTheme } from "../../context-providers/theme-provider"
import DownArrowSVG from '../../assets/ui-icons/down-arrow.svg?react'

export const SettingsTab = ({}) => {

    const {mainTheme, accentTheme, setMainTheme, setAccentTheme } = useTheme()
    const [selectedDropdown, setSetlectedDropdown] = useState<string>('')

    const downArrowClass: string = "w-[20px] fill-parchment-300 ml-2"
    const dropdownContainerClass: string = `flex flex-col items-center pt-3 pb-1 rounded-xl bg-leather-100 w-[150%] z-10 absolute top-7 right-0`
    const dropdownButtonClass: string = "w-[90%] hover:bg-leather-500 text-parchment-300 rounded-xl text-center mb-2"
    const settingsOptionClass: string = "flex justify-between mb-7"

    const mainThemeOptions: MainTheme[] = [
        "Light",
        "Dark"
    ]
    const accentThemeOptions: AccentTheme[] = [
        "Cleric",
        "Druid",
        "Sorcerer",
        "Warlock",
        "Wizard"
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

    const getDropdownClass = (id: string) => {
        if (id == selectedDropdown) {
            return `${dropdownContainerClass}`
        } else {
            return 'hidden'
        }
    }


    return(
        <div className="size-full flex flex-col">
            <div className={settingsOptionClass}>
                <span className="text-parchment-300">Main Theme:</span>
                <div className="flex relative">
                    <div>
                        <span className="text-parchment-300">{mainTheme}</span>
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
                <span className="text-parchment-300">Accent Theme:</span>
                <div className="flex relative">
                     <span className="text-parchment-300">{accentTheme}</span>
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