import { SelectableTabs } from "../ui-components/selectable-tabs/selectable-tabs"
import { useState } from 'react'
import { ClassSubclassGenerator } from "./class-subclass-generator"

export type GeneratorTabs = "Class" | "Build" | "Character" | "Complete"

export const ClassGeneratorMain = ({}) => {

    const [selectedTab, setSelectedTab] = useState<GeneratorTabs>("Class")
    const generatorTabs: GeneratorTabs[] = [
        "Class",
        "Build",
        "Character",
        "Complete"
    ]

    const tabContainerClass: string = "flex ml-5 w-full"
    const tabButtonClass: string = "bg-background-generator-secondary text-text-primary p-2 rounded-t-xl mt-2 w-[10%] drop-shadow-md"
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

    const renderContent = () => {
        if (selectedTab == "Class") {
            return <ClassSubclassGenerator />
        }
    }

    return(
        <div id="generator-wrapper" className="size-full flex flex-col ml-auto mr-auto">
            <div>
                <SelectableTabs
                    options={generatorTabs}
                    containerClass={tabContainerClass}
                    getButtonClass={getTabClass}
                    setValue={handleSelectTab}
                    />
            </div>
            <div id="generator-content-main" className="bg-background-generator-primary w-full h-[20rem] rounded-xl drop-shadow-xl">
                {renderContent()}
            </div>  
        </div>
    )
}