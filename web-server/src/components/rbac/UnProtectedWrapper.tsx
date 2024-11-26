import useChangeTitle from '../../hooks/common/useChangeTitle'
import useDefaultUrl from '../../hooks/common/useDefaultUrl'

export default function UnProtectedWrapper({
    pageTitle,
    children
}: {
    pageTitle?: string
    children: React.ReactNode
}) {
    useChangeTitle(pageTitle, [])
    useDefaultUrl()

    return <>{children}</>
}
