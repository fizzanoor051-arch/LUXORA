"use client";

import { useState } from "react";
import { DollarSign, TrendingUp } from "lucide-react";

const revenueData = {
  weekly: [
    3200, 4100, 3600, 5200, 4800, 6900, 5800,
  ],
  monthly: [
    12400, 15600, 14200, 18100, 16900, 21300,
    19800, 24500, 23100, 27800, 26300, 31200,
  ],
};

const labels = {
  weekly: [
    "Mon",
    "Tue",
    "Wed",
    "Thu",
    "Fri",
    "Sat",
    "Sun",
  ],
  monthly: [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ],
};

export default function RevenueChart() {
  const [period, setPeriod] = useState<
    "weekly" | "monthly"
  >("weekly");

  const values = revenueData[period];
  const currentLabels = labels[period];

  const max = Math.max(...values);
  const min = Math.min(...values);

  const width = 700;
  const height = 260;
  const paddingX = 20;
  const paddingY = 25;

  const points = values
    .map((value, index) => {
      const x =
        paddingX +
        (index / (values.length - 1)) *
          (width - paddingX * 2);

      const normalized =
        (value - min) / (max - min || 1);

      const y =
        height -
        paddingY -
        normalized *
          (height - paddingY * 2);

      return `${x},${y}`;
    })
    .join(" ");

  const total = values.reduce(
    (sum, value) => sum + value,
    0
  );

  return (
    <section className="rounded-2xl border border-black/[0.06] bg-white p-5 md:p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#f3eaf4]">
            <DollarSign
              size={19}
              strokeWidth={1.6}
              className="text-[#8d5c91]"
            />
          </div>

          <div>
            <h2 className="font-serif text-xl font-semibold text-[#21152b]">
              Revenue
            </h2>

            <div className="mt-1 flex items-center gap-2">
              <span className="font-serif text-2xl font-semibold text-[#21152b]">
                ${total.toLocaleString()}
              </span>

              <span className="flex items-center gap-1 text-[10px] font-medium text-[#66805e]">
                <TrendingUp size={12} />
                12.8%
              </span>
            </div>
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
            7 Days
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
            12 Months
          </button>
        </div>
      </div>

      <div className="mt-7 overflow-x-auto">
        <div className="min-w-[600px]">
          <svg
            viewBox={`0 0 ${width} ${height}`}
            className="h-64 w-full overflow-visible"
            preserveAspectRatio="none"
          >
            {[0, 1, 2, 3, 4].map((line) => {
              const y =
                paddingY +
                (line / 4) *
                  (height - paddingY * 2);

              return (
                <line
                  key={line}
                  x1={paddingX}
                  y1={y}
                  x2={width - paddingX}
                  y2={y}
                  stroke="currentColor"
                  strokeWidth="1"
                  className="text-black/[0.05]"
                />
              );
            })}

            <polyline
              points={points}
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-[#8d5c91]"
            />

            {values.map((value, index) => {
              const x =
                paddingX +
                (index / (values.length - 1)) *
                  (width - paddingX * 2);

              const normalized =
                (value - min) / (max - min || 1);

              const y =
                height -
                paddingY -
                normalized *
                  (height - paddingY * 2);

              return (
                <g key={currentLabels[index]}>
                  <circle
                    cx={x}
                    cy={y}
                    r="5"
                    fill="currentColor"
                    className="text-white"
                    stroke="currentColor"
                    strokeWidth="3"
                  />

                  <text
                    x={x}
                    y={height - 3}
                    textAnchor="middle"
                    className="fill-[#817783] text-[10px]"
                  >
                    {currentLabels[index]}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>
      </div>
    </section>
  );
}