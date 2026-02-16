import { useState, useRef } from 'react'
import PlusCurved from '../../assets/ui-icons/plus-curved.svg?react'
import { PartySelectorMenu } from './party-selector-menu'
import { type PartyMember } from '../../types/bg3-partymember'
import { type CompanionName, companionNames } from '../../context-providers/generator-provider'
import { useClickOutside } from '../../hooks/use-click-outside'
import { useGeneratorContext } from '../../context-providers/generator-provider'

import astarion from '../../assets/character-portraits/portrait-Astarion.png'
import wyll from '../../assets/character-portraits/portrait-Wyll.png'
import karlach from '../../assets/character-portraits/portrait-Karlach.png'
import shadowheart from '../../assets/character-portraits/portrait-Shadowheart.png'
import halsin from '../../assets/character-portraits/portrait-Halsin.png'
import minsc from '../../assets/character-portraits/portrait-Minsc.png'
import tav from '../../assets/character-portraits/portrait-Tav.png'
import minthara from '../../assets/character-portraits/portrait-Minthara.png'
import jaheira from '../../assets/character-portraits/portrait-Jaheira.png'
import laezel from "../../assets/character-portraits/portrait-Laezel.png"
import gale from '../../assets/character-portraits/portrait-Gale.png'
import durge from '../../assets/character-portraits/portrait-Durge.png'


const portraitMap: Record<string, string> = {
    astarion,
    wyll,
    karlach,
    shadowheart,
    halsin,
    minsc,
    minthara,
    jaheira,
    laezel,
    gale,
    durge,
    tav
}

interface PartySelectorSidebarProps {
    hasRolled: boolean
}

export const PartySelectorSidebar = ({ hasRolled }: PartySelectorSidebarProps) => {
    const ref = useRef<HTMLDivElement>(null)
    const [showPartyDropdown, setShowPartyDropdown] = useState<boolean>(false)
    const [clickedPartymember, setClickedPartymember] = useState<string>('')
    const [partyOptions, setPartyOptions] = useState<CompanionName[]>([
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

    const { partyResult, setPartyResult, tavCounter, setTavCounter, tavIdArr, setTavIdArr } = useGeneratorContext()
    

    const portraitWrapper: string = "w-[50px] lg:w-[75px] p-0.5 bg-accent-border flex flex-col items-center mb-5"
    const characterPortraitIcon: string = "w-full border-[1px] border-black"
    const removePartymemberButtonClass: string = 'size-full bg-[#8E2A1F] hover:bg-[#B33A2C] text-[#F1E9DA] left-1 p-1 z-10'
    const partyMenuClass: string = `${showPartyDropdown ? '' : 'hidden'} bg-bg-menu-dropdown rounded-xl p-2 max-h-[20rem] overflow-scroll w-40 absolute left-25 z-10`

    const handleShowPartyMenu = () => {
        setShowPartyDropdown(!showPartyDropdown)
    }
    const getRemoveButtonClass = (memberId: string) => {
        if (memberId == clickedPartymember) {
            return removePartymemberButtonClass
        } else {
            return 'hidden'
        }
    }

    const handleRemoveMember = (memberId: string) => {
        console.log(tavCounter)
        const isTav = memberId.split('-').slice(0, 1).toString() == "tav"

        const copy: PartyMember[] = [...partyResult]
        const filtered: PartyMember[] = copy.filter(char => char.characterId !== memberId)
        setPartyResult(filtered)

        const index = partyResult.findIndex(mbr => mbr.characterId === memberId)
        const displayName = partyResult[index].displayName
        const name = companionNames.includes(displayName) ? (displayName as CompanionName) : null

        if (name) {
            let optionsCopy = partyOptions
            optionsCopy = [...optionsCopy, name]
            setPartyOptions(optionsCopy)
        } 

        if (isTav) {
            setTavCounter(prev => prev -1)
            const copy = [...tavIdArr, memberId]
            setTavIdArr(copy)
        }

        if (isTav && tavCounter >= 4) {
            const name = "Tav"
            let optionsCopy = partyOptions
            optionsCopy = [name, ...optionsCopy]
            setPartyOptions(optionsCopy)
        }

    }

    useClickOutside(ref, () => setClickedPartymember(''))

    let i = 0

    if (partyResult) {

    return(
        <div ref={ref} id="party-selector-sidebar" className="flex flex-col w-[8%] ml-5 lg:ml-0 lg:pt-10 lg:absolute lg:left-10 items-center">
            {partyResult.map(member => {
                i = i += 1

                const memberId = member.characterId
                const portraitId = memberId.split('-')[0] == 'tav' ? 'tav' : memberId

                return (
                    <div className={portraitWrapper} key={`${member}-${i}`}>
                        <img src={portraitMap[portraitId]} className={characterPortraitIcon} onClick={() => setClickedPartymember(memberId)}></img>
                        <button id={`${member} delete button`} className={getRemoveButtonClass(memberId)} onClick={() => handleRemoveMember(memberId)}>X</button>
                    </div>
                )
            })}
            <div onClick={() => handleShowPartyMenu()} className="w-[50px] h-[66.67px] lg:w-[75px] lg:h-[100px] bg-background-generator-primary flex flex-col items-center justify-center">
                <PlusCurved className="size-[25px] fill-text-primary" />
            </div>
            <PartySelectorMenu 
                partyMenuClass={partyMenuClass}
                setShowPartyDropdown={setShowPartyDropdown}
                hasRolled={hasRolled}
                partyOptions={partyOptions}
                setPartyOptions={setPartyOptions}
                />
        </div>
    )
}
}