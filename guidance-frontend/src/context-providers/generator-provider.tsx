import { createContext, useContext, useState } from "react";
import { type ReactNode } from 'react'
import { type Bg3ClassId } from "../types/bg3-classes";
import { type Bg3PlayableRaceId } from "../types/bg3-races";
import { type Bg3BackgroundId } from "../types/bg3-backgrounds";
import { type PartyMember } from "../types/bg3-partymember";

export interface GeneratorContext {
    hasRolled: boolean
    setHasRolled: React.Dispatch<React.SetStateAction<boolean>>
    // selectedParty: PartyMember[]
    // setSelectedParty: React.Dispatch<React.SetStateAction<PartyMember[]>>
    partyResult: PartyMember[]
    setPartyResult: React.Dispatch<React.SetStateAction<PartyMember[]>>
    tavCounter: number
    setTavCounter: React.Dispatch<React.SetStateAction<number>>
    getMemberId: (name: CompanionName) => string
}

export type CompanionName = 
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
    "Durge"|
    "Tav"

export const companionNames: string[] = [
    "Astarion",
    "Gale",
    "Laezel",
    "Shadowheart",
    "Wyll",
    "Karlach",
    "Minthara",
    "Halsin",
    "Jaheira",
    "Minsc",
    "Durge"
]
    
export type PartyMemberOrNull = PartyMember | null

export interface ClassRollResult {
        characterId: string
        displayName: string
        classId: Bg3ClassId
        subclassId: string
}

export interface CharacterRollResult {
    classId: Bg3ClassId
    className: string
    subclassId: string
    subclassName: string
    raceId: Bg3PlayableRaceId
    raceName: string
    backgroundId: Bg3BackgroundId
    backgroundName: string
}

export type PartyResult = PartyMember[]

const GeneratorContext = createContext<GeneratorContext | undefined>(undefined)

export const GeneratorProvider = ({ children }: {children: ReactNode}) => {

    const [hasRolled, setHasRolled] = useState<boolean>(false)
    // const [selectedParty, setSelectedParty] = useState<PartyMember[]>([
    //     {characterId: "tav-1", displayName: "Tav"}
    // ])
    const [partyResult, setPartyResult] = useState<PartyResult>([
        {characterId: "tav-1", displayName: "Tav"}
    ])
    const [tavCounter, setTavCounter] = useState<number>(1)

    const getMemberId = (name: CompanionName | string) => {
    if (name !== "Tav") {
        return name.toLowerCase()
    } else {
        let counter = tavCounter
        setTavCounter(prev => prev + 1)
        return `tav-${counter}`
    }
    
}

    const value = {
        hasRolled,
        setHasRolled,
        // selectedParty,
        // setSelectedParty,
        partyResult,
        setPartyResult,
        tavCounter,
        setTavCounter,
        getMemberId
    }

    return(
        <GeneratorContext.Provider value={value}>
            {children}
        </GeneratorContext.Provider>
    )
}

export const useGeneratorContext = () => {
    const ctx = useContext(GeneratorContext)
    if (!ctx) {
        throw new Error('useGeneratorContext must be used within generator provider')
    }
    return ctx
}