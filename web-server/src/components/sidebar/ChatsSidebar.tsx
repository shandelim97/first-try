import ChipsNav from './ChipsNav'
import CoreSecondarySearchBar from '../common/search-bar/CoreSecondarySearchBar'
import TopNav from './TopNav'
import ChatsContainer from './chat/Index'

export default function ChatSidebar() {
    return (
        <div className="flex h-full w-full flex-col">
            <TopNav />
            <CoreSecondarySearchBar placeholderText="Search" />
            <ChipsNav />
            <div className="w-full flex-grow">
                <ChatsContainer />
            </div>
        </div>
    )
}
