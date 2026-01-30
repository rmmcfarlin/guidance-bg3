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

    const tabContainerClass: string = "flex w-[70%] mb-10 justify-center border-b-[1px] border-b-text-primary pb-3 ml-auto mr-auto"
    const tabButtonClass: string = "text-text-primary p-2 rounded-xl mt-2 w-[20%] drop-shadow-md"
    const getTabClass = (option: GeneratorTabs) => {
        if (option == selectedTab) {
            return `bg-button-active text-button-text z-10 bg-opacity-25 p-2 rounded-xl mt-2 w-[20%] drop-shadow-md`
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
        <div id="generator-wrapper" className="w-full h-[80vh] flex flex-col ml-auto mr-auto">
            <div>
                <SelectableTabs
                    options={generatorTabs}
                    containerClass={tabContainerClass}
                    getButtonClass={getTabClass}
                    setValue={handleSelectTab}
                    />
            </div>
            <div id="generator-content-main" className="bg-background-generator-primary size-full rounded-xl drop-shadow-xl mt-auto mb-auto">
                {renderContent()}
            </div>  
        </div>
    )
}