// 'use client'
// import { Button } from '@/components/ui/button'
// import AuthPage from './pages/AuthPage'
// import PostCard, { PostType } from '@/components/PostCard'
// import { Suspense, useEffect, useState } from 'react'
// import Link from 'next/link'
// import Sidebar from '@/components/SidebarComponent'
// import LoadingSkeleton from '@/components/LoadingSkeleton'
// import PostsGroup from '@/components/PostsGroup'
// import HomePageAction from '@/components/HomePageAction'
// import { usePosts } from '@/context/postContext'
import HomePageBody from '@/components/HomePageBody'
import BannerSlideshow from '@/components/BannerSlideshow'

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

export const getHeroSection = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/globals/heroSection`, {
    cache: 'no-store', // or 'force-cache' depending on needs
  })

  if (!res.ok) throw new Error('Failed to fetch hero section')

  return res.json()
}

export default async function Page() {
  const hero = await getHeroSection()
  // const {user} = useUser()

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

  // useEffect(() => {
  //   const fetchPosts = async () => {
  //     const res = await fetch('/api/posts', {
  //       method: 'GET',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //     })
  //     const response = await res.json()
  //     console.log('post response', response)
  //     if (res.ok) setPosts(response.docs)
  //   }
  //   fetchPosts()
  // }, [])

  return (
    <div className="font-[JetBrains Mono] flex flex-col gap-3 items-center">
      {/* <div className="flex">
        <div className="w-auto h-auto z-0">
          <img src="/assets/banner.jpg" />
        </div>
        <div className="fixed flex flex-col gap-3 font-sans left-[50%] top-[20%] z-10 text-3xl font-bold text-white">
          <p>Become a Professional blogger</p>
          <p className="text-xl font-medium">
            Express your thoughts, write creative blogs, connect with the world.
          </p>
          <div className="flex gap-3">
            <button className="bg-transparent border-2 p-2 border-white text-xl font-medium rounded-xl shadow-xl hover:bg-white hover:text-black">
              Get Started
            </button>
            <button className="bg-transparent border-2 p-2 border-white text-xl font-medium rounded-xl shadow-xl hover:bg-white hover:text-black">
              Be an Author
            </button>
          </div>
        </div>
      </div> */}
      {/* <BannerSlideshow/> */}
      <div className="relative">
        <img className="z-5" src={hero.heroImage.url} alt="Hero Image" />
        <div className="flex flex-col gap-2 text-gray-600 font-bold left-[60%] top-[30%] absolute z-10">
          <p className=" text-3xl">{hero.heroTitle}</p>
          <p className=" text-xl ">{hero.heroDescription}</p>
        </div>
      </div>

      <HomePageBody />
    </div>
  )
}
