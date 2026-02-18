interface TagsContainerProps {
    tagWrapperClass: string
    tagHeaderClass: string
    tagOutputClass: string
    tagClass: string
    tagHeader: string
    tagArr: string[]
}

const proficiencyWrapperClass: string = "flex flex-col items-center mt-8"
const proficiencyHeaderClass: string = "text-text-dark-secondary text-xl"
const proficiencyOutputClass: string = "flex flex-wrap w-[75%] justify-evenly gap-3 mt-3"
const proficiencyClass: string = "text-text-light text-s"

export const TagsContainer = ({ tagWrapperClass, tagHeaderClass, tagOutputClass, tagArr, tagClass, tagHeader }: TagsContainerProps) => {

    const tags = tagArr
    return (
        <div className={tagWrapperClass}>
            <p className={tagHeaderClass}>{tagHeader}</p>
            <div className={tagOutputClass}>
                {tags.map(tag => {
                    return (
                        <p className={tagClass}>{tag}</p>
                    )
                })}
            </div>

        </div>
    )
}