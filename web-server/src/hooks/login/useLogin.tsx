import { useEffect } from 'react'
import { useCookies } from 'react-cookie'
import { IContact } from '../../../../shared/types/prisma'
import customHistory from '../../components/router/CustomHistory'
import allRoutes from '../../utilities/routes.utility'

export default function useLogin() {
    // -- Hooks
    const [cookies, setCookie] = useCookies(['token'])

    // -- Use Effect
    useEffect(() => {
        // whatsapp only has 1 url
        if (cookies.token) customHistory.push(allRoutes.CHATS.url)
    }, [cookies.token])

    // -- Functions
    function onClick(selectedUser: IContact | undefined) {
        if (selectedUser) setCookie('token', selectedUser)
    }

    return {
        onClick: onClick,
        loggedInUser: cookies.token as IContact
    }
}
