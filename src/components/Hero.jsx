import Link from "next/link";
import Image from "next/image";
import { todayBn } from "@/lib/bn";

export default function Hero() {
  return (
    <section className="bg-white rounded-2xl border border-slate-200 p-6 md:p-10 grid md:grid-cols-2 gap-8 items-center mb-10">
      {/* Left: Text */}
      <div>
        <div className="inline-block bg-green-50 text-green-700 text-sm font-medium px-3 py-1 rounded-full mb-4">
          {todayBn()}
        </div>

        <h1 className="text-3xl md:text-4xl font-bold text-slate-800 leading-tight mb-4">
          আজকের বাজারের দাম এক নজরে
        </h1>

        <p className="text-slate-600 mb-6 leading-relaxed">
          চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাংলাদেশের বিভিন্ন
          বাজারভিত্তিক বিস্তারিত, গড়, সর্বনিম্ন-সর্বোচ্চ এবং দামের পরিবর্তন এক
          জায়গায়।
        </p>

        <Link
          href="#all-products"
          className="inline-block bg-green-600 hover:bg-green-700 text-white font-medium px-6 py-3 rounded-lg transition-colors"
        >
          সব পণ্য দেখুন
        </Link>
      </div>

      {/* Right: Banner Image */}
      <div className="flex justify-center items-center">
        <Image
          src="/bazar-hero.png"
          alt="বাজারের ঝুড়ি"
          width={360}
          height={360}
          className="w-full max-w-[280px] md:max-w-[360px] h-auto object-contain"
          priority
        />
      </div>
    </section>
  );
}