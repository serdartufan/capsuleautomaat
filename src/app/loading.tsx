export default function Loading() {
  return (
    <div className="min-h-screen bg-[#080808] flex flex-col items-center justify-center gap-4">
      <div className="h-8 w-8 rounded-full border-2 border-white/10 border-t-[#16A34A] animate-spin" />
      <p className="text-[12px] text-[#525252] uppercase tracking-[0.18em]">
        Assortiment laden…
      </p>
    </div>
  );
}
