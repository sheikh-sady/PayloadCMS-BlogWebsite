'use client'
import { useEffect, useState } from 'react'
import RegisterPage from '../pages/RegisterPage'
import { useUser } from '@/context/userContext'
import LoginPage from '../pages/LoginPage'
import DashboardAnalytics from '@/components/DashboardAnalytics'
import { PostType } from '@/components/PostCard'
import { CommentType, useComments } from '@/context/commentContext'
import { usePosts } from '@/context/postContext'
import DashboardMiddle from '@/components/DashboardMiddle'
import DashboardAction from '@/components/DashboardAction'

// const getCookie = (name: string): string | null => {
//   if (typeof document === "undefined") return null;
//   const cookies = document.cookie.split("; ");
//   const cookie = cookies.find((c) => c.startsWith(`${name}=`));
//   return cookie ? decodeURIComponent(cookie.split("=")[1]) : null;
// };

// const decodeJwt = (token: string) => {
//   try {
//     return JSON.parse(atob(token.split(".")[1]));
//   } catch {
//     return null;
//   }
// };

export default function Dashboard() {
  const { user, refreshToken } = useUser()
  const { comments } = useComments()
  const { publishedPosts } = usePosts()
  const [userPosts, setUserPosts] = useState<PostType | any>([])
  const [userPostComments, setUserPostComments] = useState<CommentType | any>([])

  useEffect(() => {
    if (!publishedPosts || !user) return
    setUserPosts(publishedPosts.filter((p: PostType) => p.author.id === user.id))
  }, [publishedPosts,user])

  useEffect(() => {
    if (!comments || !user) return
    setUserPostComments(comments.filter((c: CommentType) => c.post.author?.id === user?.id))
  }, [comments,user])

  console.log("dashboard user : ",user)

  // const [isAuthenticated, setIsAuthenticated] = useState(false);
  // const [userData, setUserData] = useState<any>(null);

  // useEffect(() => {
  //   const token = getCookie("frontendToken");
  //   if (!token) {
  //     setLoading(false);
  //     return;
  //   }

  //   const decoded = decodeJwt(token);
  //   if (!decoded || !decoded.email) {
  //     setLoading(false);
  //     return;
  //   }

  //   const fetchUser = async () => {
  //     try {
  //       const res = await fetch("/api/auth/me", {
  //         method: "POST",
  //         headers: { "Content-Type": "application/json" },
  //         body: JSON.stringify({ email: decoded.email }),
  //       });

  //       const data = await res.json();

  //       if (data.success) {
  //         setUserData(data.user);
  //         setIsAuthenticated(true); // ✅ Set only if API confirms
  //       } else {
  //         setIsAuthenticated(false);
  //       }
  //     } catch (error) {
  //       console.error("Failed to fetch user:", error);
  //       setIsAuthenticated(false);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchUser();
  // }, []);


  return (
    <>
      
        <div className="flex flex-col gap-5">
          <DashboardAnalytics userPostComments={userPostComments} userPosts={userPosts} />
          <DashboardAction />
          <DashboardMiddle userPosts={userPosts} />
        </div>
     

      {/* //<DashboardBottom/>  */}
    </>
  )
}
