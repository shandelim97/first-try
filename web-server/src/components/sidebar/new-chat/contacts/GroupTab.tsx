import NewCommunitySvg from '../../../../svgs/NewCommunitySvg'
import NewGroupSvg from '../../../../svgs/NewGroupSvg'

export default function GroupTab({
    type,
    text
}: {
    type: 'COMMUNITY_GRP' | 'GRP'
    text: string
}) {
    return (
        <div className="flex h-[64px] items-center bg-white ">
            <div className="bg-primary-background mx-4 my-2 flex h-12 w-12 items-center justify-center rounded-full">
                {type == 'GRP' && <NewGroupSvg />}
                {type == 'COMMUNITY_GRP' && <NewCommunitySvg />}
            </div>
            <div className=" flex h-full flex-grow items-center ">
                <span className="text-base text-primary-font-color">
                    {text}
                </span>
            </div>
        </div>
    )
}
