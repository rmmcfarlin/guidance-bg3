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

    const { classId, className, subclassId, subclassName } = result

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

    const iconPath = "../../assets/subclass-icons/tempest.png"
    

    return(
        <div className="flex p-10 justify-between">
            <div id="class-info-panel" className="w-[70%]">
                <div className="p-4 rounded-lg">
                    <h2 className="text-2xl font-semibold mb-2 text-text-primary">Warlock — Hexblade</h2>
                    <p className="mb-4 text-text-primary">
                        The Hexblade Warlock channels mysterious powers through a sentient weapon, blending martial prowess with eldritch magic. Skilled in both offense and defense, Hexblades excel at striking quickly while leveraging their patron’s dark gifts.
                    </p>
                    <h3 className="text-xl font-semibold mb-2 text-text-primary">Key Class Features</h3>
                    <ul className="list-disc list-inside mb-4 text-text-primary">
                        <li>Hexblade’s Curse — Mark a foe for bonus damage and critical hits.</li>
                        <li>Hex Warrior — Weapon proficiency and Charisma-based attacks with pact weapons.</li>
                        <li>Pact Boon — Choose between Pact of the Blade, Chain, or Tome for unique powers.</li>
                        <li>Eldritch Invocations — Customize magical abilities to suit your combat style.</li>
                    </ul>

                    <h3 className="text-xl font-semibold mb-2 text-text-primary">Tags</h3>
                    <div className="flex flex-wrap gap-2">
                        <span className="px-2 py-1 bg-accent-muted rounded-full text-text-primary text-sm">Melee</span>
                        <span className="px-2 py-1 bg-accent-muted rounded-full text-text-primary text-sm">Ranged</span>
                        <span className="px-2 py-1 bg-accent-muted rounded-full text-text-primary text-sm">Brusier</span>
                        <span className="px-2 py-1 bg-accent-muted rounded-full text-text-primary text-sm">Magic</span>
                        <span className="px-2 py-1 bg-accent-muted rounded-full text-text-primary text-sm">Patron</span>
                    </div>
                </div>

            </div>
            <div id="class-stats-panel" className="flex flex-col w-[30%] items-center">
                <img src={icon} className="w-[100px]"></img>
                <div className="flex flex-col">
                    <span className="text-text-primary text-4xl text-bold">{hasRolled ? className : ''}</span>
                    <span className="text-text-primary text-xl text-bold">{hasRolled ? subclassName : ''}</span>
                </div>
                <button onClick={() => handleRollClass()} className="bg-button-primary text-button-text w-30 rounded-xl">Roll</button>
            </div>
            
        </div>
    )
}