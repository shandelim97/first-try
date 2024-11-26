import { useEffect, useState } from 'react'
import { socket } from '../../socket/socket'

export default function ConversationBox() {
    const [message, setMessage] = useState<string[]>([])

    useEffect(() => {
        socket.on('daniel', (v) => {
            setMessage((prev) => [...prev, v])
        })
    }, [])

    return (
        <div className="h-full w-full bg-chat-background-img bg-contain">
            {message.map((text: string) => (
                <span>{text}</span>
            ))}
        </div>
    )
}
