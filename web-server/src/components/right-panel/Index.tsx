import WhatsappLaptopImg from '../../img/WhatsappLaptopImg'
import RightPanelChat from '../../pages/right-panel-chat/Index'
import { useAppSelector } from '../../redux/hooks'

export default function RightPanel() {
    // -- Redux
    const miscSelector = useAppSelector((state) => state.misc)

    if (miscSelector.rightPanelChat.user && miscSelector.rightPanelChat.chat) {
        return <RightPanelChat />
    }
    return (
        <div className="h-full w-full border-l-[1px] border-l-primary-border-color bg-secondary-background">
            <div className="flex h-full flex-col items-center justify-center">
                <WhatsappLaptopImg />

                <span className="mt-4 text-3xl font-normal text-[#41525d]">
                    Welcome to Whatsapp Web Clone :)
                </span>
            </div>
        </div>
    )
}
