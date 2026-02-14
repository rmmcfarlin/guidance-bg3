import { createContext, useContext, useState } from "react";
import { type ReactNode } from 'react'
import { type PartyMember } from "../components/class-generators/party-selector-menu";
import { type Bg3ClassId } from "../types/bg3-classes";
import { type Bg3PlayableRaceId } from "../types/bg3-races";
import { type Bg3BackgroundId } from "../types/bg3-backgrounds";

export interface GeneratorContext {
    hasRolled: boolean
    setHasRolled: React.Dispatch<React.SetStateAction<boolean>>
    selectedParty: PartyMember[]
    setSelectedParty: React.Dispatch<React.SetStateAction<PartyMember[]>>
    partyResult: PartyRollResultOrNull
    setPartyResult: React.Dispatch<React.SetStateAction<PartyRollResultOrNull>>
    tavCounter: number
    setTavCounter: React.Dispatch<React.SetStateAction<number>>
}

export interface PartymemberRollResult {
        memberName: PartyMember
        classId: Bg3ClassId
        className: string
        subclassId: string
        subclassName: string
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

export type PartyRollResult = PartymemberRollResult[]
export type PartyCharacterResult = CharacterRollResult[]
export type PartyResult = PartyRollResult | PartyCharacterResult

export type PartyRollResultOrNull = PartyRollResult | null

const GeneratorContext = createContext<GeneratorContext | undefined>(undefined)

export const GeneratorProvider = ({ children }: {children: ReactNode}) => {

    const [hasRolled, setHasRolled] = useState<boolean>(false)
    const [selectedParty, setSelectedParty] = useState<PartyMember[]>([
        "Tav"
    ])
    const [partyResult, setPartyResult] = useState<PartyRollResultOrNull>(null)
    const [tavCounter, setTavCounter] = useState<number>(1)

    const value = {
        hasRolled,
        setHasRolled,
        selectedParty,
        setSelectedParty,
        partyResult,
        setPartyResult,
        tavCounter,
        setTavCounter
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