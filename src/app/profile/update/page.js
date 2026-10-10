"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

export default function UpdateProfilePage() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  // Session থেকে current name load
  useEffect(() => {
    if (!isPending && !session) {
      toast.error("প্রোফাইল আপডেট করতে সাইন ইন করুন");
      router.push("/signin");
      return;
    }
    if (session?.user?.name) {
      setName(session.user.name);
    }
  }, [isPending, session, router]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim()) {
      toast.error("নাম খালি রাখা যাবে না");
      return;
    }

    if (name.trim() === session?.user?.name) {
      toast.error("আপনি আগের নামটাই দিয়েছেন");
      return;
    }

    setLoading(true);

    try {
      await authClient.updateUser(
        { name: name.trim() },
        {
          onSuccess: () => {
            toast.success("নাম সফলভাবে আপডেট হয়েছে");
            router.push("/profile");
            router.refresh();
          },
          onError: (ctx) => {
            toast.error(ctx.error.message || "আপডেট ব্যর্থ হয়েছে");
            setLoading(false);
          },
        }
      );
    } catch (err) {
      console.error(err);
      toast.error("আপডেটে সমস্যা হয়েছে");
      setLoading(false);
    }
  };

  if (isPending || !session) {
    return <UpdateSkeleton />;
  }

  const user = session.user;

  return (
    <div className="max-w-2xl mx-auto">
      {/* Breadcrumb */}
      <nav className="text-sm text-slate-500 mb-4 flex items-center gap-2">
        <Link href="/profile" className="hover:text-green-600">
          আমার প্রোফাইল
        </Link>
        <span>›</span>
        <span className="text-slate-700">আপডেট</span>
      </nav>

      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-slate-800 mb-1">
          তথ্য আপডেট করুন
        </h1>
        <p className="text-sm text-slate-500">
          আপনার নাম পরিবর্তন করুন
        </p>
      </div>

      {/* Form card */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6">
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Name input */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">
              নাম
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="আপনার পূর্ণ নাম"
              className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              required
            />
          </div>

          {/* Email (readonly) */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">
              ইমেইল
            </label>
            <input
              type="email"
              value={user.email || ""}
              disabled
              className="w-full px-4 py-2.5 border border-slate-200 rounded-lg bg-slate-50 text-slate-500 cursor-not-allowed"
            />
            <p className="text-xs text-slate-400 mt-1.5">
              ইমেইল পরিবর্তন করা যাবে না
            </p>
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-green-600 hover:bg-green-700 disabled:bg-slate-300 text-white font-medium py-2.5 rounded-lg transition-colors"
            >
              {loading ? "আপডেট হচ্ছে..." : "আপডেট করুন"}
            </button>
            <Link
              href="/profile"
              className="flex-1 text-center bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 font-medium py-2.5 rounded-lg transition-colors"
            >
              বাতিল করুন
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

function UpdateSkeleton() {
  return (
    <div className="max-w-2xl mx-auto">
      <div className="h-4 w-40 rounded skeleton mb-4" />
      <div className="h-8 w-56 rounded skeleton mb-2" />
      <div className="h-4 w-64 rounded skeleton mb-6" />
      <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-5">
        <div className="space-y-2">
          <div className="h-4 w-20 rounded skeleton" />
          <div className="h-11 w-full rounded skeleton" />
        </div>
        <div className="space-y-2">
          <div className="h-4 w-20 rounded skeleton" />
          <div className="h-11 w-full rounded skeleton" />
        </div>
        <div className="flex gap-3 pt-2">
          <div className="h-11 flex-1 rounded skeleton" />
          <div className="h-11 flex-1 rounded skeleton" />
        </div>
      </div>
    </div>
  );
}