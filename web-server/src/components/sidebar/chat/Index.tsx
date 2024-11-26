import { useAppSelector } from '../../../redux/hooks'
import CoreTab from '../../common/tab/CoreTab'
import Divider from '../Divider'
import NotEncryptedFooter from '../NotEncryptedFooter'
import NotificationBar from './NotificationBar'

export default function ChatsContainer() {
    // -- Redux
    const miscSelector = useAppSelector((state) => state.misc)

    // -- Function

    function renderChatSidebar() {
        if (miscSelector.leftPanelSelectedTab) {
            return (
                <>
                    <CoreTab
                        option={miscSelector.leftPanelSelectedTab}
                        primaryText={miscSelector.leftPanelSelectedTab.username}
                        isSelected={true}
                    />
                    <Divider />
                    <div className="w-full flex-grow bg-white" />
                    <NotEncryptedFooter />
                </>
            )
        }

        return (
            <div className="flex h-full w-full items-center justify-center">
                <span className="text-sm font-light  text-secondary-font-color">
                    No chats found :(
                </span>
            </div>
        )
    }

    return (
        <div className=" flex h-full w-full flex-col">
            <NotificationBar />
            <Divider />
            {renderChatSidebar()}
        </div>
    )
}
