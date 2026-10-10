"use client";

import { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import ProductCard from "@/components/ProductCard";
import { SectionSkeleton } from "@/components/Skeleton";
import {
  getAllCategories,
  getAllProducts,
  getProductsByCategory,
} from "@/lib/api";
import { formatBn } from "@/lib/bn";

export default function CategoryPage() {
  const params = useParams();
  const slug = params.slug;

  const [category, setCategory] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState("default");
  const [notFoundState, setNotFoundState] = useState(false);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    setNotFoundState(false);

    async function loadData() {
      try {
        // Categories load
        const cats = await getAllCategories();
        if (!isMounted) return;

        const foundCat = cats.find((c) => c.slug === slug);
        if (!foundCat) {
          setNotFoundState(true);
          setLoading(false);
          return;
        }

        // Products for this category
        let prods = await getProductsByCategory(slug);

        // Fallback: if API category filter fails, filter from all products
        if (!prods || prods.length === 0) {
          const all = await getAllProducts();
          prods = all.filter((p) => p.category === slug);
        }

        if (!isMounted) return;

        setCategory(foundCat);
        setProducts(prods || []);
        setLoading(false);
      } catch (err) {
        console.error("Category load error:", err);
        if (isMounted) {
          setNotFoundState(true);
          setLoading(false);
        }
      }
    }

    loadData();
    return () => {
      isMounted = false;
    };
  }, [slug]);

  const sortedProducts = useMemo(() => {
    const list = [...products];
    if (sortBy === "low-to-high") {
      list.sort((a, b) => Number(a.today) - Number(b.today));
    } else if (sortBy === "high-to-low") {
      list.sort((a, b) => Number(b.today) - Number(a.today));
    }
    return list;
  }, [products, sortBy]);

  if (loading) return <CategorySkeleton />;
  if (notFoundState || !category) return <EmptyCategoryState />;

  return (
    <div>
      {/* Breadcrumb */}
      <nav className="text-sm text-slate-500 mb-4 flex items-center gap-2 flex-wrap">
        <Link href="/" className="hover:text-green-600">
          হোম
        </Link>
        <span>›</span>
        <span className="text-slate-700">{category.nameBn}</span>
      </nav>

      {/* Category header */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 mb-6 flex items-center gap-4">
        <div className="w-14 h-14 bg-green-50 rounded-xl flex items-center justify-center text-3xl">
          {category.icon}
        </div>
        <div className="flex-1">
          <h1 className="text-2xl md:text-3xl font-bold text-slate-800">
            {category.nameBn}
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            হাটি পণ্যের আজকের দাম ও পরিবর্তন
          </p>
        </div>
      </div>

      {/* Sort + Count */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <p className="text-sm text-slate-600">
          মোট{" "}
          <span className="font-semibold text-slate-800">
            {formatBn(sortedProducts.length)}
          </span>{" "}
          টি পণ্য দেখানো হচ্ছে
        </p>

        <div className="flex items-center gap-2">
          <label className="text-sm text-slate-600 whitespace-nowrap">
            সাজান:
          </label>
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="appearance-none bg-white border border-slate-300 rounded-lg pl-3 pr-9 py-2 text-sm text-slate-700 cursor-pointer focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option value="default">ডিফল্ট</option>
              <option value="low-to-high">দাম: কম থেকে বেশি</option>
              <option value="high-to-low">দাম: বেশি থেকে কম</option>
            </select>
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none text-xs">
              ▾
            </span>
          </div>
        </div>
      </div>

      {/* Products grid */}
      {sortedProducts.length === 0 ? (
        <EmptyCategoryState />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {sortedProducts.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}

function EmptyCategoryState() {
  return (
    <div className="bg-white border border-dashed border-slate-300 rounded-xl p-12 text-center">
      <div className="text-6xl mb-4">🔍</div>
      <h2 className="text-xl font-bold text-slate-800 mb-2">
        এই ক্যাটাগরিতে কোনো পণ্য নেই
      </h2>
      <p className="text-slate-500 mb-6">
        দুঃখিত, এই ক্যাটাগরিতে এখন কোনো পণ্যের তথ্য পাওয়া যাচ্ছে না।
      </p>
      <Link
        href="/"
        className="inline-block bg-green-600 hover:bg-green-700 text-white font-medium px-6 py-3 rounded-lg transition-colors"
      >
        হোম পেজে ফিরে যান
      </Link>
    </div>
  );
}

function CategorySkeleton() {
  return (
    <div>
      <div className="h-4 w-40 rounded skeleton mb-4" />
      <div className="bg-white rounded-2xl border border-slate-200 p-6 mb-6 flex items-center gap-4">
        <div className="w-14 h-14 rounded-xl skeleton" />
        <div className="flex-1 space-y-2">
          <div className="h-6 w-40 rounded skeleton" />
          <div className="h-4 w-32 rounded skeleton" />
        </div>
      </div>
      <div className="bg-white rounded-2xl border border-slate-200 p-4 mb-6 flex justify-between">
        <div className="h-5 w-40 rounded skeleton" />
        <div className="h-9 w-48 rounded skeleton" />
      </div>
      <SectionSkeleton count={6} />
    </div>
  );
}