import { getClass, getSubclass } from "./generator-engine"
import { useState } from 'react'
import { type Bg3ClassId, type Bg3SubclassId } from "../../types/bg3-classes"
import Bg3ClassData from './class-data.json'

export const ClassSubclassGenerator = ({}) => {

    const [hasRolled, setHasRolled] = useState<boolean>(false)

    const rolledClassId = getClass()
    const rolledClassName = Bg3ClassData.classes[rolledClassId].name

    const rolledSubclassId = getSubclass(rolledClassId)
    const rolledSubclassName = Bg3ClassData.classes[rolledClassId].subclasses[rolledSubclassId].name


    return(
        <div>
            <div>
                <img></img>
                <div>
                    <span>{hasRolled ? rolledClassName : ''}</span>
                    <span>{hasRolled ? rolledSubclassName : ''}</span>
                </div>
            </div>
            <button>Roll</button>
        </div>
    )
}