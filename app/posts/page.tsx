"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useFetch } from "@/hooks/useFetch";
import { Post } from "@/types";
import { Card } from "@/shared/Card";
import { LoadingSpinner, CardSkeleton } from "@/shared/LoadingSpinner";
import { ErrorMessage } from "@/shared/ErrorMessage";
import { PageHeading } from "@/shared/PageHeading";
import PostDetailPage from "./[id]/page";
import PostDetails from "@/components/PostDetails";

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

  return <PostDetails posts={posts ?? []} handleShowError={handleShowError} />;
}
