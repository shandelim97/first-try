import { useEffect, useState } from 'react'
import { useAppSelector } from '../../redux/hooks'
import { socket } from '../../socket/socket'
import RightPanel from '../right-panel/Index'
import SidebarContainer from '../sidebar/Index'

export default function OverallLayout() {
    // -- Redux
    // const miscSelector = useAppSelector((state) => state.misc)

    // TODO set this in redux instead
    const [isConnected, setIsConnected] = useState(socket.connected)
    // const [fooEvents, setFooEvents] = useState<any>([])

    useEffect(() => {
        function onConnect() {
            console.log('connected')
            setIsConnected(true)
        }

        function onDisconnect() {
            console.log('disconnected')
            setIsConnected(false)
        }

        // function onFooEvent(value: any) {
        //     setFooEvents((previous: any) => [...previous, value])
        // }

        socket.on('connect', onConnect)
        socket.on('disconnect', onDisconnect)
        // socket.on('foo', onFooEvent)

        return () => {
            socket.off('connect', onConnect)
            socket.off('disconnect', onDisconnect)
            // socket.off('foo', onFooEvent)
        }
    }, [])

    return (
        <div className="flex h-full w-full">
            <div className="h-full w-full max-w-[450px]">
                <SidebarContainer />
            </div>
            <RightPanel />
        </div>
    )
}
