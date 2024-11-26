export default function CorePrimaryButton({
    buttonText,
    onClick
}: {
    buttonText: string
    onClick?: () => void
}) {
    return (
        <button
            className="bg-primary-background rounded-lg px-4 py-1 font-medium text-white"
            onClick={onClick}
        >
            {buttonText}
        </button>
    )
}
