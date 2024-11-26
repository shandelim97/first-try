import { PrismaClient } from '@prisma/client'
import { StatusCodes } from 'http-status-codes'
import ErrorResponse from '../utilities/ErrorResponse'
import { to } from '../utilities/promise'
import { GetChatRequestParams } from './../../shared/types/requests/chat/index'

class ChatService {
    private prisma: PrismaClient

    constructor() {
        this.prisma = new PrismaClient()
    }

    async getChat({ loggedInId, selectedUserId }: GetChatRequestParams) {
        let chatId = undefined

        const [existingChatErr, existingChatRes] = await to(
            this.prisma.existing_chats.findFirst({
                where: {
                    OR: [
                        {
                            AND: {
                                firstUser: { equals: loggedInId },
                                secondUser: { equals: selectedUserId }
                            }
                        },
                        {
                            AND: {
                                secondUser: { equals: loggedInId },
                                firstUser: { equals: selectedUserId }
                            }
                        }
                    ]
                }
            })
        )

        if (existingChatErr) {
            console.log(existingChatErr)
            throw new ErrorResponse(
                StatusCodes.INTERNAL_SERVER_ERROR,
                'Something went wrong fetching users.'
            )
        }

        if (!existingChatRes) {
            const [newChatErr, newChatRes] = await to(
                this.prisma.chat.create({
                    data: {
                        userChatMapping: {
                            // connect: [{ user: { id: selectedUserId } }]
                            create: [
                                {
                                    user: {
                                        connect: { id: loggedInId }
                                    }
                                },
                                {
                                    user: {
                                        connect: { id: selectedUserId }
                                    }
                                }
                            ]
                        }
                    },
                    select: {
                        userChatMapping: true,
                        message: true
                    }
                })
            )

            if (newChatErr || !newChatRes) {
                console.log(newChatErr)
                throw new ErrorResponse(
                    StatusCodes.INTERNAL_SERVER_ERROR,
                    'Something went wrong with creating new chat.'
                )
            }

            chatId = newChatRes.userChatMapping[0].chatId
        } else {
            chatId = existingChatRes.chatId
        }

        const [chatErr, chatRes] = await to(
            this.prisma.chat.findUnique({
                where: {
                    id: chatId
                },
                include: {
                    message: true
                    // userChatMapping: {
                    //     include: {
                    //         user: true
                    //     }
                    // }
                }
            })
        )

        if (chatErr) {
            throw new ErrorResponse(
                StatusCodes.INTERNAL_SERVER_ERROR,
                'Something went wrong getting chat.'
            )
        }

        return chatRes
    }
}

const chatService = new ChatService()
export default chatService
