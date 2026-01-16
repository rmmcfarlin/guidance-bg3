import PrismIcon from '../assets/prism.svg?react'

export const Header = ({ }) => {

    return (
        <>
            <div id="header" className="flex justify-center items-center w-[45%] absolute top-5">
                <PrismIcon className="w-20 stroke-charcoal-500 stroke-12 size-[60px]" />
                <div className="flex flex-col mr-1">
                    <span className="text-xl lg:text-[1.5rem] text-charcoal-500">Guidance</span>
                    <span className="text-xs lg:text-[0.75rem] italic">A BG3 Build Tool</span>
                </div>
            </div>
        </>
    )
}