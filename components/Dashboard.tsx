import React from "react";
import { motion } from "framer-motion";
import { Card } from "@/shared/Card";
import {
  ChartBarIcon,
  UserGroupIcon,
  DocumentTextIcon,
  ArrowUpIcon,
  ArrowDownIcon,
} from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";

const stats = [
  {
    name: "Total Posts",
    value: "100",
    change: "+12%",
    trend: "up",
    icon: DocumentTextIcon,
  },
  {
    name: "Active Users",
    value: "10",
    change: "+5%",
    trend: "up",
    icon: UserGroupIcon,
  },
  {
    name: "Engagement",
    value: "87%",
    change: "-2%",
    trend: "down",
    icon: ChartBarIcon,
  },
];

const DashboardSection = () => {
  const router = useRouter();

  const chartData = Array.from({ length: 12 }, (_, i) => ({
    month: i + 1,
    value: Math.floor(Math.random() * 100) + 20,
  }));

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Welcome to Your Dashboard
        </h1>
        <p className="text-gray-600">
          Here's what's happening with your application today.
        </p>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <Card key={stat.name} delay={index * 0.1}>
            <div className="flex items-center">
              <stat.icon className="h-8 w-8 text-blue-600" />
              <div className="ml-4 flex-1">
                <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              </div>
              <div
                className={`flex items-center ${
                  stat.trend === "up" ? "text-green-600" : "text-red-600"
                }`}
              >
                {stat.trend === "up" ? (
                  <ArrowUpIcon className="h-4 w-4" />
                ) : (
                  <ArrowDownIcon className="h-4 w-4" />
                )}
                <span className="ml-1 text-sm font-medium">{stat.change}</span>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Chart */}
      <Card delay={0.4}>
        <h3 className="text-lg font-medium text-gray-900 mb-6">
          Activity Overview
        </h3>
        <div className="h-64 flex items-end justify-between space-x-2">
          {chartData.map((item, index) => (
            <motion.div
              key={item.month}
              initial={{ height: 0 }}
              animate={{ height: `${item.value}%` }}
              transition={{
                delay: 0.6 + index * 0.05,
                duration: 0.5,
                ease: "easeOut",
              }}
              className="bg-gradient-to-t from-blue-600 to-purple-600 rounded-t-sm flex-1 min-h-[10px]"
              style={{ maxWidth: "30px" }}
            />
          ))}
        </div>
        <div className="flex justify-between mt-4 text-xs text-gray-500">
          <span>Jan</span>
          <span>Feb</span>
          <span>Mar</span>
          <span>Apr</span>
          <span>May</span>
          <span>Jun</span>
          <span>Jul</span>
          <span>Aug</span>
          <span>Sep</span>
          <span>Oct</span>
          <span>Nov</span>
          <span>Dec</span>
        </div>
      </Card>

      {/* Quick Actions */}
      <Card delay={0.6}>
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          Quick Actions
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[...Array(2)]?.map((_, idx) => (
            <motion.button
              key={idx}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => router.push(`${idx === 0 ? "/posts" : "/users"}`)}
              className="text-left p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors duration-200 cursor-pointer"
            >
              {idx === 0 ? (
                <DocumentTextIcon className="h-6 w-6 text-blue-600 mb-2" />
              ) : (
                <UserGroupIcon className="h-6 w-6 text-purple-600 mb-2" />
              )}
              <h4 className="font-medium text-gray-900">
                {idx === 0 ? "View Posts" : "Manage Users"}
              </h4>
              <p className="text-sm text-gray-600">
                {idx === 0
                  ? "Browse all posts and articles"
                  : "View and manage user accounts"}
              </p>
            </motion.button>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default DashboardSection;
