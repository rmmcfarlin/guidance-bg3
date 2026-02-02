import { useState, useRef } from 'react'
import PlusCurved from '../../assets/ui-icons/plus-curved.svg?react'
import { PartySelectorMenu } from './party-selector-menu'
import { type PartyMember, type PartyMemberOrNull } from './party-selector-menu'
import { useClickOutside } from '../../hooks/use-click-outside'
import Astarion from '../../assets/character-portraits/portrait-Astarion.png'
import Wyll from '../../assets/character-portraits/portrait-Wyll.png'
import Karlach from '../../assets/character-portraits/portrait-Karlach.png'
import Shadowheart from '../../assets/character-portraits/portrait-Shadowheart.png'
import Halsin from '../../assets/character-portraits/portrait-Halsin.png'
import Minsc from '../../assets/character-portraits/portrait-Minsc.png'
import Tav from '../../assets/character-portraits/portrait-Tav.png'
import Minthara from '../../assets/character-portraits/portrait-Minthara.png'
import Jaheira from '../../assets/character-portraits/portrait-Jaheira.png'
import Laezel from "../../assets/character-portraits/portrait-Laezel.png"
import Gale from '../../assets/character-portraits/portrait-Gale.png'
import Durge from '../../assets/character-portraits/portrait-Durge.png'


const portraitMap: Record<PartyMember, string> = {
    Astarion,
    Wyll,
    Karlach,
    Shadowheart,
    Halsin,
    Minsc,
    Tav,
    Minthara,
    Jaheira,
    Laezel,
    Gale,
    Durge
}

export const PartySelectorSidebar = ({}) => {
    const ref = useRef<HTMLDivElement>(null)
    const [showPartyDropdown, setShowPartyDropdown] = useState<boolean>(false)
    const [clickedPartymember, setClickedPartymember] = useState<PartyMemberOrNull>(null)
    const [selectedParty, setSelectedParty] = useState<PartyMember[]>([
        "Tav"
    ])

    const portraitWrapper: string = "w-[50px] lg:w-[75px] p-0.5 bg-background-portrait flex flex-col items-center mb-5"
    const characterPortraitIcon: string = "w-full border-[1px] border-black"
    const removePartymemberButtonClass: string = 'size-full bg-[#8E2A1F] hover:bg-[#B33A2C] text-[#F1E9DA] left-1 p-1 rounded-xl z-10'
    const partyMenuClass: string = `${showPartyDropdown ? '' : 'hidden'} bg-bg-menu-dropdown rounded-xl p-2 max-h-[20rem] overflow-scroll w-40 absolute left-25 z-10`

    const handleShowPartyMenu = () => {
        setShowPartyDropdown(!showPartyDropdown)
    }
    const getRemoveButtonClass = (member: PartyMember) => {
        if (member == clickedPartymember) {
            return removePartymemberButtonClass
        } else {
            return 'hidden'
        }
    }

    const findPartyMember = (member: PartyMember): number => {
        for (let i = 0; i < selectedParty.length; i++) {
            if (selectedParty[i] == member) {
                return i
            }
        }
        console.log("Error: Party member not found for delection")
        return -1
    }

    const handleRemoveMember = (member: PartyMember) => {

        console.log(`member: ${member}`)

        const copy: PartyMember[] = [...selectedParty]
        const filtered: PartyMember[] = copy.filter(char => char !== member)

        setSelectedParty(filtered)
    }

    useClickOutside(ref, () => setClickedPartymember(null))

    return(
        <div ref={ref} id="party-selector-sidebar" className="flex flex-col w-[8%] ml-5 lg:ml-0 lg:absolute lg:left-10 items-center">
            {selectedParty.map(member => {
                return (
                    <div className={portraitWrapper} key={member}>
                        <img src={portraitMap[member]} className={characterPortraitIcon} onClick={() => setClickedPartymember(member)}></img>
                        <button id={`${member} delete button`} className={getRemoveButtonClass(member)} onClick={() => handleRemoveMember(member)}>X</button>
                    </div>
                )
            })}
            <div className="w-[50px] h-[66.67px] lg:w-[75px] lg:h-[100px] bg-background-generator-secondary flex flex-col items-center justify-center">
                <PlusCurved className="size-[25px] fill-text-primary" onClick={() => handleShowPartyMenu()} />
            </div>
            <PartySelectorMenu 
                selectedParty={selectedParty}
                setSelectedParty={setSelectedParty}
                partyMenuClass={partyMenuClass}
                setShowPartyDropdown={setShowPartyDropdown}
                />
        </div>
    )
}