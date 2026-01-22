
interface OptionDropdownProps {
    options: string[],
    containerClass: string,
    buttonClass: string,
    setValue: (option: string) => void
}

export const OptionDropdown = ({options, containerClass, buttonClass, setValue}: OptionDropdownProps) => {

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