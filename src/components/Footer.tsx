import { GithubIcon } from "@/components/icons/GithubIcon";

export function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 py-12 relative z-10">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex items-center gap-2">
          <span className="font-bold text-xl tracking-tight text-gray-900">Agentinel</span>
        </div>
        
        <div className="text-sm text-gray-500 font-medium">
          Built by Aman Janwani. Licensed under MIT.
        </div>

        <div className="flex items-center gap-4">
          <a href="https://github.com/aman-janwani/agentinel" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-black transition p-2 hover:bg-gray-100 rounded-full">
            <GithubIcon className="w-6 h-6" />
          </a>
        </div>
      </div>
    </footer>
  );
}
