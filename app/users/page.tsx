"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useFetch } from "@/hooks/useFetch";
import { User } from "@/types";
import { LoadingSpinner } from "@/shared/LoadingSpinner";
import { ErrorMessage } from "@/shared/ErrorMessage";
import { UserDetailsViewModal } from "@/modals/UserDetailsViewModal";
import { PageHeading } from "@/shared/PageHeading";
import UserDetails from "@/components/UserDetails";

export default function UsersPage() {
  const [showError, setShowError] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const {
    data: users,
    loading,
    error,
    refetch,
  } = useFetch<User[]>(
    showError
      ? "https://jsonplaceholder.typicode.com/invalid-users"
      : "https://jsonplaceholder.typicode.com/users"
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
        <h1 className="text-3xl font-bold text-gray-900">Users</h1>
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-8">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">Users</h1>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleRetry}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors duration-200"
          >
            Load Valid Users
          </motion.button>
        </div>
        <ErrorMessage message={error.message} onRetry={handleRetry} />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <PageHeading
        title="Users"
        btnText="Demo Error"
        onClick={handleShowError}
      />

      <UserDetails users={users ?? []} setSelectedUser={setSelectedUser} />

      {/* User Details Modal */}
      <UserDetailsViewModal
        title="User Details"
        isOpen={!!selectedUser}
        selectedUser={selectedUser}
        onClose={() => setSelectedUser(null)}
      />
    </div>
  );
}
