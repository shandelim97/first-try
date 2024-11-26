import SearchSvg from '../../../svgs/SearchSvg'

// TODO this needs refactoring
// common components to not have background color
export default function CoreSecondarySearchBar({
    placeholderText
}: {
    placeholderText?: string
}) {
    return (
        <div className="flex h-full max-h-[49px] w-full bg-white px-4 pb-2 pt-2">
            {/* <div className="mx-auto max-w-sm">
                <h2 className="mb-2 text-lg font-semibold">Card Details</h2>
                <div className="space-y-2">
                    <input
                        type="text"
                        placeholder="Card number"
                        className="block w-full rounded-t-md border border-gray-300 px-3 py-2 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                    <div className="flex -space-x-px">
                        <input
                            type="text"
                            placeholder="MM / YY"
                            className="block w-1/2 rounded-bl-md border border-gray-300 px-3 py-2 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                        <input
                            type="text"
                            placeholder="CVC"
                            className="block w-1/2 rounded-br-md border border-gray-300 px-3 py-2 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>
                </div>
            </div> */}
            <label className="relative block w-full">
                <SearchSvg className="absolute left-4 top-[10px] h-4 w-4 text-primary-font-color" />
                <input
                    placeholder={placeholderText}
                    className="core-secondary-textfield  !pl-12  focus:outline-none  "
                ></input>
            </label>
        </div>
    )
}
