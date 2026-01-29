import { BG3_Classes, type Bg3ClassId, type Bg3SubclassId } from '../../types/bg3-classes'

function randItem<T>(arr: readonly T[]): T {
    return arr[Math.floor(Math.random() * arr.length)]
}

const classArr: Bg3ClassId[] = Object.keys(BG3_Classes.classes) as Bg3ClassId[]

export function getClass() {
    return randItem(classArr)
}

export function getSubclass<C extends Bg3ClassId> (c: C): Bg3SubclassId<C>{

    const subclassArr = Object.keys(BG3_Classes.classes[c].subclasses) as Bg3SubclassId<C>[]

    return randItem(subclassArr)
}
