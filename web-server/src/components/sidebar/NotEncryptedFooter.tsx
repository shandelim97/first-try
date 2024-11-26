import LockSvg from '../../svgs/LockSvg'

export default function NotEncryptedFooter() {
    return (
        <div className="flex items-center justify-center bg-white px-4 pb-3 pt-[15px]">
            <div className="border-t-primary-border-color flex h-full w-full items-center justify-center border-t-[1px] pt-[10px]">
                <LockSvg />
                <span className="text-secondary-font-color ml-[3px] text-xs">
                    Your personal messages are not end-to-end encrypted
                </span>
            </div>
        </div>
    )
}
