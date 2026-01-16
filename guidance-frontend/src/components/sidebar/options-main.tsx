import PrismIcon from '../../assets/prism.svg?react'

interface SidebarOptionProps {
    sidebarExpanded: boolean
}

export const SidebarOptions = ({ sidebarExpanded }: SidebarOptionProps ) => {

    const optionIconClass: string = "w-5 stroke-parchment-300 stroke-10 mr-3"
    const optionButtonClass: string = "text-parchment-300 text-xl w-full flex items-center justify-left pl-10 pt-5 pb-5 hover:bg-leather-100"
    const optionContainerClass: string = "mt-auto mb-auto w-full"

    return(
        <div id="sidebarOptionsContainer" className={`${optionContainerClass} ${sidebarExpanded ? "" : "hidden"}`}>
            <button className={optionButtonClass}>
                <PrismIcon className={optionIconClass} />
                <span>Generator</span>
            </button>
            <button className={optionButtonClass}>
                <PrismIcon className={optionIconClass} />
                <span>Library</span>
            </button>
            <button className={optionButtonClass}>
                <PrismIcon className={optionIconClass} />
                <span>Profile</span>
            </button>
        </div>
    )
}