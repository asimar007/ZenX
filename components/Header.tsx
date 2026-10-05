import { Switch } from './Switch';

export function Header({ enabled, onToggle }: { enabled: boolean; onToggle: (v: boolean) => void }) {
  return (
    <header className="sticky top-0 z-10 flex items-center justify-between px-5 py-3.5 bg-cream-paper border-b border-border-mist">
      <img src="/logo.png" alt="ZenX" className="h-6 w-auto mix-blend-multiply" />
      <label className="flex items-center gap-2.5 cursor-pointer">
        <span className={`text-xs ${enabled ? 'text-forest-ink' : 'text-charcoal/70'}`}>
          {enabled ? 'Active' : 'Paused'}
        </span>
        <Switch checked={enabled} onChange={onToggle} label="Enable ZenX" />
      </label>
    </header>
  );
}
