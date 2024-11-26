import { UserCircleIcon } from '@heroicons/react/24/solid'

export default function CoreTab<T>({
    option,
    onClick,
    primaryText,
    secondaryText,
    isSelected = false
}: {
    primaryText: string | undefined
    secondaryText?: string | undefined | null
    option: T
    onClick?: (selectedOption: T) => void
    isSelected?: boolean
}) {
    return (
        <div
            className={`hover:bg-default-hover-color flex h-[79px] cursor-pointer items-center  ${isSelected ? 'bg-default-selected-color' : 'bg-white'}`}
            onClick={() => !!onClick && onClick(option)}
        >
            <UserCircleIcon className="ml-[13px] mr-[15px]  h-[49px] w-[49px] text-gray-300" />
            <div className=" flex w-full flex-col items-start ">
                <span className="text-base text-primary-font-color">
                    {primaryText || 'User'}
                </span>
                <span className="text-secondary-font-color h-[14px] text-sm">
                    {secondaryText || ''}
                </span>
            </div>
        </div>
    )
}
