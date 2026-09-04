"use client";

import {
  Edit3,
  MapPin,
  Trash2,
} from "lucide-react";

export interface AddressData {
  id: string;
  label: string;
  name: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  isDefault?: boolean;
}

interface AddressCardProps {
  address: AddressData;
  onEdit?: (address: AddressData) => void;
  onDelete?: (id: string) => void;
  onSetDefault?: (id: string) => void;
}

export default function AddressCard({
  address,
  onEdit,
  onDelete,
  onSetDefault,
}: AddressCardProps) {
  return (
    <div
      className={`rounded-2xl border bg-white p-5 transition ${
        address.isDefault
          ? "border-[#8d5c91]/40"
          : "border-black/[0.06]"
      }`}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#f3eaf4]">
            <MapPin
              size={18}
              strokeWidth={1.6}
              className="text-[#8d5c91]"
            />
          </div>

          <div>
            <h3 className="text-sm font-medium text-[#302536]">
              {address.label}
            </h3>

            {address.isDefault && (
              <span className="mt-1 inline-block text-[9px] font-medium uppercase tracking-[0.1em] text-[#8d5c91]">
                Default Address
              </span>
            )}
          </div>
        </div>

        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => onEdit?.(address)}
            aria-label="Edit address"
            className="flex h-9 w-9 items-center justify-center rounded-full text-[#817783] transition hover:bg-[#f5eff6] hover:text-[#8d5c91]"
          >
            <Edit3 size={16} strokeWidth={1.6} />
          </button>

          <button
            type="button"
            onClick={() => onDelete?.(address.id)}
            aria-label="Delete address"
            className="flex h-9 w-9 items-center justify-center rounded-full text-[#9a6666] transition hover:bg-[#fff3f3]"
          >
            <Trash2 size={16} strokeWidth={1.6} />
          </button>
        </div>
      </div>

      <div className="mt-5 border-t border-black/[0.06] pt-4 text-sm leading-6 text-[#716775]">
        <p className="font-medium text-[#302536]">
          {address.name}
        </p>

        <p>{address.phone}</p>

        <p className="mt-1">
          {address.address}
          <br />
          {address.city}, {address.state}{" "}
          {address.postalCode}
          <br />
          {address.country}
        </p>
      </div>

      {!address.isDefault && onSetDefault && (
        <button
          type="button"
          onClick={() => onSetDefault(address.id)}
          className="mt-5 rounded-xl border border-black/[0.08] px-4 py-2.5 text-[10px] font-medium uppercase tracking-[0.08em] text-[#302536] transition hover:border-[#8d5c91] hover:text-[#8d5c91]"
        >
          Set as Default
        </button>
      )}
    </div>
  );
}