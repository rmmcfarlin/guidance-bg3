import PrismIcon from '../assets/prism.svg?react'
import { useTheme } from '../context-providers/theme-provider'

export const Header = ({ }) => {

    return (
        <>
            <div id="header" className="flex justify-center items-center w-[45%] my-5">
                <PrismIcon className={`w-20 stroke-text-primary stroke-12 size-[60px]`} />
                <div className="flex flex-col mr-1">
                    <span className='text-xl lg:text-[1.5rem] text-text-primary'>Guidance</span>
                    <span className='text-xs lg:text-[0.75rem] text-text-secondary italic'>A BG3 Build Tool</span>
                </div>
            </div>
        </>
    )
}