import LargeWhatsappSvg from '../../svgs/LargeWhatsappSvg'

export default function TopHeader() {
    return (
        <div className="flex w-full max-w-[1000px] items-center pl-[36px] lg:pl-0">
            <LargeWhatsappSvg />
            <span className="ml-[14px] text-[14px] font-medium text-white">
                WHATSAPP WEB CLONE
            </span>
        </div>
    )
}
