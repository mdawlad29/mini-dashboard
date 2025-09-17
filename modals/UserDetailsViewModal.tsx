"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
  EnvelopeIcon,
  PhoneIcon,
  GlobeAltIcon,
  BuildingOfficeIcon,
  MapPinIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { User } from "@/types";

interface ModalProps {
  title?: string;
  isOpen: boolean;
  onClose: () => void;
  selectedUser: User | null;
}

export function UserDetailsViewModal({
  title,
  isOpen,
  onClose,
  selectedUser,
}: ModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-full p-4 text-center sm:p-0">
            {/* Stronger blur background */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
              className="fixed inset-0 backdrop-blur-lg bg-white/20"
            />

            {/* Modal content with enhanced shadow */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 500 }}
              className="relative transform overflow-hidden rounded-xl bg-white/90 text-left drop-shadow-2xl backdrop-blur-3xl transition-all sm:my-8 sm:w-full sm:max-w-lg"
            >
              <div className="bg-white/90 px-6 pb-6 pt-5 sm:p-6 sm:pb-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    {title && (
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">
                        {title}
                      </h3>
                    )}

                    {selectedUser && (
                      <div className="space-y-4">
                        <div className="flex items-center space-x-4">
                          <div className="h-12 w-12 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center text-white text-xl font-medium">
                            {selectedUser.name.charAt(0)}
                          </div>
                          <div>
                            <h3 className="text-lg font-medium text-gray-900">
                              {selectedUser.name}
                            </h3>
                            <p className="text-gray-500">
                              @{selectedUser.username}
                            </p>
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
                              {selectedUser.address.street},{" "}
                              {selectedUser.address.suite},{" "}
                              {selectedUser.address.city}
                            </span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={onClose}
                    className="ml-4 rounded-md bg-white/70 text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
                  >
                    <span className="sr-only">Close</span>
                    <XMarkIcon className="h-6 w-6" />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}
