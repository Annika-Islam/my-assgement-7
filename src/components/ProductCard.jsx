"use client";

import Link from "next/link";
import { formatBn, translateUnit } from "@/lib/bn";

export default function ProductCard({ product }) {
  const dir = product.change?.dir || "flat";
  const pct = product.change?.pct || 0;

  const arrow = dir === "up" ? "▲" : dir === "down" ? "▼" : "—";

  const badgeStyle =
    dir === "up"
      ? "bg-red-50 text-red-600"
      : dir === "down"
      ? "bg-green-50 text-green-600"
      : "bg-slate-100 text-slate-500";

  return (
    <Link
      href={`/product/${product.slug}`}
      className="block bg-white rounded-xl border border-slate-200 p-4 hover:shadow-md hover:border-green-300 transition-all"
    >
      {/* Top: Emoji + Name + Unit */}
      <div className="flex items-start gap-3">
        <div className="text-3xl">{product.image}</div>
        <div className="flex-1 min-w-0">
          <div className="font-semibold text-slate-800 truncate">
            {product.nameBn}
          </div>
          <div className="text-xs text-slate-500 mt-0.5">
            {translateUnit(product.unit)}
          </div>
        </div>
      </div>

      {/* Bottom: Price + Change badge */}
      <div className="flex items-end justify-between mt-4">
        <div>
          <div className="text-xs text-slate-500">আজকের দাম</div>
          <div className="text-lg font-bold text-slate-800">
            {formatBn(product.today)} টাকা
          </div>
        </div>

        <span
          className={`text-xs font-medium px-2 py-1 rounded-md ${badgeStyle}`}
        >
          {arrow} {formatBn(Math.abs(pct).toFixed(1))}%
        </span>
      </div>
    </Link>
  );
}