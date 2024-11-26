export default function CorePrimarySearchBar({
    placeholderText,
    className,
    onChange,
    value
}: {
    placeholderText?: string
    className?: string
    onChange?: (input: string) => void
    value: string
}) {
    return (
        <label className="relative block w-full">
            <input
                placeholder={placeholderText}
                className={`core-primary-textfield !bg-white focus:outline-none ${className}`}
                onChange={(e) => {
                    onChange && onChange(e.target.value)
                }}
                value={value}
            />
        </label>
    )
}
