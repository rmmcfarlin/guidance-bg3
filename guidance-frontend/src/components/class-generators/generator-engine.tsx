import { BG3_Classes, type Bg3ClassId, type Bg3SubclassId } from '../../types/bg3-classes'
import { type PartyMember } from './party-selector-menu'
import { Bg3_Races, type Bg3SubraceId, type Bg3RaceId, companionBackgrounds } from "../../types/bg3-races"
import { Bg3_Backgrounds, type Bg3BackgroundId } from "../../types/bg3-backgrounds"

function randItem<T>(arr: readonly T[]): T {
    return arr[Math.floor(Math.random() * arr.length)]
}

const classArr: Bg3ClassId[] = Object.keys(BG3_Classes.classes) as Bg3ClassId[]
const raceArr: Bg3RaceId[] = Object.keys(Bg3_Races) as Bg3RaceId[]
const backgroundArr: Bg3BackgroundId[] = Object.keys(Bg3_Backgrounds) as Bg3BackgroundId[]


export function getClass() {
  const rolledClass = randItem(classArr)

  const subclasses =
    BG3_Classes.classes[rolledClass].subclasses as Record<string, { name: string }>

  const rolledSubclass = randItem(Object.keys(subclasses))

  return {
    classId: rolledClass,
    className: BG3_Classes.classes[rolledClass].name,
    subclassId: rolledSubclass,
    subclassName: subclasses[rolledSubclass].name,
  }
}

export function rerollSubclass (cls: Bg3ClassId) {

  const subclasses = BG3_Classes.classes[cls].subclasses as Record<string, {name: string}>
  const rolledSubclass = randItem(Object.keys(subclasses))

  return {
    classId: cls,
    className: BG3_Classes.classes[cls].name,
    subclassId: rolledSubclass,
    subclassName: subclasses[rolledSubclass].name
  }
}


export function getPartyClasses (party: PartyMember[]) {

  let result = []

  for (let i = 0; i < party.length; i++) {
    let rolledClass = randItem(classArr)
    let subclasses = BG3_Classes.classes[rolledClass].subclasses as Record<string, { name: string }>
    let rolledSubclass = randItem(Object.keys(subclasses))

    let memberResult = {
        memberName: party[i],
        classId: rolledClass,
        className: BG3_Classes.classes[rolledClass].name,
        subclassId: rolledSubclass,
        subclassName: subclasses[rolledSubclass].name 
    }

    result.push(memberResult)
  }

  return result
}

export function getCharacter (party: PartyMember[])  {

  let result = []
  const includesDurge = party.includes("Durge")

  for (let i = 0; i < party.length; i++) {

    if (party[i] == "Tav") {
      let rolledRace = randItem(raceArr)
      let raceName = Bg3_Races[rolledRace].name
      let raceId = rolledRace

      let subraces = Bg3_Races[rolledRace].subraces
      let rolledSubrace = null

      if (Bg3_Races[rolledRace].subraces) {
        let subraceArr = Object.keys(Bg3_Races[rolledRace].subraces) as (keyof typeof subraces)[]
          rolledSubrace = randItem(subraceArr)

          raceId = rolledSubrace
          raceName = Bg3_Races[rolledRace].subraces[rolledSubrace].name
      }


      let backgrounds = backgroundArr

      if (includesDurge) {
          backgrounds = backgrounds.filter(bkg => bkg !== "haunted-one")
        }

      let rolledBackground = randItem(backgrounds)

      let memberResult = {
        raceId: raceId,
        raceName: raceName,
        backgroundId: rolledBackground,
        backgroundName: Bg3_Backgrounds[rolledBackground].name
      }

      result.push(memberResult)
    } else {
      let memberResult = originCharBackgrounds[party[i]]
      result.push(memberResult)
    }
  }
}