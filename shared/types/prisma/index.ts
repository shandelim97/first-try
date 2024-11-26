export interface IContact {
    id: string
    username: string
    passwordHash: string
    phoneNumber: string
    lastSeen: Date | null
    status: string | null
}

export interface IChat {
    id: string
    creationDate?: Date | undefined
    message: IMessage[] | undefined
}

export interface IMessage {
    id: string
    senderId: string
    text: string
    type: string
    timestamp: Date | undefined
    chatId: string
    readReceipt: boolean
    user: IUser
}

export interface IUser {
    id: string
    username: string
    passwordHash: string
    phoneNumber: string
    lastSeen: Date | undefined
    status: string
    contact: IContact
    // message: IMessage
}
