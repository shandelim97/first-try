import { ErrorBoundaryState } from '../../components/errors/ErrorBoundary'
import { isDevelopment } from '../../utilities/env.utility'

export default function ErrorPage(props?: ErrorBoundaryState) {
    // ? to be used with react router
    // const error: any = useRouteError()

    // -- Functions
    function renderErrorInfo() {
        if (isDevelopment() && props && props.error)
            return (
                <div className="flex  flex-col items-center justify-center">
                    <span className="font-semibold text-red-600">
                        {props.error.toString()}
                    </span>

                    <div className="max-h-64 max-w-[600px] overflow-y-auto text-red-500">
                        {props.errorInfo?.componentStack}
                    </div>
                </div>
            )
    }

    return (
        <div className="bg-secondary-background flex h-screen w-screen flex-col items-center justify-center">
            <h1 className="mb-1 text-4xl font-medium">Oops!</h1>
            <span className="text-base">An unexpected error has occurred.</span>
            {renderErrorInfo()}
            {/* <div className="relative flex h-screen items-center justify-center">
                <div className="group relative">
                    <button className="rounded-md bg-blue-500 px-4 py-2 text-white">
                        Hover me
                    </button>
                    <div className="  absolute bottom-full mb-2 hidden w-auto rounded-lg bg-black p-2 text-sm text-white shadow-md group-hover:block">
                        This is a tooltip
                    </div>
                </div>
            </div> */}
        </div>
    )
}
