import { useClickOutside } from "../../hooks/use-click-outside"
import { useRef, useState } from "react"
import { OptionDropdown } from "../ui-components/option-dropdown"

interface PartySelectorMenuProps {
    selectedParty: PartyMember[]
    setSelectedParty: React.Dispatch<React.SetStateAction<PartyMember[]>>
    partyMenuClass: string
    setShowPartyDropdown: React.Dispatch<React.SetStateAction<boolean>>
}

export type PartyMember = 
    "Astarion"|
    "Gale"|
    "Laezel"|
    "Shadowheart"|
    "Wyll"|
    "Karlach"|
    "Minthara"|
    "Halsin"|
    "Jaheira"|
    "Minsc"|
    "Tav"|
    "Durge"
    
export type PartyMemberOrNull = PartyMember | null


export const PartySelectorMenu = ({ selectedParty, setSelectedParty, partyMenuClass, setShowPartyDropdown }: PartySelectorMenuProps) => {

    const ref = useRef<HTMLDivElement>(null)
    const [partyOptions, setPartyOptions] = useState<PartyMember[]>([
        "Tav", 
        "Durge", 
        "Astarion", 
        "Gale", 
        "Karlach", 
        "Wyll", 
        "Laezel", 
        "Shadowheart", 
        "Minthara", 
        "Halsin", 
        "Jaheira", 
        "Minsc"
    ])

    useClickOutside(ref, () => setShowPartyDropdown(false))

    const partyDropdownClass = `w-[100%] p-1 flex flex-col`
    const partyButtonClass = "w-full text-text-primary rounded-xl text-center hover:bg-button-hover hover:text-button-text py-4 mt-3"
    
    const handleNewPartyMember = (name: PartyMember) => {       
        setSelectedParty([...selectedParty, name])
        setShowPartyDropdown(false)

        if (name !== "Tav") {
            const copy: PartyMember[] = partyOptions.filter(char => char !== name)
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