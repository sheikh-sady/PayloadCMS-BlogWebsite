import { UserType, useUser } from '@/context/userContext'
import MessageIcon from './MessageIcon'
import ProfileIcon from './ProfileIcon'

const SidebarHeader = () => {
  const { user } = useUser()
  return (
    <>
      {user ? (
        <div className="flex flex-col gap-1">
          <div className="p-1 flex gap-5 items-center">
            <ProfileIcon color="white"/>
            <p className="text-md text-white font-medidum">
              {user.firstName} {user.lastName}
            </p>
          </div>

          <div className="p-1 flex gap-5 items-center">
            <MessageIcon />
            <p className="text-sm text-gray-400 font-bold">{user.email}</p>
          </div>
        </div>
      ) : (
        <p className="text-md text-white font-medidum">You are not signed in</p>
      )}
    </>
  )
}
export default SidebarHeader
