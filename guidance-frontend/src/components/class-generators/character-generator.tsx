import { type Bg3ClassId } from "../../types/bg3-classes"
import { type Bg3PlayableRaceId } from "../../types/bg3-races"
import { type Bg3BackgroundId } from "../../types/bg3-backgrounds"


export interface CharacterRollResult {
    classId: Bg3ClassId
    className: string
    subclassId: string
    subclassName: string
    raceId: Bg3PlayableRaceId
    raceName: string
    backgroundId: Bg3BackgroundId
    backgroundName: string
}


export const CharacterGenerator = ({}) => {

    return(
        <div className="flex bg-background-generator-primary w-[80%] p-2 lg:pt-10 lg:p-3 lg:px-10 justify-center items-center rounded-xl">
            <p>Character Generator</p>
        </div>
    )
}