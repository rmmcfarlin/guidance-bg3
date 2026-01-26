import './selectable-tabs.css'

interface SelectableTabsProps <Option extends string> {
    options: Option[]
    containerClass: string
    getButtonClass: (option:Option) => string
    setValue: (option: Option) => void
}

export const SelectableTabs = <Option extends string>({options, containerClass, getButtonClass, setValue}: SelectableTabsProps<Option>) => {


    return(
        <div className={containerClass}>
            {options.map((option) => {
                return(
                    <button key={option} className={`tab-button ${getButtonClass(option)}`} onClick={() => setValue(option)}>{option}</button>
                )
            })
            }
        </div>
    )
}