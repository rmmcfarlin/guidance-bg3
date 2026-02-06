import { createContext, useContext, useState } from "react";
import { type ReactNode } from 'react'
import { type PartyMember } from "../components/class-generators/party-selector-menu";
import { type Bg3ClassId } from "../types/bg3-classes";

export interface GeneratorContext {
    hasRolled: boolean
    setHasRolled: React.Dispatch<React.SetStateAction<boolean>>
    selectedParty: PartyMember[]
    setSelectedParty: React.Dispatch<React.SetStateAction<PartyMember[]>>
    partyResult: PartyRollResultOrNull
    setPartyResult: React.Dispatch<React.SetStateAction<PartyRollResultOrNull>>
}

export interface PartymemberRollResult {
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

const GeneratorContext = createContext<GeneratorContext | undefined>(undefined)

export const GeneratorProvider = ({ children }: {children: ReactNode}) => {

    const [hasRolled, setHasRolled] = useState<boolean>(false)
    const [selectedParty, setSelectedParty] = useState<PartyMember[]>([
        "Tav"
    ])
    const [partyResult, setPartyResult] = useState<PartyRollResultOrNull>(null)

    return(
        <GeneratorContext.Provider value={{ hasRolled, setHasRolled, selectedParty, setSelectedParty, partyResult, setPartyResult }}>
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