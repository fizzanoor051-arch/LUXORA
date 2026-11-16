"use client";

import { useState } from "react";
import {
  Bell,
  ChevronDown,
  Menu,
  Search,
  UserRound,
} from "lucide-react";

interface AdminHeaderProps {
  onMenuClick?: () => void;
}

export default function AdminHeader({
  onMenuClick,
}: AdminHeaderProps) {
  const [showProfile, setShowProfile] = useState(false);

  return (
    <header className="sticky top-0 z-30 border-b border-black/[0.06] bg-white/95 backdrop-blur">
      <div className="flex h-20 items-center justify-between gap-4 px-5 lg:px-8">
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={onMenuClick}
            aria-label="Open admin menu"
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-black/[0.07] text-[#302536] lg:hidden"
          >
            <Menu size={20} strokeWidth={1.6} />
          </button>

          <div>
            <p className="hidden text-[10px] font-medium uppercase tracking-[0.18em] text-[#8d5c91] sm:block">
              LUXORA ADMIN
            </p>

            <h1 className="font-serif text-xl font-semibold text-[#21152b] sm:text-2xl">
              Dashboard
            </h1>
          </div>
        </div>

        <div className="hidden max-w-sm flex-1 md:block">
          <div className="relative">
            <Search
              size={17}
              strokeWidth={1.6}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-[#9a919d]"
            />

            <input
              type="search"
              placeholder="Search anything..."
              className="w-full rounded-xl border border-black/[0.07] bg-[#faf8fb] py-3 pl-11 pr-4 text-sm text-[#302536] outline-none transition placeholder:text-[#aaa1ad] focus:border-[#8d5c91] focus:bg-white"
            />
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <button
            type="button"
            aria-label="Notifications"
            className="relative flex h-10 w-10 items-center justify-center rounded-xl text-[#665c69] transition hover:bg-[#f5eff6] hover:text-[#8d5c91]"
          >
            <Bell size={19} strokeWidth={1.6} />

            <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-[#8d5c91]" />
          </button>

          <div className="relative">
            <button
              type="button"
              onClick={() =>
                setShowProfile(!showProfile)
              }
              className="flex items-center gap-2 rounded-xl p-1.5 transition hover:bg-[#faf7fb]"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#21152b] text-white">
                <UserRound
                  size={17}
                  strokeWidth={1.6}
                />
              </div>

              <div className="hidden text-left sm:block">
                <p className="text-xs font-medium text-[#302536]">
                  Admin
                </p>

                <p className="text-[10px] text-[#918895]">
                  Administrator
                </p>
              </div>

              <ChevronDown
                size={15}
                className="hidden text-[#817783] sm:block"
              />
            </button>

            {showProfile && (
              <div className="absolute right-0 top-14 w-48 rounded-xl border border-black/[0.06] bg-white p-2 shadow-xl">
                <button
                  type="button"
                  className="w-full rounded-lg px-3 py-2.5 text-left text-sm text-[#665c69] transition hover:bg-[#faf7fb] hover:text-[#8d5c91]"
                >
                  Profile
                </button>

                <button
                  type="button"
                  className="w-full rounded-lg px-3 py-2.5 text-left text-sm text-[#665c69] transition hover:bg-[#faf7fb] hover:text-[#8d5c91]"
                >
                  Settings
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}