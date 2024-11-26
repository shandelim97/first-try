import { useEffect } from 'react'
import allRoutes from '../../utilities/routes.utility'

export default function useChangeTitle(pageTitle?: string, dependencies = []) {
    useEffect(() => {
        let title = allRoutes.DEFAULT.pageTitle
        if (pageTitle) title = pageTitle
        document.title = title
    }, [...dependencies])
}
