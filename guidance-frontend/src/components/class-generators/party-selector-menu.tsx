import { useClickOutside } from "../../hooks/use-click-outside"
import React, { useRef } from "react"
import { OptionDropdown } from "../ui-components/option-dropdown"
import { useGeneratorContext, type CompanionName } from "../../context-providers/generator-provider"
import { type PartyMember } from "../../types/bg3-partymember"
import { getClass } from "./generator-engine"

interface PartySelectorMenuProps {
    partyMenuClass: string
    setShowPartyDropdown: React.Dispatch<React.SetStateAction<boolean>>
    hasRolled: boolean
    partyOptions: CompanionName[]
    setPartyOptions: React.Dispatch<React.SetStateAction<CompanionName[]>>
}

export const PartySelectorMenu = ({ partyMenuClass, setShowPartyDropdown, hasRolled, partyOptions, setPartyOptions }: PartySelectorMenuProps) => {

    const { partyResult, setPartyResult, getMemberId } = useGeneratorContext()
    const ref = useRef<HTMLDivElement>(null)


    useClickOutside(ref, () => setShowPartyDropdown(false))

    const partyDropdownClass = `w-[100%] p-1 flex flex-col`
    const partyButtonClass = "w-full text-text-primary rounded-xl text-center hover:bg-button-hover hover:text-button-text py-4 mt-3"
    
    const handleNewPartyMember = (name: CompanionName) => {

        if (hasRolled) {
            const result = getClass()
            const memberId = getMemberId(name)

            const newClass: PartyMember = {
                    characterId: memberId,
                    displayName: name,
                    classId: result.classId,
                    subclassId: result.subclassId
                }
            
            const copy = partyResult

            if (copy !== null) {
                const newParty = [...copy, newClass]
                setPartyResult(newParty)
            }        
        }
        setShowPartyDropdown(false)

        if (name !== "Tav") {
            const copy: CompanionName[] = partyOptions.filter(char => char !== name)
            setPartyOptions(copy)
        }
    }

    return(
        <div id="edit-party-menu-wrapper" className={partyMenuClass} ref={ref}>
            <p className="text-text-primary font-bold">Add Party Member</p>
            <OptionDropdown
                options={partyOptions}
                containerClass={partyDropdownClass}
                buttonClass={partyButtonClass}
                setValue={handleNewPartyMember} 
                />
        </div>
    )
}