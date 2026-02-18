import { BG3_Classes, type Bg3ClassId } from '../../types/bg3-classes'
import { type PartyMember } from '../../types/bg3-partymember'
import { Bg3_Races, type Bg3RaceId, companionBackgrounds } from "../../types/bg3-races"
import { Bg3_Backgrounds, type Bg3BackgroundId } from "../../types/bg3-backgrounds"
import { companionNames } from '../../context-providers/generator-provider'

function randItem<T>(arr: readonly T[]): T {
    return arr[Math.floor(Math.random() * arr.length)]
}

const classArr: Bg3ClassId[] = Object.keys(BG3_Classes) as Bg3ClassId[]
const raceArr: Bg3RaceId[] = Object.keys(Bg3_Races) as Bg3RaceId[]
const backgroundArr: Bg3BackgroundId[] = Object.keys(Bg3_Backgrounds) as Bg3BackgroundId[]


export function getClass() {
  const rolledClass = randItem(classArr)

  const subclasses = BG3_Classes[rolledClass].subclasses as (Record<string, { name: string }>)
  const rolledSubclass = randItem(Object.keys(subclasses))

  return {
    classId: rolledClass,
    className: BG3_Classes[rolledClass].name,
    subclassId: rolledSubclass,
    subclassName: subclasses[rolledSubclass].name,
  }
}

export function rerollSubclass (cls: Bg3ClassId) {

  const subclasses = BG3_Classes[cls].subclasses as (Record<string, { name: string }>)
  const rolledSubclass = randItem(Object.keys(subclasses))

  return {
    classId: cls,
    className: BG3_Classes[cls].name,
    subclassId: rolledSubclass,
    subclassName: subclasses[rolledSubclass].name
  }
}


export function getPartyClasses (party: PartyMember[]) {

  let result = []

  for (let i = 0; i < party.length; i++) {
    let rolledClass = randItem(classArr)
    let subclasses = BG3_Classes[rolledClass].subclasses as Record<string, { name: string }>
    let rolledSubclass = randItem(Object.keys(subclasses))

    let memberResult = {
        characterId: party[i].characterId,
        displayName: party[i].displayName,
        classId: rolledClass,
        subclassId: rolledSubclass
    }

    result.push(memberResult)
  }

  return result
}

export function getCharacters (party: PartyMember[])  {

  let result = []
  const partyIds = party.map(mbr => mbr.characterId)
  const includesDurge = partyIds.includes("durge")

  party = getPartyClasses(party)

  for (let i = 0; i < party.length; i++) {

    let id = party[i].characterId
    
    if (!companionNames.includes(party[i].displayName)) {
      let rolledRace = randItem(raceArr)
      let raceId = rolledRace

      console.log(raceId)

      let subraces = Bg3_Races[rolledRace].subraces
      let rolledSubrace = null

      if (Object.keys(Bg3_Races[rolledRace].subraces).length > 0) {
        let subraceArr = Object.keys(Bg3_Races[rolledRace].subraces) as (keyof typeof subraces)[]
          rolledSubrace = randItem(subraceArr)
          raceId = rolledSubrace
      }

      let backgrounds = backgroundArr

      if (includesDurge) {
          backgrounds = backgrounds.filter(bkg => bkg !== "haunted-one")
        }

      let rolledBackground = randItem(backgrounds)

      const memberObj = party.find(obj => obj.characterId == id)

      let memberResult = {
        ...memberObj,
        raceId: raceId,
        backgroundId: rolledBackground
      }

      result.push(memberResult)
    } else {
      let memberObj = party.find(obj => obj.characterId == id)
      let memberResult = {...memberObj, ...companionBackgrounds[id]}

      result.push(memberResult)
    }
  }
  return result
}