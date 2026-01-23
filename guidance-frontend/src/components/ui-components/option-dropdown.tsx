
interface OptionDropdownProps <Option extends string> {
    options: Option[],
    containerClass: string,
    buttonClass: string,
    setValue: (option: Option) => void
}

export const OptionDropdown = <Option extends string>({options, containerClass, buttonClass, setValue}: OptionDropdownProps<Option>) => {

    return(
        <div className={containerClass}>
            {options.map(option => {
                return(
                    <span key={option} className={buttonClass} onClick={() => setValue(option)}>{option}</span>
                )
            }) 
            }
        </div>
    )
}