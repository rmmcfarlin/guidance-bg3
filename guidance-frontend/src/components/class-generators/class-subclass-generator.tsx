import { getClass } from "./generator-engine"
import { useState } from 'react'
import Bg3ClassData from './class-data.json'
import icon from '../../assets/subclass-icons/swords.png'

interface RollResult {
    classId: string
    className: string
    subclassId: string
    subclassName: string
}

export const ClassSubclassGenerator = ({}) => {

    const [hasRolled, setHasRolled] = useState<boolean>(false)
    const [result, setResult] = useState<RollResult>({
        'classId': '',
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

    const getIcon = () => {
        if (hasRolled) {
            return `../../assets/subclass-icons/${subclassId}.png`
        } else {
            return `../../assets/subclass-icons/gale-avatar.png`
        }
    } 
    const iconPath = getIcon()
    const useIcon = new URL(`${iconPath}`, import.meta.url).href
    

    return(
        <div className="flex w-full p-3 pt-10 lg:p-10 justify-center items-center">
            <div id="class-stats-panel" className="flex flex-col w-full items-center">
                <img src={useIcon} className="w-[200px]"></img>
                <div className="flex flex-col items-center">
                    <span className="text-text-primary font-bold text-4xl">{hasRolled ? className : ''}</span>
                    <span className="text-text-secondary text-3xl mt-2">{hasRolled ? subclassName : ''}</span>
                </div>
                <div className="flex flex-col items-center mt-10">
                    <button onClick={() => handleRollClass()} className="bg-button-primary text-button-text w-50 rounded-xl py-4 text-center text-xl font-bold">Roll</button>
                    <button className="bg-button-secondary text-button-text w-20 rounded-xl">Reroll Subclass</button>
                </div>
            </div>
            
        </div>
    )
}