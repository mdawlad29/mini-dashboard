"use client";

import { use } from "react";
import { useFetch } from "@/hooks/useFetch";
import { Post, User } from "@/types";
import { ErrorMessage } from "@/shared/ErrorMessage";
import SinglePost from "@/components/PostDetails/SinglePost";
import { PostLoader } from "@/shared/LoadingSpinner";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function PostDetailPage({ params }: PageProps) {
  const { id } = use(params);

  const {
    data: post,
    loading: postLoading,
    error: postError,
  } = useFetch<Post>(`https://jsonplaceholder.typicode.com/posts/${id}`);

  const { data: user } = useFetch<User>(
    post ? `https://jsonplaceholder.typicode.com/users/${post.userId}` : null
  );

  if (postLoading) {
    return <PostLoader />;
  }

  if (postError) {
    return <ErrorMessage message={postError.message} />;
  }

  if (!post) {
    return <ErrorMessage message="Post not found" />;
  }

  return <SinglePost post={post} user={user} />;
}
