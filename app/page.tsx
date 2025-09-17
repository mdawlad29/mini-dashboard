"use client";

import dynamic from "next/dynamic";
import { LoadingSpinner } from "@/shared/LoadingSpinner";

const DashboardSection = dynamic(() => import("@/components/Dashboard"), {
  loading: () => <LoadingSpinner />,
});

export default function Dashboard() {
  return <DashboardSection />;
}
