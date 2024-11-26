import { useEffect } from 'react'
import customHistory from '../../components/router/CustomHistory'

export default function useHistory() {
    useEffect(() => {
        const unlisten = customHistory.listen((listener) => {
            // console.log(listener.action)
            // console.log(listener.location)
        })

        // Cleanup the listener on component unmount
        return () => {
            unlisten()
        }
    }, [])

    // customHistory.block(() => window.alert('blocked'))
}
