"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

export default function ProfilePage() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  // Session না থাকলে signin এ redirect
  useEffect(() => {
    if (!isPending && !session) {
      toast.error("প্রোফাইল দেখতে সাইন ইন করুন");
      router.push("/signin");
    }
  }, [isPending, session, router]);

  const handleSignOut = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          toast.success("সাইন আউট সফল হয়েছে");
          router.push("/");
          router.refresh();
        },
        onError: (ctx) => {
          toast.error(ctx.error.message || "সাইন আউট ব্যর্থ");
        },
      },
    });
  };

  if (isPending) {
    return <ProfileSkeleton />;
  }

  if (!session) {
    return null;
  }

  const user = session.user;

  return (
    <div className="max-w-2xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-slate-800 mb-1">
          আমার প্রোফাইল
        </h1>
        <p className="text-sm text-slate-500">
          আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন
        </p>
      </div>

      {/* Profile card */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 mb-6">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center text-green-700 font-bold text-2xl">
            {user.name?.[0]?.toUpperCase() || "U"}
          </div>
          <div className="flex-1 min-w-0">
            <div className="font-semibold text-lg text-slate-800 truncate">
              {user.name}
            </div>
            <div className="text-sm text-slate-500 truncate">
              {user.email}
            </div>
          </div>
          <button
            onClick={handleSignOut}
            className="px-4 py-2 border border-red-200 text-red-600 hover:bg-red-50 rounded-lg text-sm font-medium transition-colors"
          >
            ↩ সাইন আউট
          </button>
        </div>

        {/* Update Button */}
        <div className="border-t border-slate-100 pt-6">
          <h2 className="font-semibold text-slate-800 mb-3">তথ্য</h2>
          <div className="space-y-3">
            <div>
              <label className="block text-xs text-slate-500 mb-1">নাম</label>
              <div className="px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-800">
                {user.name}
              </div>
            </div>
            <div>
              <label className="block text-xs text-slate-500 mb-1">
                ইমেইল
              </label>
              <div className="px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-500">
                {user.email}
              </div>
            </div>
          </div>

          <Link
            href="/profile/update"
            className="mt-5 inline-block w-full text-center bg-green-600 hover:bg-green-700 text-white font-medium py-2.5 rounded-lg transition-colors"
          >
            আপডেট করুন
          </Link>
        </div>
      </div>
    </div>
  );
}

function ProfileSkeleton() {
  return (
    <div className="max-w-2xl mx-auto">
      <div className="h-8 w-48 rounded skeleton mb-2" />
      <div className="h-4 w-64 rounded skeleton mb-6" />
      <div className="bg-white rounded-2xl border border-slate-200 p-6">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 rounded-full skeleton" />
          <div className="flex-1 space-y-2">
            <div className="h-5 w-40 rounded skeleton" />
            <div className="h-4 w-60 rounded skeleton" />
          </div>
        </div>
        <div className="border-t border-slate-100 pt-6 space-y-3">
          <div className="h-4 w-20 rounded skeleton" />
          <div className="h-10 w-full rounded skeleton" />
          <div className="h-4 w-20 rounded skeleton" />
          <div className="h-10 w-full rounded skeleton" />
          <div className="h-10 w-full rounded skeleton mt-5" />
        </div>
      </div>
    </div>
  );
}