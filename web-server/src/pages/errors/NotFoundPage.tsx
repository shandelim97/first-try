import customHistory from '../../components/router/CustomHistory'
import useHistory from '../../hooks/common/useHistory'

export default function NotFoundPage() {
    // -- Functions
    function onBack() {
        customHistory.back()
    }

    useHistory()

    return (
        <div className="bg-secondary-background flex h-dvh w-screen flex-col items-center justify-center">
            <h1 className="mb-1 text-4xl font-medium">Page not found</h1>
            <span className="cursor-default text-base">
                Click&nbsp;
                <a
                    className="cursor-pointer text-base hover:text-blue-500 hover:underline"
                    onClick={onBack}
                >
                    here
                </a>
                &nbsp;to go back where you were.
            </span>

            {/* <h1 className="mb-1 text-4xl font-medium">Oops!</h1>
            <span className="text-base">
                Sorry, an unexpected error has occurred.
            </span> */}

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
