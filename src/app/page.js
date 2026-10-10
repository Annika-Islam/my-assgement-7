import Hero from "@/components/Hero";
import ProductCard from "@/components/ProductCard";
import { SectionSkeleton } from "@/components/Skeleton";
import { Suspense } from "react";
import {
  getAllProducts,
  getTopRisers,
  getTopFallers,
} from "@/lib/api";
import { formatBn } from "@/lib/bn";

export default function HomePage() {
  return (
    <div>
      <Hero />

      {/* Section A — আজ দাম বেড়েছে */}
      <Suspense fallback={<SectionWrapper title="আজ দাম বেড়েছে ▲" skeleton />}>
        <RisersSection />
      </Suspense>

      {/* Section B — আজ দাম কমেছে */}
      <Suspense fallback={<SectionWrapper title="আজ দাম কমেছে ▼" skeleton />}>
        <FallersSection />
      </Suspense>

      {/* Section C — সব পণ্য */}
      <Suspense fallback={<SectionWrapper title="সব পণ্য" skeleton />}>
        <AllProductsSection />
      </Suspense>
    </div>
  );
}

// =====================
// Section A — Risers
// =====================
async function RisersSection() {
  const products = await getTopRisers(6);

  return (
    <SectionWrapper
      title="আজ দাম বেড়েছে ▲"
      subtitle="সর্বোচ্চ দাম বৃদ্ধি পাওয়া পণ্যগুলো"
    >
      {products.length === 0 ? (
        <EmptyState message="এই মুহূর্তে কোনো পণ্যের দাম বাড়েনি।" />
      ) : (
        <ProductGrid products={products} />
      )}
    </SectionWrapper>
  );
}

// =====================
// Section B — Fallers
// =====================
async function FallersSection() {
  const products = await getTopFallers(6);

  return (
    <SectionWrapper
      title="আজ দাম কমেছে ▼"
      subtitle="সর্বোচ্চ দাম কমা পণ্যগুলো"
    >
      {products.length === 0 ? (
        <EmptyState message="এই মুহূর্তে কোনো পণ্যের দাম কমেনি।" />
      ) : (
        <ProductGrid products={products} />
      )}
    </SectionWrapper>
  );
}

// =====================
// Section C — All products
// =====================
async function AllProductsSection() {
  const products = await getAllProducts();

  return (
    <SectionWrapper
      id="all-products"
      title="সব পণ্য"
      subtitle={`মোট ${formatBn(products.length)}টি পণ্য দেখানো হচ্ছে`}
    >
      {products.length === 0 ? (
        <EmptyState message="এখন কোনো পণ্যের তথ্য পাওয়া যাচ্ছে না।" />
      ) : (
        <ProductGrid products={products} />
      )}
    </SectionWrapper>
  );
}

// =====================
// Reusable UI parts
// =====================
function SectionWrapper({ title, subtitle, children, id, skeleton }) {
  return (
    <section id={id} className="mb-12 scroll-mt-32">
      <div className="mb-5">
        <h2 className="text-xl md:text-2xl font-bold text-slate-800">
          {title}
        </h2>
        {subtitle && (
          <p className="text-sm text-slate-500 mt-1">{subtitle}</p>
        )}
      </div>
      {skeleton ? <SectionSkeleton /> : children}
    </section>
  );
}

function ProductGrid({ products }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {products.map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  );
}

function EmptyState({ message }) {
  return (
    <div className="bg-white border border-dashed border-slate-300 rounded-xl p-8 text-center text-slate-500">
      <div className="text-4xl mb-2">📭</div>
      <p>{message}</p>
    </div>
  );
}