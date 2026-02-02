import { useState } from 'react'
import { OptionDropdown } from "../ui-components/option-dropdown"

interface PartySelectorMenuProps {
    selectedParty: string[]
    setSelectedParty: () => void
    partyMenuClass: string
}

type PartyMember = 
    "Astarion"|
    "Gale"|
    "Lae'zel"|
    "Shadowheart"|
    "Wyll"|
    "Karlach"|
    "Minthara"|
    "Halsin"|
    "Jaheira"|
    "Minsc"|
    "Tav"|
    ""

export const PartySelectorMenu = ({ selectedParty, partyMenuClass }: PartySelectorMenuProps) => {

    const [newPartyMember, setNewPartyMember] = useState<PartyMember>("")
    const [showPartyDropdown, setShowPartyDropdown] = useState<boolean>(false)

    const handleNewPartyMember = (name: PartyMember) => {
        setNewPartyMember(name)
    }

    const partyDropdownClass = `w-[100% bg-background-sidebar-main p-5 flex flex-col`
    const partyButtonClass = "w-full text-text-primary rounded-xl p-5 text-center"
    const partyOptions: PartyMember[] = ["Tav", "Astarion", "Gale", "Karlach", "Wyll", "Lae'zel", "Shadowheart", "Minthara", "Halsin", "Jaheira", "Minsc"]

    return(
        <div id="edit-party-menu-wrapper" className={partyMenuClass}>
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