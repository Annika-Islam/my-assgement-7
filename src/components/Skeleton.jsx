export function CardSkeleton() {
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-4">
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 rounded-full skeleton" />
        <div className="flex-1 space-y-2">
          <div className="h-4 w-2/3 rounded skeleton" />
          <div className="h-3 w-1/3 rounded skeleton" />
        </div>
      </div>
      <div className="mt-4 space-y-2">
        <div className="h-3 w-1/4 rounded skeleton" />
        <div className="h-5 w-1/3 rounded skeleton" />
      </div>
    </div>
  );
}

export function SectionSkeleton({ count = 6 }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {Array.from({ length: count }).map((_, i) => (
        <CardSkeleton key={i} />
      ))}
    </div>
  );
}

export function HeroSkeleton() {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-8 grid md:grid-cols-2 gap-6 items-center">
      <div className="space-y-4">
        <div className="h-6 w-40 rounded-full skeleton" />
        <div className="h-10 w-3/4 rounded skeleton" />
        <div className="h-4 w-full rounded skeleton" />
        <div className="h-4 w-2/3 rounded skeleton" />
        <div className="h-10 w-40 rounded skeleton" />
      </div>
      <div className="h-52 rounded-xl skeleton" />
    </div>
  );
}