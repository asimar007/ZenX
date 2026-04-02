export function Header({ enabled, onToggle }: { enabled: boolean; onToggle: (v: boolean) => void }) {
  return (
    <header className="flex justify-between items-center px-5 py-4 bg-linear-to-br from-blue-500 to-blue-600 sticky top-0 z-10 shadow-md">
      <div className="flex items-center gap-2.5">
        <img src="/icon/icon.png" alt="Tweet Filter" className="w-7 h-7 drop-shadow-sm" />
        <h1 className="text-lg font-bold text-white tracking-wide">X Feed Filter</h1>
      </div>
      <label className="relative inline-flex items-center cursor-pointer">
        <input 
          type="checkbox" 
          className="sr-only peer" 
          checked={enabled} 
          onChange={(e) => onToggle(e.target.checked)} 
        />
        <div className="w-11 h-6 bg-blue-900/40 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-white/30 backdrop-blur-sm"></div>
      </label>
    </header>
  );
}
