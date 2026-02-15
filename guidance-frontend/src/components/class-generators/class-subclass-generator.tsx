import type { Bg3ClassId } from "../../types/bg3-classes"
import { getClass, rerollSubclass, getPartyClasses } from "./generator-engine"
import { useState, useRef } from 'react'
import { useGeneratorContext, type PartyMemberOrNull, type PartyResult } from "../../context-providers/generator-provider"
import { type PartyMember } from "../../types/bg3-partymember"
import { type ClassRollResult } from "../../context-providers/generator-provider"
import { useClickOutside } from "../../hooks/use-click-outside"
import { getDisplayName } from "../../global-functions/parse-display-name"
import "./class-generator.css"
import D20svg from '../../assets/ui-icons/d20.svg?react'
import LockedIcon from '../../assets/ui-icons/locked.svg?react'
import UnlockedSideIcon from '../../assets/ui-icons/unlocked-side.svg?react'

interface ClassSubclassProps {
    hasRolled: boolean
    setHasRolled: React.Dispatch<React.SetStateAction<boolean>>
}

export const ClassSubclassGenerator = ({ hasRolled, setHasRolled }: ClassSubclassProps) => {
    const ref = useRef<HTMLDivElement>(null)
    const [showReroll, setShowReroll] = useState<PartyMemberOrNull>(null)
    const [lockedMembers, setLockedMembers] = useState<string[]>([])
    const { partyResult, setPartyResult } = useGeneratorContext()

    useClickOutside(ref, () => setShowReroll(null))

    const handleRollParty = (party: PartyMember[]) => {
        const copy = party
        
        const getUnlockedMembers = (copy: PartyMember[]) => {
            return copy.filter(char => !lockedMembers.includes(char.characterId))
        }

        const unlockedMembers: PartyMember[]= getUnlockedMembers(copy)

        const unlockedMemberIds: string[] = unlockedMembers.map(mbr => mbr.characterId)
        const result: PartyResult = getPartyClasses(unlockedMembers)

        if (!hasRolled) {
            setPartyResult(result)
        }
        
        if (partyResult) {
            const combinedResult = partyResult.map(obj => {
                const id: string = obj.characterId
                if (unlockedMemberIds.includes(id)) {
                    const match = result.find(
                        r => r.characterId === id
                    )
                    if (match) {
                        return match
                    }
                    console.log("Error: no match for unlocked member in party result")
                    return obj
                } else {
                    return obj
                }
            })

            if (combinedResult ) {
                setPartyResult(combinedResult)
            } else {
                console.log("Error: combined locked / unlocked result is undefined")
            }
        }
        setHasRolled(true)

    }

    const handleRerollPartymember = (memberId: string) => {
        const result = getClass()
        const charObject = partyResult.find(obj => obj.characterId == memberId)!
        const dspName = charObject?.displayName

        const newClass: ClassRollResult = {
                characterId: memberId,
                displayName: dspName,
                classId: result.classId,
                subclassId: result.subclassId
            }

        if (partyResult) {
            const newParty = partyResult.map(obj => {
                if (obj.characterId == memberId) {
                    return newClass
                } else {
                    return obj
                }
            })
            setPartyResult(newParty)
        }
    }

    const handleRerollPartymemberSubclass = (memberId: string, cls: Bg3ClassId) => {

        const result = rerollSubclass(cls)
        const charObject = partyResult.find(obj => obj.characterId == memberId)!
        const dspName = charObject?.displayName

        const newClass: ClassRollResult = {
                characterId: memberId,
                displayName: dspName,
                classId: result.classId,
                subclassId: result.subclassId,
        }

        if (partyResult) {
            const newParty = partyResult.map(obj => {
                if (obj.characterId == memberId) {
                    return newClass
                } else {
                    return obj
                }
            })
            setPartyResult(newParty)
        }
    }

    const getIcon = (subClass: string) => {
        if (hasRolled) {
            return `../../assets/subclass-icons/${subClass}.png`
        } else {
            return `../../assets/subclass-icons/swords-icon.svg`
        }
    } 

    const handleSetRerollDropdown = (member: PartyMember) => {
        if (member == showReroll) {
            setShowReroll(null)
        } else {
            setShowReroll(member)
        }
    }

    const handleRerollDropdownClass = (member: PartyMember) => {
        if (member == showReroll) {
            return "flex flex-col items-center bg-background-generator-secondary p-2 rounded-xl absolute left-4 bottom-4 z-10 h-fit"
        } else {
            return "hidden"
        }
    }

    const handleLockPartymember = (memberId: string) => {
        const copy = [...lockedMembers, memberId]
        setLockedMembers(copy)
    }

    const handleUnlockPartymember = (memberId: string) => {
        const filtered = lockedMembers.filter(mbr => mbr !== memberId)

        setLockedMembers(filtered)
    }

    const getLockIcon = (memberId: string) => {
        return lockedMembers.includes(memberId)
    }

    const partymemberOutputClass: string = "flex items-center w-full lg:h-[113px] p-2 border-b-1 border-b-text-primary justify-between lg:justify-evenly"
    const partyRollButtonClass: string = "bg-button-primary text-button-text w-50 mt-5 rounded-xl py-4 text-center text-xl font-bold hover:bg-button-hover"
    const partymemberIconClass: string = "size-[50px] lg:size-[100px]"

    const buttonPrimaryClass: string = "bg-button-primary text-button-text rounded-xl text-center text-xl font-bold hover:bg-button-hover"
    const buttonSecondaryClass: string = `${hasRolled ? '' : 'hidden'} bg-button-secondary text-button-text-dark rounded-xl hover:bg-button-secondary-hover`
    const rerollIconClass: string = `w-[20px] stroke-text-primary stroke-20`
    const unlockedIconClass: string = `size-[20px] stroke-text-primary stroke-15 ml-4`
    const lockedIconClass: string = `size-[20px] stroke-text-primary stroke-10 ml-4 fill-text-primary`

    return (
    <div className="flex bg-background-generator-primary w-[80%] p-2 lg:pt-10 lg:p-3 lg:px-10 justify-center items-center rounded-xl">
            <div className="flex flex-col items-center w-full" ref={ref}>
                    {partyResult.map(member => {
                        if (member.classId && member.subclassId) {
                        
                        const memberId = member.characterId
                        const displayName = member.displayName
                        const memberClassId = member.classId
                        const memberClassName = getDisplayName(memberClassId)
                        const memberSubclassId = member.subclassId
                        const memberSubclassName = memberSubclassId ? getDisplayName(memberSubclassId) : memberSubclassId
                        
                        const iconPath = getIcon(memberSubclassId)
                        const useIcon = new URL(`${iconPath}`, import.meta.url).href

                        const rerollDropdownClass = handleRerollDropdownClass(member)
                        const locked = getLockIcon(memberId)

                        if (partyResult.length == 1) {
                            return (
                                <div key={memberId} id="class-stats-panel" className="flex flex-col w-full items-center">
                                    <img src={useIcon} className="w-[200px]"></img>
                                    <div className="flex flex-col items-center">
                                        <span className="text-text-primary font-bold text-4xl">{hasRolled ? memberClassName : ' '}</span>
                                        <span className="text-text-secondary text-3xl mt-2">{hasRolled ? memberSubclassName : ' '}</span>
                                    </div>
                                    <button onClick={() => handleRerollPartymemberSubclass(memberId, memberClassId)} className={`${buttonSecondaryClass} w-40 py-3 mt-3 border-[2px] border-button-primary`}>Reroll Subclass</button>
                                </div>
                            )   
                        }
                        return (
                            <div key={memberId} className={`partymember-class-output-wrapper ${partymemberOutputClass}`}>
                                <p className="text-text-primary w-[10%] xl:w-[25%] font-bold text-center text-xs lg:text-xl">{displayName}</p>
                                <div className="flex items-center justify-left w-[50%] lg:w-[50%] xl:w-[300px]">
                                    <img src={useIcon} className={partymemberIconClass}></img>
                                    <div className="ml-1 lg:ml-4">
                                        <p className="font-semibold lext-s lg:text-2xl text-text-primary">{memberClassName}</p>
                                        <p className="text-text-primary text-xs lg:text-xl">{memberSubclassName}</p>
                                    </div>
                                </div>
                                <div className="relative w-[10%] justify-items-end">
                                    <div className="flex">
                                        <D20svg className={rerollIconClass} onClick={() => handleSetRerollDropdown(member)} />
                                        {locked ? (
                                            <LockedIcon className={lockedIconClass} onClick={() => handleUnlockPartymember(memberId)}/>
                                        ) : (
                                            <UnlockedSideIcon className={unlockedIconClass} onClick={() => handleLockPartymember(memberId)}/>
                                        )
                                        }                                
                                    </div>
                                    <div className={rerollDropdownClass}>
                                        <p className="text-text-primary text-bold">Reroll</p>
                                        <button onClick={() => handleRerollPartymember(memberId)} className={`${buttonPrimaryClass} w-10 xl:w-25 text-xs mb-2 font-normal`}>Class</button>
                                        <button onClick={() => handleRerollPartymemberSubclass(memberId, memberClassId)} className={`${buttonSecondaryClass} w-10 xl:w-25 text-xs`}>Subclass</button>
                                    </div>
                                </div>
                            </div>
                        )
                    }})}
                    <button className={partyRollButtonClass} onClick={() => handleRollParty(partyResult)}>{hasRolled ? 'Reroll' : 'Roll'}</button>
                </div>
        </div>
    )
}