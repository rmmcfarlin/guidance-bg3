import { GeneratorProvider } from "../../context-providers/generator-provider"
import { ClassGeneratorMain } from "./class-generator-main"

export const GeneratorWrapper = ({}) => {

    return(
        <GeneratorProvider>
            <ClassGeneratorMain />
        </GeneratorProvider>
    )
}