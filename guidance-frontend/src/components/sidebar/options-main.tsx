import PrismIcon from '../../assets/prism.svg?react'
import BookIcon from '../../assets/ui-icons/book.svg?react'
import SearchIcon from '../../assets/ui-icons/search.svg?react'
import FireIcon from '../../assets/ui-icons/campfire.svg?react'

interface SidebarOptionProps {
    sidebarExpanded: boolean
}

export const SidebarOptions = ({ sidebarExpanded }: SidebarOptionProps ) => {

    const optionIconClass: string = `w-7 stroke-text-primary mr-5`
    const optionButtonClass: string = `text-text-primary text-xl w-full flex items-center justify-left pl-5 pt-5 pb-5 hover:bg-sidebar-button-hover`
    const optionContainerClass: string = "mt-auto mb-auto w-full"
    const optionSubtitleClass: string = 'font-thin italic text-text-primary text-xs'

    return(
        <div id="sidebarOptionsContainer" className={`${optionContainerClass} ${sidebarExpanded ? "" : "hidden"}`}>
            <button className={optionButtonClass}>
                <PrismIcon className={`${optionIconClass} stroke-12`} />
                <div className="flex flex-col items-start">
                    <p>Generator</p>
                    <p className={optionSubtitleClass}>Roll your class, character, or build</p>
                </div>
            </button>
            <button className={optionButtonClass}>
                <BookIcon className={`${optionIconClass} stroke-12`} />
                <div className="flex flex-col items-start">
                    <p>Archives</p>
                    <p className={optionSubtitleClass}>Browse curated builds and parties</p>
                </div>
            </button>
            <button className={optionButtonClass}>
                <FireIcon className={`${optionIconClass} stroke-15`} />
                <div className="flex flex-col items-start">
                    <p>Camp</p>
                    <p className={optionSubtitleClass}>View your saved characters and parties</p>
                </div>
            </button>
        </div>
    )
}