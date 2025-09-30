import React from 'react'
import UserProvider from '@/context/userContext'
import './globals.css'
import Sidebar from '@/components/SidebarComponent'
import PostProvider from '@/context/postContext'
import CategoryProvider from '@/context/categoryContext'
import GlobalHeader from '@/components/GlobalHeader'

export const metadata = {
  description: 'A Blog application supporting blogger of different platforms',
  title: 'Blogger',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="light">
      <body>
        <PostProvider>
          <CategoryProvider>
            <UserProvider>
              <div className="sm:flex-col lg:flex-row lg:justify-between gap-1">
                <div>
                  <Sidebar />
                </div>
                <main className="flex flex-col gap-3 p-2 z-0 lg:ml-60 font-sans">
                  <GlobalHeader />
                  {children}
                </main>
              </div>
            </UserProvider>
          </CategoryProvider>
        </PostProvider>
      </body>
    </html>
  )
}
