"use client";

import { Sidebar } from "@/partials/Sidebar";
import { usePathname } from "next/navigation";

export const LayoutSection = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />

      {/* Main content wrapper */}
      <div className="flex-1 flex flex-col">
        <div className="flex items-center px-5 h-16 border-b border-gray-200 bg-gradient-to-r from-blue-600 to-purple-600">
          <h2 className="text-2xl font-bold text-white uppercase">
            {pathname === "/" ? "Dashboard" : pathname?.replaceAll("/", "")}
          </h2>
        </div>

        <main className="flex-1 overflow-y-auto p-5 overflow-x-hidden">
          {children}
        </main>

        <footer className="flex-shrink-0 bg-gray-100 p-3 text-center border-t border-gray-200">
          © 2025 Mini Dashboard
        </footer>
      </div>
    </div>
  );
};
