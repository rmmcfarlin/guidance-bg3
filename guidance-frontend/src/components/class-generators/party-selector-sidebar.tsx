import { useState } from 'react'
import UserIcon from '../../assets/character-portraits/portrait-user.png'
import PlusCurved from '../../assets/ui-icons/plus-curved.svg?react'
import { PartySelectorMenu } from './party-selector-menu'


export const PartySelectorSidebar = ({}) => {

    const [showPartyMenu, setShowPartyMenu] = useState<boolean>(false)
    const [selectedParty, setSelectedParty] = useState([
        "Tav"
    ])

    const portraitWrapper: string = "w-[50px] lg:w-[75px] p-0.5 bg-background-portrait flex flex-col items-center mb-5"
    const characterPortraitIcon: string = "w-full border-[1px] border-black"
    
    const partyMenuClass: string = `${showPartyMenu ? '' : 'hidden'} bg-background-sidebar-main rounded-xl p-7 max-h-[20rem] overflow-scroll w-40`

    const handleShowPartyMenu = () => {
        setShowPartyMenu(!showPartyMenu)
    }

    return(
        <div id="party-selector-sidebar" className="flex flex-col w-[8%] ml-3 lg:absolute lg:left-10">
            <div className={portraitWrapper}>
                <img src={UserIcon} className={characterPortraitIcon}></img>

            </div>
            <div className="w-[50px] h-[66.67px] lg:w-[75px] lg:h-[100px] bg-background-generator-secondary flex flex-col items-center justify-center">
                <PlusCurved className="size-[25px] fill-text-primary" onClick={() => handleShowPartyMenu()} />
            </div>
            <PartySelectorMenu 
                selectedParty={selectedParty}
                setSelectedParty={setSelectedParty}
                partyMenuClass={partyMenuClass}
                />
        </div>
    )
}