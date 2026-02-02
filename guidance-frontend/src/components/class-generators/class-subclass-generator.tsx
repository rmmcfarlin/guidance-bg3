import type { Bg3ClassId } from "../../types/bg3-classes"
import { getClass, rerollSubclass } from "./generator-engine"
import { useState } from 'react'

interface RollResult {
    classId: Bg3ClassId
    className: string
    subclassId: string
    subclassName: string
}

export const ClassSubclassGenerator = ({}) => {

    const [hasRolled, setHasRolled] = useState<boolean>(false)
    const [result, setResult] = useState<RollResult>({
        'classId': 'cleric',
        'className': '',
        'subclassId': '',
        'subclassName': ''
    })

    const { className, subclassId, subclassName } = result

    const handleRollClass = () => {
        const result = getClass()
        setResult(result)
        setHasRolled(true)
    }

    const handleRerollSubclass = (cls: Bg3ClassId) => {
        if (hasRolled) {
            const result = rerollSubclass(cls)
            setResult(result)
        } else {
            return
        }
       
    }

    const getIcon = () => {
        if (hasRolled) {
            return `../../assets/subclass-icons/${subclassId}.png`
        } else {
            return `../../assets/subclass-icons/swords-icon.svg`
        }
    } 
    const iconPath = getIcon()
    const useIcon = new URL(`${iconPath}`, import.meta.url).href
    

    return(            
            <div className="flex bg-background-generator-primary w-[80%] p-3 pt-10 lg:p-10 justify-center items-center rounded-xl">
                <div id="class-stats-panel" className="flex flex-col w-full items-center">
                    <img src={useIcon} className="w-[200px]"></img>
                    <div className="flex flex-col items-center">
                        <span className="text-text-primary font-bold text-4xl">{hasRolled ? className : ' '}</span>
                        <span className="text-text-secondary text-3xl mt-2">{hasRolled ? subclassName : ' '}</span>
                    </div>
                    <div className="flex flex-col items-center mt-10">
                        <button onClick={() => handleRollClass()} className="bg-button-primary text-button-text w-70 rounded-xl py-4 text-center text-xl font-bold hover:bg-button-hover">Roll</button>
                        <button onClick={() => handleRerollSubclass(result.classId)} className="bg-button-secondary text-button-text-dark w-40 rounded-xl py-3 mt-3 hover:bg-button-secondary-hover">Reroll Subclass</button>
                    </div>
                </div>
            </div>
    )
}