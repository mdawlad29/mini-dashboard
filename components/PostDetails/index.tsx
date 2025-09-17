import { PageHeading } from "@/shared/PageHeading";
import React from "react";
import { motion } from "framer-motion";
import { Card } from "@/shared/Card";
import Link from "next/link";
import { Post } from "@/types";

const PostDetails = ({
  posts,
  handleShowError,
}: {
  posts: Post[];
  handleShowError: () => void;
}) => {
  return (
    <div className="space-y-8">
      <PageHeading
        onClick={handleShowError}
        title="All Posts"
        btnText="Demo Error"
      />

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
};

export default PostDetails;
