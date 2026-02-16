import { useGeneratorContext, type PartyResult } from "../../context-providers/generator-provider"
import { getDisplayName } from "../../global-functions/parse-display-name"
import { getCharacters, getPartyClasses } from "./generator-engine"
import D20svg from '../../assets/ui-icons/d20.svg?react'
import LockedIcon from '../../assets/ui-icons/locked.svg?react'
import UnlockedSideIcon from '../../assets/ui-icons/unlocked-side.svg?react'



export const CharacterGenerator = ({}) => {

    const { partyResult, setPartyResult, lockedMembers, setLockedMembers, getUnlockedMembers, hasRolled, setHasRolled} = useGeneratorContext()

    // tailwind classes
    const charOutputWrapperClass: string = "min-w-[67vw] md:min-w-[350px] h-135 flex items-center justify-center p-4 mr-6"
    const charOutputWrapperBg: string = "bg-radial from-background-char-sheet-primary to-background-char-sheet-secondary"
    const charOutputInner: string = "size-[100%] flex flex-col items-center border-1 border-accent-border p-5"
    const charOutputInnerBg: string = "bg-radial from-background-char-sheet-primary to-background-char-sheet-secondary"

    const charSubclassIconClass: string = "w-[100px]"
    const toolbarIconClass: string = "size-[25px]"
    const buttonPrimaryClass: string = "w-40 h-10 bg-button-primary text-button-text rounded-xl text-center text-xl font-bold hover:bg-button-hover mt-5"
    const buttonSecondaryClass: string = `${hasRolled ? '' : 'hidden'} bg-button-secondary text-button-text-dark rounded-xl hover:bg-button-secondary-hover`

    const handleGetCharacters = (party: PartyResult) => {
        

        console.log('e')
        const unlockedMembers = getUnlockedMembers(party)
        let updatedParty = party

        if (!hasRolled) {
            const partyClasses = getPartyClasses(unlockedMembers)
            updatedParty = party.map(mbr => {
                let id = mbr.characterId
                const memberClass = partyClasses.find(char => char.characterId == id)
                return{
                    ...mbr,
                    classId: memberClass?.classId,
                    subclassId: memberClass?.subclassId
                }
            })
        }

        const result = getCharacters(unlockedMembers)

        const newParty = party.map(mbr => {
            let id = mbr.characterId
            let memberResult = result.find(char => char.characterId == id)

            if (memberResult) {
            return {   ...mbr,
                classId: memberResult?.classId,
                subclassId: memberResult?.subclassId,
                raceId: memberResult?.raceId,
                backgroundId: memberResult?.backgroundId
            }} else {
                return mbr
            }
        })

        console.log(newParty)
        setPartyResult(newParty)
        setHasRolled(true)
    }

    const handleLockPartymember = (memberId: string) => {
        const copy = [...lockedMembers, memberId]
        setLockedMembers(copy)
    }

    const handleUnlockPartymember = (memberId: string) => {
        const filtered = lockedMembers.filter(mbr => mbr !== memberId)

        setLockedMembers(filtered)
    }

    const getIcon = (subClass: string) => {
        if (hasRolled) {
            return `../../assets/subclass-icons/${subClass}.png`
        } else {
            return `../../assets/subclass-icons/swords-icon.svg`
        }
    } 

    const getLockIcon = (memberId: string) => {
        return lockedMembers.includes(memberId)
    }

    
    if (partyResult) return(
        <div className="">
            <div id="character-output-container" className="flex overflow-x-scroll max-w-[73vw]">
                {partyResult.map(member => {
                    if (member.classId && member.subclassId && member.raceId && member.backgroundId) {

                        console.log('ye')

                        const {characterId, displayName, classId, subclassId, raceId, backgroundId} = member
                        const className = getDisplayName(classId)
                        const subclassName = getDisplayName(subclassId)
                        const raceName = getDisplayName(raceId)
                        const backgroundName = getDisplayName(backgroundId)

                        const iconPath = getIcon(subclassId)
                        const useIcon = new URL(`${iconPath}`, import.meta.url).href

                        const locked = getLockIcon(characterId)

                        return (
                            <div key={characterId} id={`${characterId}-character-result-wrapper`} className={`${charOutputWrapperClass} ${charOutputWrapperBg}`}>
                              <div id='char-result-wrapper-inner' className={`${charOutputInner} ${charOutputInnerBg}`}>
                                  <div id="char-output-toolbar" className="w-[100%] flex items-center justify-between stroke-text-light">
                                    <D20svg className={`${toolbarIconClass} stroke-15`} />
                                    {locked ? 
                                    <LockedIcon className={`${toolbarIconClass} stroke-7`} onClick={() => handleUnlockPartymember(characterId)} /> : 
                                    <UnlockedSideIcon className={`${toolbarIconClass} stroke-7`} onClick={() => handleLockPartymember(characterId)} />}
                                </div>
                                <div className="mt-3 text-text-light text-center">
                                    <p className="font-bold text-2xl mb-2">{displayName}</p>
                                    <p className="text-text-light-secondary">{raceName}</p>
                                    <p className="text-text-light-secondary italic">{backgroundName}</p>
                                </div>
                                <img src={useIcon} className={charSubclassIconClass}></img>
                                <div className="mt-1 text-text-light text-center">
                                    <p>{className}</p>
                                    <p>{subclassName}</p>
                                </div>
                              </div>
                            </div>
                        )
                    }
                })}

            </div>
            <button className={buttonPrimaryClass} onClick={() => handleGetCharacters(partyResult)}>Roll</button>
        </div>
    )
}