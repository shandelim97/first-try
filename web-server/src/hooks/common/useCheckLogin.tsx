import { useEffect } from 'react'
import { useAppSelector } from '../../redux/hooks'
import customHistory from '../../components/router/CustomHistory'
import allRoutes from '../../utilities/routes.utility'
import { useCookies } from 'react-cookie'

export default function useCheckLogin() {
    // -- Redux
    const miscSelector = useAppSelector((state) => state.misc)

    // -- Hooks
    const [cookies] = useCookies(['token'])

    // -- Use Effect
    useEffect(() => {
        if (!cookies.token) customHistory.push(allRoutes.LOGIN.url)
    }, [
        cookies.token,
        miscSelector.topNavButtonState,
        miscSelector.rightPanelChat
    ])
}
