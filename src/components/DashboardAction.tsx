import Link from 'next/link'
import PlusIcon from './PlusIcon'
import NotificationIcon from './NotificationIcon'
import TagIcon from './TagIcon'

export default function DashboardAction() {
  return (
    <div className="flex flex-col w-full sm:flex-row gap-3">
      <Link
        className="flex-1 p-2 hover:bg-gray-700 bg-gray-600 min-w-20 h-20 rounded-md flex items-center justify-center gap-3"
        href="/posts/create/new"
      >
        <PlusIcon color="white" />
        <p className="text-lg text-gray-100 font-semibold">Create Post</p>
      </Link>
      <Link
        className="flex-1 p-2 hover:bg-gray-700 bg-gray-600 min-w-20 h-20 rounded-md flex items-center justify-center gap-3"
        href="/categories/"
      >
        <TagIcon width="25px" height="25px" color="white" />
        <p className="text-lg text-gray-100 font-semibold">Manage Categories</p>
      </Link>
      <Link
        className="flex-1 p-2 hover:bg-gray-700 bg-gray-600 min-w-20 h-20 rounded-md flex items-center justify-center gap-3"
        href="/notification"
      >
        <NotificationIcon />
        <p className="text-lg text-gray-100 font-semibold">View Notification</p>
      </Link>
    </div>
  )
}
