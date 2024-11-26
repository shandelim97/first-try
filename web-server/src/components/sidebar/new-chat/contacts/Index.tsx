import { useState } from 'react'
import { IContact } from '../../../../../../shared/types/prisma'
import useChangeTopNavButtonState from '../../../../hooks/common/useChangeTopNavButtonState'
import useLogin from '../../../../hooks/login/useLogin'
import { useAppDispatch } from '../../../../redux/hooks'
import reducerMisc from '../../../../redux/reducers/misc.reducer'
import apiChat from '../../../../rtk-query/api/chat.api'
import apiContacts from '../../../../rtk-query/api/contact.api'
import CoreTab from '../../../common/tab/CoreTab'
import Divider from '../../Divider'
import GroupTab from './GroupTab'
import { GetChatRequestParams } from '../../../../../../shared/types/requests/chat'
import miscConstant from '../../../../globals/misc.constant'
import { to } from '../../../../../../app-server/utilities/promise'
import { socket } from '../../../../socket/socket'

export default function ContactsContainer() {
    // -- Redux
    const dispatch = useAppDispatch()

    // -- Hooks
    const { loggedInUser } = useLogin()
    const changeTopNavButton = useChangeTopNavButtonState()

    const { data: allUserData, error: allUserErr } = apiContacts.useGetAllQuery(
        { id: loggedInUser?.id },
        {
            pollingInterval: miscConstant.REFETCH_POLLING
        }
    )

    const [trigger, result, lastPromiseInfo] = apiChat.useLazyGetChatQuery({
        pollingInterval: miscConstant.REFETCH_POLLING,
        refetchOnReconnect: true
    })

    // -- Functions
    async function handleClick(selectedOption: IContact) {
        const [chatErr, chatRes] = await to(
            trigger({
                loggedInId: loggedInUser.id,
                selectedUserId: selectedOption.id
            } as GetChatRequestParams)
        )

        if (chatErr || !chatRes?.data) {
            console.log('chatRes?.data: ', chatRes?.data)
            window.alert('Something went wrong getting chat')
            console.warn(chatErr)
            return
        }

        socket.emit('joinRoom', chatRes.data.id, (response: string) => {
            console.log(response)

            if (response) {
                dispatch(
                    reducerMisc.setRightPanelChat({
                        chat: chatRes.data,
                        user: selectedOption
                    })
                )

                dispatch(reducerMisc.setLeftPanelSelectedTab(selectedOption))
                changeTopNavButton.onClick('DEFAULT')
            }
        })
    }

    // -- Functions
    function renderContacts() {
        return allUserData?.map((contact, index) => {
            return (
                <div key={index}>
                    <CoreTab
                        primaryText={contact.username}
                        secondaryText={contact.status}
                        option={contact}
                        onClick={handleClick}
                    />
                    <Divider />
                </div>
            )
        })
    }

    return (
        <div className="flex-col">
            <GroupTab text="New group" type="COMMUNITY_GRP" />
            <Divider />
            <GroupTab text="New Community" type="GRP" />
            <Divider />

            <div className=" h-[72px]  bg-white py-[30px] pl-8">
                <span className="text-base  font-normal text-primary-background">
                    CONTACTS ON WHATSAPP
                </span>
            </div>
            <Divider />
            {renderContacts()}
        </div>
    )
}
