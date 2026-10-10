import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="text-7xl mb-6">🧐</div>
        <h1 className="text-5xl font-bold text-slate-800 mb-3">৪০৪</h1>
        <h2 className="text-2xl font-bold text-slate-800 mb-3">
          পেজটি পাওয়া যায়নি
        </h2>
        <p className="text-slate-500 mb-8">
          দুঃখিত, আপনি যে পেজটি খুঁজছেন সেটি খুঁজে পাওয়া যাচ্ছে না। এটি মুছে
          ফেলা হয়েছে অথবা ভুল ঠিকানা দেওয়া হয়েছে।
        </p>
        <Link
          href="/"
          className="inline-block bg-green-600 hover:bg-green-700 text-white font-medium px-6 py-3 rounded-lg transition-colors"
        >
          হোম পেজে ফিরে যান
        </Link>
      </div>
    </div>
  );
}