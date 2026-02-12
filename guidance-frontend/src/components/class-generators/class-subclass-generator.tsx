import type { Bg3ClassId, Bg3SubclassId } from "../../types/bg3-classes"
import { getClass, rerollSubclass, getPartyClasses } from "./generator-engine"
import { useState, useRef } from 'react'
import { useGeneratorContext, type PartyRollResult } from "../../context-providers/generator-provider"
import { type PartyMember, type PartyMemberOrNull } from "./party-selector-menu"
import { type PartymemberRollResult } from "../../context-providers/generator-provider"
import { useClickOutside } from "../../hooks/use-click-outside"
import "./class-generator.css"
import D20svg from '../../assets/ui-icons/d20.svg?react'
import LockedIcon from '../../assets/ui-icons/locked.svg?react'
import UnlockedSideIcon from '../../assets/ui-icons/unlocked-side.svg?react'


interface RollResult {
    classId: Bg3ClassId
    className: string
    subclassId: string
    subclassName: string
}

interface ClassSubclassProps {
    hasRolled: boolean
    setHasRolled: React.Dispatch<React.SetStateAction<boolean>>
    selectedParty: PartyMember[]
    setSelectedParty: React.Dispatch<React.SetStateAction<PartyMember[]>>
}

export const ClassSubclassGenerator = ({ hasRolled, setHasRolled, selectedParty, setSelectedParty }: ClassSubclassProps) => {
    const ref = useRef<HTMLDivElement>(null)
    const [showReroll, setShowReroll] = useState<PartyMemberOrNull>(null)
    const [result, setResult] = useState<RollResult>({
        'classId': 'cleric',
        'className': '',
        'subclassId': '',
        'subclassName': ''
    })
    const [lockedMembers, setLockedMembers] = useState<PartyMember[]>([])
    const { partyResult, setPartyResult } = useGeneratorContext()

    const { className, subclassId, subclassName } = result

    useClickOutside(ref, () => setShowReroll(null))

    const handleRollClass = () => {
        const result = getClass()
        setResult(result)
        setHasRolled(true)
    }

    const handleRerollSubclass = (cls: Bg3ClassId) => {
        if (hasRolled) {
            const result = rerollSubclass(cls)
            setResult(result)
        } else {
            return
        }
    }

    const handleRollParty = (party: PartyMember[]) => {

        const copy = party
        const getUnlockedMembers = (copy: PartyMember[]) => {
            const filtered: PartyMember[] = []
            for (let i = 0; i < copy.length; i++) {
                if (!lockedMembers.includes(copy[i])) {
                    filtered.push(copy[i])
                }
            }
            return filtered
        }

        const unlockedMembers: PartyMember[]= getUnlockedMembers(copy)
        const result: PartyRollResult = getPartyClasses(unlockedMembers)

        if (!hasRolled) {
            setPartyResult(result)
        }
        
        if (partyResult) {
            const combinedResult = partyResult.map(obj => {
                const name: PartyMember = obj.memberName
                if (unlockedMembers.includes(name)) {
                    const match = result.find(
                        r => r.memberName === name
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

    const handleRerollPartymember = (member: PartyMember) => {
        const result = getClass()

        const newClass: PartymemberRollResult = {
                memberName: member,
                classId: result.classId,
                className: result.className,
                subclassId: result.subclassId,
                subclassName: result.subclassName
            }

        if (partyResult) {
            const newParty = partyResult.map(obj => {
                if (obj.memberName == member) {
                    return newClass
                } else {
                    return obj
                }
            })
            setPartyResult(newParty)
        }
    }

    const handleRerollPartymemberSubclass = (member: PartyMember, cls: Bg3ClassId) => {

        const result = rerollSubclass(cls)
        const newClass: PartymemberRollResult = {
                memberName: member,
                classId: result.classId,
                className: result.className,
                subclassId: result.subclassId,
                subclassName: result.subclassName
        }

        if (partyResult) {
            const newParty = partyResult.map(obj => {
                if (obj.memberName == member) {
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

    const handleLockPartymember = (member: PartyMember) => {
        const copy = [...lockedMembers, member]
        setLockedMembers(copy)
    }

    const handleUnlockPartymember = (member: PartyMember) => {
        const copy = lockedMembers
        const filtered = copy.filter(mbr => mbr !== member)

        setLockedMembers(filtered)
    }

    const getLockIcon = (member: PartyMember) => {
        return lockedMembers.includes(member)
    }

    const iconPath = getIcon(subclassId)
    const useIcon = new URL(`${iconPath}`, import.meta.url).href

    const partymemberOutputClass: string = "flex items-center w-full lg:h-[113px] p-2 border-b-1 border-b-text-primary justify-between lg:justify-evenly"
    const partyRollButtonClass: string = "bg-button-primary text-button-text w-50 mt-5 rounded-xl py-4 text-center text-xl font-bold hover:bg-button-hover"
    const partymemberIconClass: string = "size-[50px] lg:size-[100px]"

    const buttonPrimaryClass: string = "bg-button-primary text-button-text rounded-xl text-center text-xl font-bold hover:bg-button-hover"
    const buttonSecondaryClass: string = `${hasRolled ? '' : 'hidden'} ${selectedParty.length == 1 ? '' : 'hidden'} bg-button-secondary text-button-text-dark rounded-xl hover:bg-button-secondary-hover`
    const rerollIconClass: string = `w-[20px] stroke-text-primary stroke-20`
    const unlockedIconClass: string = `size-[20px] stroke-text-primary stroke-15 ml-4`
    const lockedIconClass: string = `size-[20px] stroke-text-primary stroke-10 ml-4 fill-text-primary`

    return (
    <div className="flex bg-background-generator-primary w-[80%] p-2 lg:pt-10 lg:p-3 lg:px-10 justify-center items-center rounded-xl">
            <div className="flex flex-col items-center w-full" ref={ref}>
                    {selectedParty.map(member => {

                        if (!partyResult) return null

                        const index = selectedParty.indexOf(member)
                        const memberKey = member
                        const memberData = partyResult[index]
                        const memberClassId = memberData.classId
                        const memberClassName = memberData.className
                        const memberSubclassId = memberData.subclassId
                        const memberSubclassName = memberData.subclassName

                        const iconPath = getIcon(memberSubclassId)
                        const useIcon = new URL(`${iconPath}`, import.meta.url).href

                        const rerollDropdownClass = handleRerollDropdownClass(member)
                        const locked = getLockIcon(member)

                        if (selectedParty.length == 1) {
                            return (
                                <div id="class-stats-panel" className="flex flex-col w-full items-center">
                                    <img src={useIcon} className="w-[200px]"></img>
                                    <div className="flex flex-col items-center">
                                        <span className="text-text-primary font-bold text-4xl">{hasRolled ? memberClassName : ' '}</span>
                                        <span className="text-text-secondary text-3xl mt-2">{hasRolled ? memberSubclassName : ' '}</span>
                                    </div>
                                    <button onClick={() => handleRerollPartymemberSubclass(member, memberClassId)} className={`${buttonSecondaryClass} w-40 py-3 mt-3 border-[2px] border-button-primary`}>Reroll Subclass</button>
                                </div>
                            )   
                        }
                        return (
                            <div key={`${member}-output`} className={`partymember-class-output-wrapper ${partymemberOutputClass}`}>
                                <p className="text-text-primary w-[10%] xl:w-[25%] font-bold text-center text-xs lg:text-xl">{member}</p>
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
                                            <LockedIcon className={lockedIconClass} onClick={() => handleUnlockPartymember(member)}/>
                                        ) : (
                                            <UnlockedSideIcon className={unlockedIconClass} onClick={() => handleLockPartymember(member)}/>
                                        )
                                        }                                
                                    </div>
                                    <div className={rerollDropdownClass}>
                                        <p className="text-text-primary text-bold">Reroll</p>
                                        <button onClick={() => handleRerollPartymember(member)} className={`${buttonPrimaryClass} w-10 xl:w-25 text-xs mb-2 font-normal`}>Class</button>
                                        <button onClick={() => handleRerollPartymemberSubclass(member, memberClassId)} className={`${buttonSecondaryClass} w-10 xl:w-25 text-xs`}>Subclass</button>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                    <button className={partyRollButtonClass} onClick={() => handleRollParty(selectedParty)}>{hasRolled ? 'Reroll' : 'Roll'}</button>
                </div>
        </div>
    )
}