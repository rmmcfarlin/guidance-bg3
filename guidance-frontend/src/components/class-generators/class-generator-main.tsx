import { SelectableTabs } from "../ui-components/selectable-tabs/selectable-tabs"
import { useState } from 'react'

export type GeneratorTabs = "Class" | "Build" | "Character" | "Complete"

export const ClassGeneratorMain = ({}) => {

    const [selectedTab, setSelectedTab] = useState<GeneratorTabs>("Class")
    const generatorTabs: GeneratorTabs[] = [
        "Class",
        "Build",
        "Character",
        "Complete"
    ]

    const tabContainerClass: string = "flex flex-col"
    const tabButtonClass: string = "bg-background-sidebar-secondary text-text-primary p-2 rounded-l-xl mt-2 mb-[-0.5rem]"
    const getTabClass = (option: GeneratorTabs) => {
        if (option == selectedTab) {
            return `bg-button-active text-button-text z-10 ${tabButtonClass}`
        } else {
            return tabButtonClass
        }
    }
    const handleSelectTab = (option: GeneratorTabs) => {
        setSelectedTab(option)
    }

    return(
        <div id="generator-wrapper" className="size-full flex ml-auto mr-auto">
            <div>
                <SelectableTabs
                    options={generatorTabs}
                    containerClass={tabContainerClass}
                    getButtonClass={getTabClass}
                    setValue={handleSelectTab}
                    />
            </div>
            <div id="generator-content-main" className="bg-background-generator-primary w-full h-[20rem] rounded-xl">
                <p>generator</p>
            </div>  
        </div>
    )
}