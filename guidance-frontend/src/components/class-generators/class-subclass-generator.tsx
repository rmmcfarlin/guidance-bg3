import type { Bg3ClassId, Bg3SubclassId } from "../../types/bg3-classes"
import { getClass, rerollSubclass, getPartyClasses } from "./generator-engine"
import { useState } from 'react'
import { type PartyMember } from "./party-selector-menu"
import "./class-generator.css"

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

    const [hasRolled, setHasRolled] = useState<boolean>(false)
    const [result, setResult] = useState<RollResult>({
        'classId': 'cleric',
        'className': '',
        'subclassId': '',
        'subclassName': ''
    })
    const [partyResult, setPartyResult] = useState<PartyRollResultOrNull>(null)

    const { className, subclassId, subclassName } = result

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

    console.log(partyResult)

    const getIcon = (subClass: string) => {
        if (hasRolled) {
            return `../../assets/subclass-icons/${subClass}.png`
        } else {
            return `../../assets/subclass-icons/swords-icon.svg`
        }
    } 
    const iconPath = getIcon(subclassId)
    const useIcon = new URL(`${iconPath}`, import.meta.url).href

    const partymemberOutputClass: string = "flex items-center w-full p-2 border-b-1 border-b-text-primary last:border-b-0"
    const partyRollButtonClass: string = "bg-button-primary text-button-text w-50 mt-5 rounded-xl py-4 text-center text-xl font-bold hover:bg-button-hover"
    const partymemberIconClass: string = "size-[100px]"


    return (
        <div className="flex bg-background-generator-primary w-[80%] p-2 pt-10 lg:p-3 lg:px-10 justify-center items-center rounded-xl">
            {selectedParty.length == 1 ? (
                    <div id="class-stats-panel" className="flex flex-col w-full items-center">
                        <img src={useIcon} className="w-[200px]"></img>
                        <div className="flex flex-col items-center">
                            <span className="text-text-primary font-bold text-4xl">{hasRolled ? className : ' '}</span>
                            <span className="text-text-secondary text-3xl mt-2">{hasRolled ? subclassName : ' '}</span>
                        </div>
                        <div className="flex flex-col items-center mt-10">
                            <button onClick={() => handleRollClass()} className="bg-button-primary text-button-text w-50 rounded-xl py-4 text-center text-xl font-bold hover:bg-button-hover">Roll</button>
                            <button onClick={() => handleRerollSubclass(result.classId)} className="bg-button-secondary text-button-text-dark w-40 rounded-xl py-3 mt-3 hover:bg-button-secondary-hover">Reroll Subclass</button>
                        </div>
                    </div>
            ) : (
                <div className="flex flex-col items-center w-full">
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

                        return(
                            <div key={`${member}-output`} className={`partymember-class-output-wrapper ${partymemberOutputClass}`}>
                                <p className="text-text-primary w-[20%] font-bold mr-10">{member}</p>
                                <div className="flex items-center">
                                    <img src={useIcon} className={partymemberIconClass}></img>
                                    <div className="ml-4">
                                        <p className="font-semibold text-2xl text-text-primary">{memberClassName}</p>
                                        <p className="text-text-primary">{memberSubclassName}</p>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                    <button className={partyRollButtonClass} onClick={() => handleRollParty(selectedParty)}>Roll</button>
                </div>
            )}
        </div>
    )
}