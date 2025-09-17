'use client'
import { usePosts } from '@/context/postContext'
import BullseyeIcon from './BullsEyeIcon'
import DashboardAnalyticCard from './DashboardAnalyticCard'
import DoneIcon from './DoneIcon'
import PendingIcon from './PendingIcon'
import { useUser } from '@/context/userContext'
import { PostType } from './PostCard'
import { useEffect, useState } from 'react'
import { CommentType, useComments } from '@/context/commentContext'

export default function DashboardAnalytics({
  userPosts,
  userPostComments,
}: {
  userPosts: PostType[]
  userPostComments: CommentType[]
}) {
  const { user } = useUser()
  // const { posts } = usePosts()
  // const { comments } = useComments()

  const { draftPosts } = usePosts()

  const numberOfPublished = userPosts.length

  const numberOfDrafts = draftPosts.filter((p: PostType) => p.author.id === user.id).length

  console.log('User comments', userPostComments)

  return (
    <div className="grid grid-cols-2 md:flex gap-4">
      <DashboardAnalyticCard
        label="Posts"
        number={numberOfPublished + numberOfDrafts}
        icon={<BullseyeIcon />}
      />
      <DashboardAnalyticCard label="Published" number={numberOfPublished} icon={<DoneIcon />} />
      <DashboardAnalyticCard label="Drafts" number={numberOfDrafts} icon={<PendingIcon />} />
      <DashboardAnalyticCard
        label="Comments"
        number={userPostComments.length}
        icon={<BullseyeIcon />}
      />
    </div>
  )
}
