import { BG3_Classes, type Bg3ClassId } from "../../types/bg3-classes"
import { type PartyMember } from "../../types/bg3-partymember"
import { type Bg3RaceId, Bg3_Races} from "../../types/bg3-races"

// Party Member Result Object

const buildResult: PartyMember = {
    characterId: "",
    displayName: "",
    classId: "",
    subclassId: "",

    raceId: "",
    backgroundId: undefined,

}

export function getRandom (arr: any[]) {
    const randIndex: number = Math.floor(Math.random() * arr.length)
    return arr[randIndex]
}

// Classes & Subclasses 

export function getClass (noDuplicates: boolean, curResults: Bg3ClassId[] | []) {
    const classArr: Bg3ClassId[] = Object.keys(BG3_Classes)

    if (noDuplicates && curResults.length >= 1) {
        const filteredArr: Bg3ClassId[] = classArr.filter(cls => !classArr.includes(cls))
        return getRandom(filteredArr)
    }

    return getRandom(classArr)
}

export function getSubclass (cls: Bg3ClassId) {
    const subclassArr = Object.keys(BG3_Classes[cls])
    return getRandom(subclassArr)
}

// Race & Background

export function getRace (characterId: string) {
    const raceArr: Bg3RaceId[] = Object.keys(Bg3_Races)
}