'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { use } from 'react';
import { useFetch } from '@/hooks/useFetch';
import { Post, User } from '@/types';
import { Card } from '@/components/Card';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { ErrorMessage } from '@/components/ErrorMessage';
import { ArrowLeftIcon, UserIcon } from '@heroicons/react/24/outline';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function PostDetailPage({ params }: PageProps) {
  const { id } = use(params);
  
  const { data: post, loading: postLoading, error: postError } = useFetch<Post>(
    `https://jsonplaceholder.typicode.com/posts/${id}`
  );
  
  const { data: user, loading: userLoading } = useFetch<User>(
    post ? `https://jsonplaceholder.typicode.com/users/${post.userId}` : null
  );

  if (postLoading) {
    return (
      <div className="space-y-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="h-6 bg-gray-200 rounded w-full mb-2"></div>
          <div className="h-6 bg-gray-200 rounded w-3/4"></div>
        </div>
      </div>
    );
  }

  if (postError) {
    return <ErrorMessage message={postError.message} />;
  }

  if (!post) {
    return <ErrorMessage message="Post not found" />;
  }

  return (
    <div className="space-y-8">
      {/* Back button */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
      >
        <Link
          href="/posts"
          className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors duration-200"
        >
          <ArrowLeftIcon className="h-4 w-4 mr-2" />
          Back to Posts
        </Link>
      </motion.div>

      {/* Post content */}
      <Card delay={0.1}>
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-3xl font-bold text-gray-900 mb-6"
        >
          {post.title}
        </motion.h1>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="prose prose-lg max-w-none mb-6"
        >
          <p className="text-gray-700 leading-relaxed">{post.body}</p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="border-t border-gray-200 pt-6"
        >
          <div className="flex items-center text-sm text-gray-500">
            <UserIcon className="h-4 w-4 mr-2" />
            <span>Post #{post.id}</span>
            <span className="mx-2">•</span>
            <span>User {post.userId}</span>
          </div>
        </motion.div>
      </Card>

      {/* Author info */}
      {user && (
        <Card delay={0.5}>
          <motion.h2 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-xl font-semibold text-gray-900 mb-4"
          >
            About the Author
          </motion.h2>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="space-y-2"
          >
            <h3 className="font-medium text-gray-900">{user.name}</h3>
            <p className="text-gray-600">@{user.username}</p>
            <p className="text-gray-600">{user.email}</p>
            {user.website && (
              <a
                href={`https://${user.website}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 transition-colors duration-200"
              >
                {user.website}
              </a>
            )}
            <p className="text-sm text-gray-500 mt-4">
              Works at {user.company.name}
            </p>
            <p className="text-sm text-gray-500 italic">
              "{user.company.catchPhrase}"
            </p>
          </motion.div>
        </Card>
      )}
    </div>
  );
}