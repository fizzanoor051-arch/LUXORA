"use client";

import { useState } from "react";
import { BarChart3 } from "lucide-react";

const weeklyData = [
  { day: "Mon", value: 42 },
  { day: "Tue", value: 58 },
  { day: "Wed", value: 47 },
  { day: "Thu", value: 76 },
  { day: "Fri", value: 64 },
  { day: "Sat", value: 91 },
  { day: "Sun", value: 72 },
];

const monthlyData = [
  { day: "Jan", value: 48 },
  { day: "Feb", value: 62 },
  { day: "Mar", value: 55 },
  { day: "Apr", value: 78 },
  { day: "May", value: 68 },
  { day: "Jun", value: 88 },
  { day: "Jul", value: 74 },
  { day: "Aug", value: 94 },
  { day: "Sep", value: 82 },
  { day: "Oct", value: 97 },
  { day: "Nov", value: 89 },
  { day: "Dec", value: 100 },
];

export default function SalesChart() {
  const [period, setPeriod] = useState<
    "weekly" | "monthly"
  >("weekly");

  const data =
    period === "weekly" ? weeklyData : monthlyData;

  const maxValue = Math.max(
    ...data.map((item) => item.value)
  );

  return (
    <section className="rounded-2xl border border-black/[0.06] bg-white p-5 md:p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#f3eaf4]">
            <BarChart3
              size={19}
              strokeWidth={1.6}
              className="text-[#8d5c91]"
            />
          </div>

          <div>
            <h2 className="font-serif text-xl font-semibold text-[#21152b]">
              Sales Overview
            </h2>

            <p className="mt-1 text-xs text-[#817783]">
              Track your sales performance.
            </p>
          </div>
        </div>

        <div className="flex rounded-xl bg-[#f7f3f8] p-1">
          <button
            type="button"
            onClick={() => setPeriod("weekly")}
            className={`rounded-lg px-3 py-2 text-[10px] font-medium uppercase tracking-[0.08em] transition ${
              period === "weekly"
                ? "bg-white text-[#8d5c91] shadow-sm"
                : "text-[#817783]"
            }`}
          >
            Weekly
          </button>

          <button
            type="button"
            onClick={() => setPeriod("monthly")}
            className={`rounded-lg px-3 py-2 text-[10px] font-medium uppercase tracking-[0.08em] transition ${
              period === "monthly"
                ? "bg-white text-[#8d5c91] shadow-sm"
                : "text-[#817783]"
            }`}
          >
            Monthly
          </button>
        </div>
      </div>

      <div className="mt-8 overflow-x-auto">
        <div
          className={`relative min-w-[500px] ${
            period === "monthly"
              ? "h-72"
              : "h-64"
          }`}
        >
          <div className="absolute inset-0 flex flex-col justify-between">
            {[100, 75, 50, 25, 0].map((value) => (
              <div
                key={value}
                className="flex items-center gap-3"
              >
                <span className="w-7 text-right text-[9px] text-[#aaa1ad]">
                  {value}
                </span>

                <div className="h-px flex-1 bg-black/[0.05]" />
              </div>
            ))}
          </div>

          <div className="absolute bottom-0 left-10 right-0 top-0 flex items-end justify-around gap-2">
            {data.map((item) => {
              const height =
                (item.value / maxValue) * 90;

              return (
                <div
                  key={item.day}
                  className="group flex h-full flex-1 flex-col items-center justify-end"
                >
                  <div className="relative flex w-full justify-center">
                    <span className="absolute -top-7 rounded-md bg-[#21152b] px-2 py-1 text-[9px] text-white opacity-0 transition group-hover:opacity-100">
                      {item.value}
                    </span>

                    <div
                      style={{
                        height: `${height}%`,
                      }}
                      className="w-[55%] min-w-3 rounded-t-lg bg-[#8d5c91] transition-all duration-500 hover:bg-[#21152b]"
                    />
                  </div>

                  <span className="mt-3 text-[9px] text-[#817783]">
                    {item.day}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}