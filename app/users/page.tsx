"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useFetch } from "@/hooks/useFetch";
import { User } from "@/types";
import { LoadingSpinner } from "@/shared/LoadingSpinner";
import { ErrorMessage } from "@/shared/ErrorMessage";
import { UserDetailsViewModal } from "@/modals/UserDetailsViewModal";
import {
  EnvelopeIcon,
  PhoneIcon,
  GlobeAltIcon,
  BuildingOfficeIcon,
  MapPinIcon,
} from "@heroicons/react/24/outline";
import { PageHeading } from "@/shared/PageHeading";

export default function UsersPage() {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [showError, setShowError] = useState(false);

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

      {/* Desktop Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="hidden md:block bg-white rounded-lg shadow overflow-hidden"
      >
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Company
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {users?.map((user, index) => (
              <motion.tr
                key={user.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className="hover:bg-gray-50 cursor-pointer transition-colors duration-200"
                onClick={() => setSelectedUser(user)}
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="h-10 w-10 flex-shrink-0">
                      <div className="h-10 w-10 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center text-white font-medium">
                        {user.name.charAt(0)}
                      </div>
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">
                        {user.name}
                      </div>
                      <div className="text-sm text-gray-500">
                        @{user.username}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{user.email}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    {user.company.name}
                  </div>
                  <div className="text-sm text-gray-500">
                    {user.company.catchPhrase}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button className="text-blue-600 hover:text-blue-900">
                    View Details
                  </button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </motion.div>

      {/* Mobile Cards */}
      <div className="md:hidden space-y-4">
        {users?.map((user, index) => (
          <motion.div
            key={user.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            onClick={() => setSelectedUser(user)}
            className="bg-white rounded-lg shadow p-4 cursor-pointer hover:shadow-md transition-shadow duration-200"
          >
            <div className="flex items-center space-x-3">
              <div className="h-12 w-12 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center text-white font-medium">
                {user.name.charAt(0)}
              </div>
              <div className="flex-1">
                <h3 className="font-medium text-gray-900">{user.name}</h3>
                <p className="text-sm text-gray-500">{user.email}</p>
                <p className="text-xs text-gray-400">{user.company.name}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* User Details Modal */}
      <UserDetailsViewModal
        isOpen={!!selectedUser}
        onClose={() => setSelectedUser(null)}
        title="User Details"
      >
        {selectedUser && (
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <div className="h-16 w-16 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center text-white text-xl font-medium">
                {selectedUser.name.charAt(0)}
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900">
                  {selectedUser.name}
                </h3>
                <p className="text-gray-500">@{selectedUser.username}</p>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <EnvelopeIcon className="h-5 w-5 text-gray-400" />
                <span className="text-sm text-gray-600">
                  {selectedUser.email}
                </span>
              </div>

              <div className="flex items-center space-x-3">
                <PhoneIcon className="h-5 w-5 text-gray-400" />
                <span className="text-sm text-gray-600">
                  {selectedUser.phone}
                </span>
              </div>

              {selectedUser.website && (
                <div className="flex items-center space-x-3">
                  <GlobeAltIcon className="h-5 w-5 text-gray-400" />
                  <a
                    href={`https://${selectedUser.website}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-blue-600 hover:text-blue-800"
                  >
                    {selectedUser.website}
                  </a>
                </div>
              )}

              <div className="flex items-center space-x-3">
                <BuildingOfficeIcon className="h-5 w-5 text-gray-400" />
                <div>
                  <div className="text-sm text-gray-600">
                    {selectedUser.company.name}
                  </div>
                  <div className="text-xs text-gray-500 italic">
                    "{selectedUser.company.catchPhrase}"
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <MapPinIcon className="h-5 w-5 text-gray-400" />
                <span className="text-sm text-gray-600">
                  {selectedUser.address.street}, {selectedUser.address.suite},{" "}
                  {selectedUser.address.city}
                </span>
              </div>
            </div>
          </div>
        )}
      </UserDetailsViewModal>
    </div>
  );
}
