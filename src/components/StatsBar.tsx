export function StatsBar() {
  return (
    <div className="w-full border-y border-gray-200 bg-white/50 backdrop-blur-sm py-10 relative z-10">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-around items-center gap-8 md:gap-4 divide-y md:divide-y-0 md:divide-x divide-gray-200">
        <div className="flex flex-col items-center px-8 text-center pt-4 md:pt-0 w-full md:w-1/3">
          <span className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 mb-2">100%</span>
          <span className="text-sm font-medium text-gray-500 uppercase tracking-widest">Local & Private</span>
        </div>
        <div className="flex flex-col items-center px-8 text-center pt-8 md:pt-0 w-full md:w-1/3">
          <span className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 mb-2">216k+</span>
          <span className="text-sm font-medium text-gray-500 uppercase tracking-widest">Threat Database</span>
        </div>
        <div className="flex flex-col items-center px-8 text-center pt-8 md:pt-0 w-full md:w-1/3">
          <span className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 mb-2">&lt;1ms</span>
          <span className="text-sm font-medium text-gray-500 uppercase tracking-widest">Scan Latency</span>
        </div>
      </div>
    </div>
  );
}
