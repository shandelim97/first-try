import useChangeTitle from '../../hooks/common/useChangeTitle'
import useCheckLogin from '../../hooks/common/useCheckLogin'
import useDefaultUrl from '../../hooks/common/useDefaultUrl'

export default function ProtectedWrapper({
    pageTitle,
    children
}: {
    pageTitle?: string
    children: React.ReactNode
}) {
    // -- Hooks
    useChangeTitle(pageTitle, [])
    useDefaultUrl()
    useCheckLogin()

    return <>{children}</>
}
