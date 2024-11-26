import { UserCircleIcon } from '@heroicons/react/24/solid'
import CorePrimarySearchBar from '../../components/common/search-bar/CorePrimarySearchBar'
import { useAppSelector } from '../../redux/hooks'
import PlusIconSvg from '../../svgs/PlusIconSvg'
import SmileyIconSvg from '../../svgs/SmileyIconSvg'

import { useEffect, useState } from 'react'
import { socket } from '../../socket/socket'
import ConversationBox from './ConversationBox'

export default function RightPanelChat() {
    // -- Redux
    const miscSelector = useAppSelector((state) => state.misc)

    // -- Use States
    const [textMessage, setTextMessage] = useState('')

    // -- Use Effects
    useEffect(() => {
        const handleKeyUp = (e: KeyboardEvent) => {
            if (e.key === 'Enter' && !!textMessage) {
                onSubmit()
            }
        }

        window.addEventListener('keyup', handleKeyUp)
        return () => {
            window.removeEventListener('keyup', handleKeyUp)
        }
    }, [textMessage])

    // -- Functions
    function onSubmit() {
        if (
            !miscSelector.rightPanelChat.chat?.id ||
            !miscSelector.rightPanelChat.user?.id
        ) {
            window.alert('Missing chat id to send text.')
            return
        }

        socket.emit(
            'sendMessage',
            {
                text: textMessage,
                chatId: miscSelector.rightPanelChat.chat.id,
                userId: miscSelector.rightPanelChat.user.id
            },
            (response: any) => {
                console.log('message sent ', response)
            }
        )
        // socket.emit('daniel', textMessage, (response: any) => {
        //     console.log('res ', response)
        // })
        setTextMessage('')
    }

    return (
        <div className="flex h-full w-full flex-col items-center ">
            <div className="flex h-[59px] w-full border-l-[1px] border-l-[rgb(209,215,219)] bg-primary-header-background px-4 py-[10px]">
                <UserCircleIcon className="  mr-[15px] h-10 w-10 text-gray-300" />
                <div className="flex h-full w-full items-center text-primary-font-color">
                    {miscSelector.rightPanelChat?.user?.username}
                </div>
            </div>
            <div className="w-full flex-grow">
                <ConversationBox />
            </div>
            <div className="flex h-[62px] w-full items-center bg-primary-header-background px-4 py-[5px]">
                <div className="px-3">
                    <SmileyIconSvg className="cursor-pointer" />
                </div>
                <div>
                    <PlusIconSvg className="cursor-pointer" />
                </div>
                <div className="ml-4 flex w-full items-center px-2 py-[5px]">
                    <CorePrimarySearchBar
                        value={textMessage}
                        onChange={(value) => setTextMessage(value)}
                        placeholderText="Type a message"
                    />
                </div>
            </div>
        </div>
    )
}
