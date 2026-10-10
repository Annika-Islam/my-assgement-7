import { Suspense } from "react";
import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import { SectionSkeleton } from "@/components/Skeleton";
import { getAllCategories, getAllProducts } from "@/lib/api";
import { formatBn } from "@/lib/bn";

export default async function CategoryPage({ params }) {
  const { slug } = await params;

  return (
    <Suspense fallback={<CategorySkeleton />}>
      <CategoryContent slug={slug} />
    </Suspense>
  );
}

async function CategoryContent({ slug }) {
  const categories = await getAllCategories();
  const category = categories.find((c) => c.slug === slug);

  if (!category) {
    return <EmptyCategoryState />;
  }

  const allProducts = await getAllProducts();
  const products = allProducts.filter((p) => p.category === slug);

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
          <p className="text-sm text-slate-500 mt-1">আজকের দাম ও পরিবর্তন</p>
        </div>
      </div>

      {/* Count */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 mb-6">
        <p className="text-sm text-slate-600">
          মোট{" "}
          <span className="font-semibold text-slate-800">
            {formatBn(products.length)}
          </span>{" "}
          টি পণ্য দেখানো হচ্ছে
        </p>
      </div>

      {/* Products grid or empty state */}
      {products.length === 0 ? (
        <EmptyCategoryState />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {products.map((p) => (
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
      <SectionSkeleton count={6} />
    </div>
  );
}