import Link from "next/link";
import { BarChart3, Bot, BriefcaseBusiness, LayoutDashboard } from "lucide-react";

import { LogoutButton } from "@/components/layout/logout-button";

const navItems = [
  { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
  { href: "/jobs", label: "Job Tracker", icon: BriefcaseBusiness },
  { href: "/ai", label: "AI Proposal", icon: Bot },
  { href: "/analytics", label: "Analytics", icon: BarChart3 }
];

export function DashboardShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto grid min-h-screen max-w-7xl grid-cols-1 md:grid-cols-[260px_1fr]">
        <aside className="border-r bg-white p-4">
          <Link href="/dashboard" className="mb-6 block text-lg font-semibold">
            AI Job Tracker
          </Link>
          <nav className="space-y-1">
            {navItems.map((item) => (
              <Link
                className="flex items-center rounded-md px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100"
                key={item.href}
                href={item.href}
              >
                <item.icon className="mr-2 h-4 w-4" />
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="mt-8 border-t pt-4">
            <LogoutButton />
          </div>
        </aside>

        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}
