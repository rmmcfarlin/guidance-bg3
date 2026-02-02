import { BG3_Classes, type Bg3ClassId, type Bg3SubclassId } from '../../types/bg3-classes'

function randItem<T>(arr: readonly T[]): T {
    return arr[Math.floor(Math.random() * arr.length)]
}

const classArr: Bg3ClassId[] = Object.keys(BG3_Classes.classes) as Bg3ClassId[]


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
