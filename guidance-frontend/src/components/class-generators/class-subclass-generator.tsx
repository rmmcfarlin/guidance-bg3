import type { Bg3ClassId, Bg3SubclassId } from "../../types/bg3-classes"
import { getClass, rerollSubclass, getPartyClasses } from "./generator-engine"
import { useState, useRef } from 'react'
import { type PartyMember, type PartyMemberOrNull } from "./party-selector-menu"
import { useClickOutside } from "../../hooks/use-click-outside"
import "./class-generator.css"
import D20svg from '../../assets/ui-icons/d20.svg?react'

interface RollResult {
    classId: Bg3ClassId
    className: string
    subclassId: string
    subclassName: string
}

interface PartymemberRollResult {
    [x: string]: {
        memberName: PartyMember
        classId: Bg3ClassId
        className: string
        subclassId: string
        subclassName: string
    }
}

export type PartyRollResult = PartymemberRollResult[]
export type PartyRollResultOrNull = PartyRollResult | null

interface ClassSubclassProps {
    selectedParty: PartyMember[]
    setSelectedParty: React.Dispatch<React.SetStateAction<PartyMember[]>>
}

export const ClassSubclassGenerator = ({ selectedParty, setSelectedParty }: ClassSubclassProps) => {
    const ref = useRef<HTMLDivElement>(null)
    const [hasRolled, setHasRolled] = useState<boolean>(false)
    const [showReroll, setShowReroll] = useState<PartyMemberOrNull>(null)
    const [result, setResult] = useState<RollResult>({
        'classId': 'cleric',
        'className': '',
        'subclassId': '',
        'subclassName': ''
    })
    const [partyResult, setPartyResult] = useState<PartyRollResultOrNull>(null)

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
        const result = getPartyClasses(party)
        setPartyResult(result)
        setHasRolled(true)
    }

    const handleRerollPartymember = (member: PartyMember) => {
        const result = getClass()

        const newClass: PartymemberRollResult = {
            [member]: {
                memberName: member,
                classId: result.classId,
                className: result.className,
                subclassId: result.subclassId,
                subclassName: result.subclassName
            }
        }

        if (partyResult) {
            const newParty = partyResult.map(obj => {
                if (obj[member]) {
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
            [member]: {
                memberName: member,
                classId: result.classId,
                className: result.className,
                subclassId: result.subclassId,
                subclassName: result.subclassName
            }
        }

        if (partyResult) {
            const newParty = partyResult.map(obj => {
                if (obj[member]) {
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

    const iconPath = getIcon(subclassId)
    const useIcon = new URL(`${iconPath}`, import.meta.url).href

    const partymemberOutputClass: string = "flex items-center w-full p-2 border-b-1 border-b-text-primary justify-between lg:justify-evenly"
    const partyRollButtonClass: string = "bg-button-primary text-button-text w-50 mt-5 rounded-xl py-4 text-center text-xl font-bold hover:bg-button-hover"
    const partymemberIconClass: string = "size-[50px] lg:size-[100px]"

    const buttonPrimaryClass: string = "bg-button-primary text-button-text rounded-xl text-center text-xl font-bold hover:bg-button-hover"
    const buttonSecondaryClass: string = `${hasRolled ? '' : 'hidden'} bg-button-secondary text-button-text-dark rounded-xl hover:bg-button-secondary-hover`
    const rerollIconClass: string = `w-[20px] stroke-text-primary stroke-20`
    
    return (
        <div className="flex bg-background-generator-primary w-[80%] p-2 lg:pt-10 lg:p-3 lg:px-10 justify-center items-center rounded-xl">
            {selectedParty.length == 1 ? (
                    <div id="class-stats-panel" className="flex flex-col w-full items-center">
                        <img src={useIcon} className="w-[200px]"></img>
                        <div className="flex flex-col items-center">
                            <span className="text-text-primary font-bold text-4xl">{hasRolled ? className : ' '}</span>
                            <span className="text-text-secondary text-3xl mt-2">{hasRolled ? subclassName : ' '}</span>
                        </div>
                        <div className="flex flex-col items-center mt-10">
                            <button onClick={() => handleRollClass()} className={`${buttonPrimaryClass} w-50 py-4`}>{hasRolled ? 'Reroll' : 'Roll'}</button>
                            <button onClick={() => handleRerollSubclass(result.classId)} className={`${buttonSecondaryClass} w-40 py-3 mt-3`}>Reroll Subclass</button>
                        </div>
                    </div>
            ) : (
                <div className="flex flex-col items-center w-full" ref={ref}>
                    {selectedParty.map(member => {

                        if (!partyResult) return null

                        const index = selectedParty.indexOf(member)
                        const memberKey = member
                        const memberData = partyResult[index][memberKey]

                        const memberClassId = memberData.classId
                        const memberClassName = memberData.className
                        const memberSubclassId = memberData.subclassId
                        const memberSubclassName = memberData.subclassName

                        const iconPath = getIcon(memberSubclassId)
                        const useIcon = new URL(`${iconPath}`, import.meta.url).href

                        const rerollDropdownClass = handleRerollDropdownClass(member)

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
                                <div className="relative">
                                    <D20svg className={rerollIconClass} onClick={() => handleSetRerollDropdown(member)} />
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
            )}
        </div>
    )
}