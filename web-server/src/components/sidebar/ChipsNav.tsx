export default function ChipsNav() {
    return (
        <div className="flex items-center gap-2 border-b-[1px] border-b-[rgb(233,237,239)] bg-white px-4 pb-2">
            <Chips label="All" />
            <Chips label="Unread" />
            <Chips label="Groups" />
        </div>
    )
}

function Chips({ label, onClick }: { label: string; onClick?: () => void }) {
    return (
        <button
            onClick={onClick}
            className="flex items-center justify-center rounded-[42px] bg-[rgb(240,242,245)] px-3 py-[6px] text-[rgb(84,101,111)]"
        >
            {label}
        </button>
    )
}
