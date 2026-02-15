import { SelectableTabs } from "../ui-components/selectable-tabs/selectable-tabs"
import { useState } from 'react'
import { ClassSubclassGenerator } from "./class-subclass-generator"
import { CharacterGenerator } from "./character-generator"
import { PartySelectorSidebar } from "./party-selector-sidebar"
import { useGeneratorContext } from "../../context-providers/generator-provider"

export type GeneratorTabs = "Class" | "Build" | "Character" | "Complete"

export const ClassGeneratorMain = ({}) => {
    
    const [selectedTab, setSelectedTab] = useState<GeneratorTabs>("Class")
    const generatorTabs: GeneratorTabs[] = [
        "Class",
        "Character",
        "Build"
    ]

    const { hasRolled, setHasRolled } = useGeneratorContext()

    const tabContainerClass: string = "flex w-[100%] lg:w-[70%] mb-10 justify-center border-b-[1px] border-b-text-primary pb-3 ml-auto mr-auto"
    const tabButtonClass: string = "text-text-primary text-s lg:text-[1rem] p-2 rounded-xl mt-2 w-[24%] lg:w-[20%] drop-shadow-md"
    const getTabClass = (option: GeneratorTabs) => {
        if (option == selectedTab) {
            return `bg-button-active text-button-text bg-opacity-25 p-2 rounded-xl mt-2 w-[24%] lg:w-[20%] drop-shadow-md text-s lg:text-[1rem]`
        } else {
            return tabButtonClass
        }
    }
    const handleSelectTab = (option: GeneratorTabs) => {
        setSelectedTab(option)
    }

    const renderContent = () => {
        if (selectedTab == "Class") {
            return <ClassSubclassGenerator
                        hasRolled={hasRolled}
                        setHasRolled={setHasRolled} 
                    />
        } else if (selectedTab == "Character") {
            return <CharacterGenerator 
                        />
        }
    }

    return(
 
            <div id="generator-wrapper" className="w-full min-h-[80vh] flex flex-col ml-auto mr-auto">
                <div>
                    <SelectableTabs
                        options={generatorTabs}
                        containerClass={tabContainerClass}
                        getButtonClass={getTabClass}
                        setValue={handleSelectTab}
                    />
                </div>
                <div className="flex">
                    <PartySelectorSidebar
                        hasRolled={hasRolled}
                    />
                    <div id="generator-content-main" className="flex justify-center h-full w-[90vw] lg:w-full rounded-xl drop-shadow-xl my-auto">
                        {renderContent()}
                    </div>
                </div>
            </div>
    )
}