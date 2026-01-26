import PrismIcon from '../../assets/prism.svg?react'
import BookIcon from '../../assets/ui-icons/book.svg?react'
import SearchIcon from '../../assets/ui-icons/search.svg?react'

interface SidebarOptionProps {
    sidebarExpanded: boolean
}

export const SidebarOptions = ({ sidebarExpanded }: SidebarOptionProps ) => {

    const optionIconClass: string = `w-5 stroke-text-primary mr-3`
    const optionButtonClass: string = `text-text-primary text-xl w-full flex items-center justify-left pl-10 pt-5 pb-5 hover:bg-sidebar-button-hover`
    const optionContainerClass: string = "mt-auto mb-auto w-full"

    return(
        <div id="sidebarOptionsContainer" className={`${optionContainerClass} ${sidebarExpanded ? "" : "hidden"}`}>
            <button className={optionButtonClass}>
                <PrismIcon className={`${optionIconClass} stroke-12`} />
                <span>Generator</span>
            </button>
            <button className={optionButtonClass}>
                <BookIcon className={`${optionIconClass} stroke-12`} />
                <span>Archives</span>
            </button>
            <button className={optionButtonClass}>
                <SearchIcon className={`${optionIconClass} stroke-5`} />
                <span>Wiki</span>
            </button>
        </div>
    )
}