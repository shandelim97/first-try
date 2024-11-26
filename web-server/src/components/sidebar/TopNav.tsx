import { UserCircleIcon } from '@heroicons/react/24/solid'
import useChangeTopNavButtonState from '../../hooks/common/useChangeTopNavButtonState'
import ChannelSvg from '../../svgs/ChannelSvg'
import CommunityGroupSvg from '../../svgs/CommunityGroupSvg'
import EllipsisSvg from '../../svgs/EllipsisSvg'
import NewChatSvg from '../../svgs/NewChatSvg'
import StatusSvg from '../../svgs/StatusSvg'
const BUTTON_CLASS = 'flex h-10 w-10 cursor-pointer items-center justify-center'

export default function TopNav() {
    // -- Hooks
    const changeTopNavButton = useChangeTopNavButtonState()

    return (
        <div className="flex h-[59px] max-w-full bg-[#f0f2f5] px-4 py-[10px]">
            <UserCircleIcon className="h-10 w-10 cursor-pointer text-gray-300" />
            <div className="ml-auto flex items-center gap-[10px]">
                <div className={BUTTON_CLASS}>
                    <img
                        src="https://static.whatsapp.net/rsrc.php/v3/ye/r/W2MDyeo0zkf.png"
                        className="max-h-6 max-w-6"
                    />
                </div>
                <div className={BUTTON_CLASS}>
                    <CommunityGroupSvg />
                </div>
                <div className={BUTTON_CLASS}>
                    <StatusSvg />
                </div>
                <div className={BUTTON_CLASS}>
                    <ChannelSvg />
                </div>
                <div
                    className={BUTTON_CLASS}
                    onClick={() => {
                        changeTopNavButton.onClick('NEW_CHAT')
                    }}
                >
                    <NewChatSvg />
                </div>
                <div className={BUTTON_CLASS}>
                    <EllipsisSvg />
                </div>
            </div>
        </div>
    )
}
