import type { AbilityStats } from "../../types/bg3-build-info/bg3-stats"

interface StatsDisplayProps {
    statsContainerClass: string
    statsHeaderClass: string
    statsNumberClass: string
    charStats: AbilityStats
}


export const StatsDisplay = ({statsContainerClass, statsHeaderClass, statsNumberClass, charStats}: StatsDisplayProps) => {

    return (
        <div id={`stats-display`} className={statsContainerClass}>
            <div className="flex flex-col justify-center">
                <p className={statsHeaderClass}>STR</p>
                <p className={statsNumberClass}>{charStats.strength}</p>
            </div>
            <div>
                <p className={statsHeaderClass}>DEX</p>
                <p className={statsNumberClass}>{charStats.dexterity}</p>
            </div>
            <div>
                <p className={statsHeaderClass}>CON</p>
                <p className={statsNumberClass}>{charStats.constitution}</p>
            </div>
            <div>
                <p className={statsHeaderClass}>INT</p>
                <p className={statsNumberClass}>{charStats.intelligence}</p>
            </div>
            <div>
                <p className={statsHeaderClass}>WIS</p>
                <p className={statsNumberClass}>{charStats.wisdom}</p>
            </div>
            <div>
                <p className={statsHeaderClass}>CHA</p>
                <p className={statsNumberClass}>{charStats.charisma}</p>
            </div>
        </div>
    )
}