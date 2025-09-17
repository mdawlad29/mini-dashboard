"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useFetch } from "@/hooks/useFetch";
import { Post } from "@/types";
import { Card } from "@/components/Card";
import { LoadingSpinner, CardSkeleton } from "@/components/LoadingSpinner";
import { ErrorMessage } from "@/components/ErrorMessage";

export default function PostsPage() {
  const [showError, setShowError] = useState(false);
  const {
    data: posts,
    loading,
    error,
    refetch,
  } = useFetch<Post[]>(
    showError
      ? "https://jsonplaceholder.typicode.com/invalid-posts"
      : "https://jsonplaceholder.typicode.com/posts"
  );

  const handleShowError = () => {
    setShowError(true);
  };

  const handleRetry = () => {
    setShowError(false);
    refetch();
  };

  if (loading) {
    return (
      <div className="space-y-8">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">Posts</h1>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, index) => (
            <CardSkeleton key={index} />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-8">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">Posts</h1>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleRetry}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors duration-200"
          >
            Load Valid Posts
          </motion.button>
        </div>
        <ErrorMessage message={error.message} onRetry={handleRetry} />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-bold text-gray-900"
        >
          All posts
        </motion.h1>

        <motion.button
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleShowError}
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md transition-colors duration-200"
        >
          Demo Error
        </motion.button>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {posts?.map((post, index) => (
          <Link key={post.id} href={`/posts/${post.id}`}>
            <Card delay={index * 0.05} className="h-full">
              <h3 className="font-semibold text-gray-900 mb-3 line-clamp-2">
                {post.title}
              </h3>
              <p className="text-gray-600 text-sm line-clamp-3 mb-4">
                {post.body}
              </p>
              <div className="flex items-center justify-between text-xs text-gray-500">
                <span>Post #{post.id}</span>
                <span>User {post.userId}</span>
              </div>
            </Card>
          </Link>
        ))}
      </motion.div>
    </div>
  );
}
