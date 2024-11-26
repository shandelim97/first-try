import OverallLayout from '../components/layout/OverallLayout'
import LoginPage from '../pages/login/Index'

export interface IRoute {
    url: string
    permissions: number[]
    component: React.ComponentType | undefined
    pageTitle: string
    overlay: boolean
}

type UrlKeysType = 'DEFAULT' | 'CHATS' | 'LOGIN'
type AllRoutesType = {
    [key in UrlKeysType]: IRoute
}

const allRoutes: AllRoutesType = {
    DEFAULT: {
        component: undefined,
        pageTitle: 'Whatsapp-Clone',
        permissions: [],
        url: '/',
        overlay: false
    },
    CHATS: {
        component: OverallLayout,
        pageTitle: '',
        permissions: [0],
        url: '/chats',
        overlay: true
    },
    LOGIN: {
        component: LoginPage,
        pageTitle: '',
        permissions: [],
        url: '/login',
        overlay: false
    }
}

export default allRoutes
