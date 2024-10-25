'use client'

import React, { useState, useRef, useEffect } from 'react'
import { Heart, MessageCircle, Send, ChevronDown } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"

interface Post {
  id: number
  name: string
  time: string
  content: string
  likedBy: string[]
  comments: { id: number; name: string; content: string }[]
}

const currentUser = 'Current User'

export default function MiddleElement() {
  const [newPost, setNewPost] = useState('')
  const [posts, setPosts] = useState<Post[]>([
    { id: 1, name: 'Yael Adamson-Brown', time: '2 hours ago', content: 'New update by Yael Adamson-Brown working on the Using football to teach life skills to children for An Organisation Demo with Sofia', likedBy: [], comments: [] },
    { id: 2, name: 'Yael Adamson-Brown', time: '5 hours ago', content: 'New update by Yael Adamson-Brown working on the Using football to teach life skills to children for An Organisation Demo with Sofia', likedBy: [], comments: [] },
    { id: 3, name: 'Respondent', time: '1 day ago', content: 'New update by Respondent working at Money Management starting at 14:30 on 28th November 2023 on Using football to teach life skills to children for An Organisation Demo with Kit Frank', likedBy: [], comments: [] },
  ])
  const [expandedPost, setExpandedPost] = useState<number | null>(null)
  const [newComment, setNewComment] = useState('')
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 200)}px`
    }
  }, [newPost])

  const handlePostSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (newPost.length < 3) {
      alert('Your post must be at least 3 characters long.')
      return
    }
    const newPostObj: Post = {
      id: posts.length + 1,
      name: currentUser,
      time: 'Just now',
      content: newPost,
      likedBy: [],
      comments: [],
    }
    setPosts([newPostObj, ...posts])
    setNewPost('')
  }

  const handleLike = (postId: number) => {
    setPosts(posts.map(post => 
      post.id === postId
        ? post.likedBy.includes(currentUser)
          ? { ...post, likedBy: post.likedBy.filter(user => user !== currentUser) }
          : { ...post, likedBy: [...post.likedBy, currentUser] }
        : post
    ))
  }

  const handleCommentSubmit = (postId: number) => {
    if (newComment.length < 1) return
    setPosts(posts.map(post => 
      post.id === postId ? {
        ...post,
        comments: [...post.comments, { id: post.comments.length + 1, name: currentUser, content: newComment }]
      } : post
    ))
    setNewComment('')
  }

  return (
    <ScrollArea className="sm:h-[calc(100vh-1rem)] h-screen w-[calc(100vw-1rem)] translate-x-2  mx-auto sm:w-full">
      <div className=" mx-auto px-16 md:px-4 md:pr-5 bg-yellow-50">
        <Card className='border-none'>
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-teal-700">Newsfeed</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handlePostSubmit} className="mb-6">
              <textarea
                ref={textareaRef}
                className="w-full px-8 sm:p-2 border rounded-md focus:ring-teal-500 focus:border-teal-500 transition-all duration-200 bg-white text-gray-600 overflow-y-auto"
                placeholder="Share some progress..."
                value={newPost}
                onChange={(e) => setNewPost(e.target.value)}
                style={{ minHeight: '60px', maxHeight: '200px', resize: 'none' }}
              ></textarea>
              <Button type="submit" className="mt-2 bg-teal-600 text-white hover:bg-teal-700">
                Post
              </Button>
            </form>

            <div className="space-y-6">
              {posts.map((post) => (
                <motion.div 
                  key={post.id} 
                  className="border-b pb-4 last:border-b-0"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex items-center mb-2">
                    <Avatar className="h-10 w-10 mr-2">
                      <AvatarImage src={`/placeholder.svg?height=40&width=40`} alt={post.name} />
                      <AvatarFallback>{post.name[0].toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold text-teal-700">{post.name}</p>
                      <p className="text-sm text-gray-500">{post.time}</p>
                    </div>
                  </div>
                  <p className="text-gray-600 whitespace-pre-wrap break-words">{post.content}</p>
                  <div className="mt-2 flex items-center space-x-4">
                    <motion.button 
                      className="flex items-center text-gray-500 hover:text-teal-600"
                      onClick={() => handleLike(post.id)}
                      whileTap={{ scale: 0.95 }}
                    >
                      <motion.div
                        animate={{ scale: post.likedBy.includes(currentUser) ? [1, 1.2, 1] : 1 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Heart className={`w-5 h-5 mr-1 ${post.likedBy.includes(currentUser) ? 'fill-teal-500 text-teal-500' : ''}`} />
                      </motion.div>
                      <span>{post.likedBy.length} Likes</span>
                    </motion.button>
                    <button 
                      className="flex items-center text-gray-500 hover:text-teal-600"
                      onClick={() => setExpandedPost(expandedPost === post.id ? null : post.id)}
                    >
                      <MessageCircle className="w-5 h-5 mr-1" />
                      <span>{post.comments.length} Comments</span>
                    </button>
                  </div>
                  <AnimatePresence>
                    {expandedPost === post.id && (
                      <motion.div 
                        className="mt-4"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        {post.comments.map((comment) => (
                          <motion.div 
                            key={comment.id} 
                            className="bg-white p-2 rounded-md mb-2"
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.2 }}
                          >
                            <p className="font-semibold text-teal-700">{comment.name}</p>
                            <p className="text-gray-600">{comment.content}</p>
                          </motion.div>
                        ))}
                        <div className="flex mt-2">
                          <input
                            type="text"
                            placeholder="Add a comment..."
                            className="flex-grow p-2 border rounded-l-md focus:outline-none focus:ring-1 focus:ring-teal-500 bg-white text-gray-600"
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                          />
                          <Button
                            className="bg-teal-500 text-white rounded-r-md hover:bg-teal-600"
                            onClick={() => handleCommentSubmit(post.id)}
                          >
                            <Send className="w-5 h-5" />
                          </Button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
        <div className="p-4 mt-2 border-t bg-white flex justify-center">
          <Button variant="ghost" className="text-teal-600 hover:text-teal-700 hover:bg-teal-50">
            Load More <ChevronDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </ScrollArea>
  )
}