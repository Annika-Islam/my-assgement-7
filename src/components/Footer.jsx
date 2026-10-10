export default function Footer() {
  return (
    <footer className="bg-slate-100 border-t border-slate-200 mt-10">
      <div className="max-w-6xl mx-auto px-4 py-6 flex flex-col md:flex-row items-center justify-between gap-3 text-sm text-slate-600">
        <div className="text-center md:text-left">
          <span className="font-semibold text-slate-800">বাজার দর</span> — প্রয়োজনীয়
          পণ্যের দাম এক নজরে।
        </div>
        <div className="text-center md:text-right text-slate-500">
          সকল দাম সম্ভাব্য; বাজার অবস্থার ওপর নির্ভর করে পরিবর্তিত হয়।
        </div>
      </div>
    </footer>
  );
}