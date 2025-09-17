import UserDetails from "@/components/UserDetails";
import UserPhoto from "@/components/UserPhoto";

export default function Page() {
  return (
    <div className="flex flex-col md:flex-row items-center gap-2 justify-around">
      <UserPhoto/>
      <UserDetails/>
    </div>
  )
}