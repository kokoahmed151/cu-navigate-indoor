import React from "react";
import {
  Search,
  Map,
  Calendar,
  Bell,
  User,
  Settings,
  Layers,
  ChevronDown,
  RefreshCw,
  Compass,
} from "lucide-react";

type CampusUpdate = {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  badge?: string;
};

const campusUpdates: CampusUpdate[] = [
  {
    id: 1,
    title: "Campus Café Special",
    description: "20% off all beverages this week",
    icon: <CoffeeIcon />,
    badge: "Offer",
  },
  {
    id: 2,
    title: "Library Workshop",
    description: "Research skills • Friday 3 PM",
    icon: <Calendar className="w-4 h-4 text-sky-500" />,
    badge: "Workshop",
  },
  {
    id: 3,
    title: "Career Fair",
    description: "Next Tuesday in Main Hall",
    icon: <Map className="w-4 h-4 text-emerald-500" />,
    badge: "Event",
  },
];

export default function Index() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      {/* Top bar */}
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex h-16 max-w-6xl items-center gap-4 px-4">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-600 text-white font-semibold">
              CU
            </div>
            <span className="text-base font-semibold tracking-tight">
              Navigate
            </span>
          </div>

          {/* Search */}
          <div className="relative ml-4 flex-1">
            <Search className="pointer-events-none absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search for rooms, buildings..."
              className="h-10 w-full rounded-full border border-slate-200 bg-slate-50 pl-9 pr-10 text-sm outline-none transition focus:border-sky-400 focus:bg-white focus:ring-2 focus:ring-sky-100"
            />
          </div>

          {/* Top-right icons */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 hover:bg-slate-100"
            >
              <RefreshCw className="h-4 w-4" />
            </button>
            <button
              type="button"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 hover:bg-slate-100"
            >
              <User className="h-4 w-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="mx-auto flex max-w-6xl gap-6 px-4 py-6">
        {/* Left sidebar */}
        <aside className="w-full max-w-xs space-y-4">
          {/* Tabs */}
          <nav className="flex rounded-xl bg-white p-1 shadow-sm ring-1 ring-slate-200">
            <TabButton icon={<Map className="w-4 h-4" />} active>
              Navigate
            </TabButton>
            <TabButton icon={<Calendar className="w-4 h-4" />}>
              Schedule
            </TabButton>
            <TabButton icon={<User className="w-4 h-4" />}>Profile</TabButton>
          </nav>

          {/* Student profile card */}
          <section className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-slate-100">
                <User className="h-7 w-7 text-slate-500" />
              </div>
              <div className="text-right sm:text-left">
                <h2 className="text-sm font-semibold text-slate-900">
                  Student Profile
                </h2>
                <p className="text-xs text-slate-500">
                  Sign in to save preferences
                </p>
              </div>
            </div>

            <button className="flex w-full items-center justify-center gap-2 rounded-full bg-sky-600 py-2.5 text-sm font-semibold text-white shadow hover:bg-sky-700">
              <LogInIcon />
              <span>Sign In</span>
            </button>

            {/* Preferences */}
            <div className="mt-5 border-t border-slate-200 pt-4">
              <h3 className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
                Preferences
              </h3>
              <PreferenceRow label="Accessibility Mode" />
              <PreferenceRow label="Voice Guidance" />
            </div>
          </section>
        </aside>

        {/* Right content: map + updates */}
        <section className="flex flex-1 flex-col gap-4">
          {/* Floor selector + map placeholder */}
          <div className="flex flex-1 flex-col rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-200">
            {/* Floor dropdown */}
            <div className="flex justify-end">
              <div className="relative inline-flex min-w-[180px] items-center justify-between rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100">
                <span className="flex items-center gap-2">
                  <Layers className="h-4 w-4 text-sky-600" />
                  Floor 1
                </span>
                <ChevronDown className="h-4 w-4 text-slate-400" />
              </div>
            </div>

            {/* Map placeholder */}
            <div className="mt-6 flex flex-1 flex-col items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-slate-50/80 px-6 py-10 text-center">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-sky-100 text-sky-600">
                <Building3DIcon />
              </div>
              <h2 className="text-lg font-semibold text-slate-900">
                3D Campus Map
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Interactive navigation coming soon
              </p>
              <button className="mt-4 inline-flex items-center justify-center gap-2 rounded-full bg-slate-900 px-4 py-2 text-sm font-medium text-white shadow hover:bg-slate-800">
                <Compass className="h-4 w-4" />
                <span>Preview indoor map</span>
              </button>
            </div>
          </div>

          {/* Campus updates */}
          <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-200">
            <div className="mb-3 flex items-center justify-between">
              <h3 className="text-sm font-semibold text-slate-900">
                Campus Updates
              </h3>
              <span className="text-xs text-slate-500">Today</span>
            </div>
            <div className="grid gap-3 md:grid-cols-3">
              {campusUpdates.map((item) => (
                <article
                  key={item.id}
                  className="flex items-start gap-3 rounded-xl border border-slate-100 bg-slate-50/70 px-3 py-3 hover:border-sky-100 hover:bg-sky-50/70"
                >
                  <div className="mt-0.5 flex h-8 w-8 items-center justify-center rounded-full bg-white shadow-sm">
                    {item.icon}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <h4 className="truncate text-sm font-semibold text-slate-900">
                        {item.title}
                      </h4>
                      {item.badge && (
                        <span className="whitespace-nowrap rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-semibold text-amber-700">
                          {item.badge}
                        </span>
                      )}
                    </div>
                    <p className="mt-0.5 line-clamp-2 text-xs text-slate-500">
                      {item.description}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

/* ---------- Small UI helpers ---------- */

function TabButton({
  children,
  icon,
  active,
}: {
  children: React.ReactNode;
  icon: React.ReactNode;
  active?: boolean;
}) {
  return (
    <button
      type="button"
      className={`flex flex-1 items-center justify-center gap-2 rounded-lg px-3 py-2 text-xs font-medium transition
        ${
          active
            ? "bg-slate-900 text-white shadow-sm"
            : "text-slate-500 hover:bg-slate-100"
        }`}
    >
      {icon}
      <span>{children}</span>
    </button>
  );
}

function PreferenceRow({ label }: { label: string }) {
  return (
    <div className="flex items-center justify-between py-1.5 text-sm">
      <span className="text-xs text-slate-600">{label}</span>
      <button
        type="button"
        className="inline-flex items-center gap-1 rounded-full border border-slate-200 bg-slate-50 px-2 py-0.5 text-[11px] font-medium text-slate-500"
      >
        <span>Off</span>
        <TogglePill />
      </button>
    </div>
  );
}

/* ---------- Tiny icons (no extra deps) ---------- */

function CoffeeIcon() {
  return (
    <svg
      className="h-4 w-4 text-amber-500"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 8h13v9a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3V8z" />
      <path d="M16 8h1a4 4 0 0 1 0 8h-1" />
      <line x1="6" y1="1" x2="6" y2="4" />
      <line x1="10" y1="1" x2="10" y2="4" />
      <line x1="14" y1="1" x2="14" y2="4" />
    </svg>
  );
}

function Building3DIcon() {
  return (
    <svg
      className="h-8 w-8"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 21V8l9-5 9 5v13" />
      <path d="M9 21V12h6v9" />
    </svg>
  );
}

function TogglePill() {
  return (
    <span className="relative inline-flex h-4 w-7 items-center rounded-full bg-slate-300">
      <span className="absolute left-0.5 h-3 w-3 rounded-full bg-white shadow" />
    </span>
  );
}

function LogInIcon() {
  return <Compass className="h-4 w-4" />;
}
