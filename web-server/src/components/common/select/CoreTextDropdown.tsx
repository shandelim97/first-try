import { useEffect, useRef, useState } from 'react'
import ChevronDownSvg from '../../../svgs/ChevronDownSvg'
import classNames from '../../../utilities/tailwind/classNames'
import ChevronUpSvg from '../../../svgs/ChevronUpSvg'

export default function CoreTextDropdown<T>({
    placeholder = 'Please choose an option',
    onClick,
    options,
    className,
    displayKey,
    idKey,
    fullWidth = false
}: {
    placeholder?: string
    onClick: (option: T) => void
    options: T[]
    displayKey: keyof T
    idKey: keyof T
    className?: string
    fullWidth?: boolean
}) {
    // -- Use States
    const [selectedOption, setSelectedOption] = useState<T>()
    const [openDropdown, setOpenDropdown] = useState(false)

    // -- Refs
    const dropdownRef = useRef<HTMLDivElement>(null)

    // -- Functions
    function handleChange(option: T) {
        onClick(option)
        setSelectedOption(option)
        setOpenDropdown(false)
    }

    function renderValue() {
        if (selectedOption && selectedOption[idKey]) {
            const selected = options.find(
                (option) => option[idKey] == selectedOption[idKey]
            )
            if (selected && selected[displayKey])
                return selected[displayKey] as unknown as string
        }
        return placeholder
    }

    // -- Use Effects
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node)
            ) {
                setOpenDropdown(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [dropdownRef])

    return (
        <div
            ref={dropdownRef}
            className={`${fullWidth && 'w-full min-w-full max-w-full'} relative flex items-center justify-start ${className}`}
        >
            <button
                className="core-secondary-textfield"
                value={
                    selectedOption
                        ? (selectedOption[displayKey] as unknown as string)
                        : ''
                }
                onClick={(e) => {
                    e.preventDefault()
                    setOpenDropdown((prev) => !prev)
                }}
            >
                {renderValue()}
                {openDropdown ? (
                    <ChevronUpSvg className="ml-auto h-4 w-4" />
                ) : (
                    <ChevronDownSvg className="ml-auto h-4 w-4" />
                )}
            </button>

            {openDropdown && (
                <ul className="absolute top-[39px] min-w-full">
                    <li
                        className="core-dropdown-option !cursor-default rounded-t-lg !bg-gray-50 !text-gray-400"
                        value={''}
                    >
                        {placeholder}
                    </li>
                    {options.map((option, index) => {
                        let selected = undefined
                        if (selectedOption && selectedOption[idKey]) {
                            selected = options.find(
                                (option) =>
                                    option[idKey] == selectedOption[idKey]
                            )
                        }

                        return (
                            <li
                                key={index}
                                className={`core-dropdown-option ${classNames(
                                    index == options.length - 1
                                        ? 'rounded-b-lg !border-b-0'
                                        : ''
                                )} ${classNames(selected && selected[idKey] == option[idKey] ? '!bg-slate-200' : '')}`}
                                value={option[idKey] as string}
                                onClick={() => handleChange(option)}
                            >
                                {option && option[displayKey]
                                    ? (option[displayKey] as unknown as string)
                                    : ''}
                            </li>
                        )
                    })}
                </ul>
            )}
        </div>
    )
}
