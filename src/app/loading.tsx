export default function Loading() {
  return (
    <div className="grid min-h-screen place-items-center bg-black">
      <div className="text-center">
        <div className="mx-auto h-px w-56 overflow-hidden bg-white/10">
          <div className="h-full w-1/2 animate-shimmer bg-gold-gradient" />
        </div>
        <p className="mt-5 text-xs uppercase tracking-[0.35em] text-champagne">Loading ONLY COLLECTION</p>
      </div>
    </div>
  );
}
