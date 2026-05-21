import { BG3_Classes, type Bg3ClassId, type Bg3SubclassId } from '../../types/bg3-classes'
import { type PartyMember } from '../../types/bg3-partymember'
import { Bg3_Races, type Bg3RaceId, type Bg3SubraceId, companionBackgrounds } from "../../types/bg3-races"
import { Bg3_Backgrounds, type Bg3BackgroundId } from "../../types/bg3-backgrounds"
import { companionNames } from '../../context-providers/generator-provider'
import { getRandom } from './party-generator-engine'

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



export function new_getClass(duplicates: boolean, usedClasses: Set<Bg3ClassId>) {

  let availClasses: Bg3ClassId[] = []

  if (!duplicates) {
    availClasses = classArr.filter(cls => !usedClasses.has(cls))
  } else if (duplicates) {
    availClasses = classArr
  }

  const charClass: Bg3ClassId = getRandom(availClasses)

  const subclassArr = BG3_Classes[charClass].subclasses as (Record<string, { name: string }>)
  const charSubclass = getRandom(Object.keys(subclassArr))

  return {
    classId: charClass,
    className: BG3_Classes[charClass].name,
    subclassId: charSubclass,
    subclassName: BG3_Classes[charClass].subclasses[charSubclass].name
  }
}

export function new_getRace(memberName: string) {

  const isOrigin: boolean = companionNames.includes(memberName)

  if (isOrigin) {
    return companionBackgrounds[memberName].raceId
  } 

  let rolledRace: Bg3RaceId = randItem(raceArr)

  let subraces = Object.keys(Bg3_Races[rolledRace].subraces)

  if (subraces.length > 0) {
    let subraceArr = subraces as (keyof typeof subraces)[]
    return randItem(subraceArr)
  } 

  return rolledRace
}

            // // Background 
            
            //     If party contains the dark urge: 
            //         filter background array for does not equal "the haunted one"
            //         return random background from filtered array
                
            //     Else return random background from standard background array

            //     Assign to party member object as background id value

export function new_getBackground(memberName: string, hasDurge: boolean) {

  const isOrigin: boolean = companionNames.includes(memberName)
  let backgrounds: Bg3BackgroundId[] = backgroundArr
 
  if (isOrigin) {
    return companionBackgrounds[memberName].backgroundId
  }

  if (hasDurge) {backgrounds = backgroundArr.filter(bkg => bkg !== "haunted-one")}

  return getRandom(backgroundArr)
}
