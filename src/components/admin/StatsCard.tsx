import {
  ArrowDownRight,
  ArrowUpRight,
  BarChart3,
  DollarSign,
  Package,
  ShoppingCart,
  Users,
} from "lucide-react";

interface StatsCardProps {
  title: string;
  value: string | number;
  change?: number;
  description?: string;
  icon?: "revenue" | "orders" | "customers" | "products";
}

const iconMap = {
  revenue: DollarSign,
  orders: ShoppingCart,
  customers: Users,
  products: Package,
};

export default function StatsCard({
  title,
  value,
  change = 0,
  description = "vs. last month",
  icon = "revenue",
}: StatsCardProps) {
  const Icon = iconMap[icon];
  const positive = change >= 0;

  return (
    <div className="rounded-2xl border border-black/[0.06] bg-white p-5 transition hover:-translate-y-0.5 hover:shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#f3eaf4]">
          <Icon
            size={20}
            strokeWidth={1.6}
            className="text-[#8d5c91]"
          />
        </div>

        <div
          className={`flex items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-medium ${
            positive
              ? "bg-[#edf7ef] text-[#5c825f]"
              : "bg-[#fff0f0] text-[#9a5b5b]"
          }`}
        >
          {positive ? (
            <ArrowUpRight size={13} />
          ) : (
            <ArrowDownRight size={13} />
          )}

          {Math.abs(change)}%
        </div>
      </div>

      <div className="mt-5">
        <p className="text-xs text-[#817783]">
          {title}
        </p>

        <h3 className="mt-1 font-serif text-3xl font-semibold text-[#21152b]">
          {value}
        </h3>

        <p className="mt-2 text-[10px] text-[#a098a3]">
          {description}
        </p>
      </div>
    </div>
  );
}