export default function ProductLoading() {
  return (
    <div className="min-h-screen bg-[#080808]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <div className="h-4 w-40 rounded bg-white/[0.04] mb-8 animate-pulse" />
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          <div className="aspect-square rounded-2xl bg-white/[0.04] animate-pulse" />
          <div className="flex flex-col gap-4">
            <div className="h-3 w-28 rounded bg-white/[0.04] animate-pulse" />
            <div className="h-8 w-4/5 rounded bg-white/[0.04] animate-pulse" />
            <div className="h-8 w-32 rounded bg-white/[0.04] animate-pulse" />
            <div className="h-4 w-40 rounded bg-white/[0.04] animate-pulse" />
            <div className="h-20 w-full rounded bg-white/[0.04] animate-pulse mt-2" />
            <div className="h-12 w-48 rounded bg-white/[0.04] animate-pulse mt-2" />
          </div>
        </div>
      </div>
    </div>
  );
}
