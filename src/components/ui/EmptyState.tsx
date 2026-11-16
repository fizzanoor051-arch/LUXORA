import { PackageOpen } from "lucide-react";
import { ReactNode } from "react";

interface EmptyStateProps {
  title?: string;
  description?: string;
  icon?: ReactNode;
  action?: ReactNode;
}

export default function EmptyState({
  title = "Nothing here yet",
  description = "There is no data to display at the moment.",
  icon,
  action,
}: EmptyStateProps) {
  return (
    <div className="flex min-h-[300px] flex-col items-center justify-center rounded-2xl border border-gray-200 bg-white px-6 py-12 text-center">
      <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-purple-50 text-purple-700">
        {icon || <PackageOpen className="h-8 w-8" />}
      </div>

      <h3 className="text-xl font-semibold text-gray-900">
        {title}
      </h3>

      <p className="mt-2 max-w-md text-sm leading-6 text-gray-500">
        {description}
      </p>

      {action && <div className="mt-6">{action}</div>}
    </div>
  );
}