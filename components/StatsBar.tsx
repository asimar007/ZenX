import type { Stats } from '@/utils/types';
import { Icon } from './Icon';

export function StatsBar({ stats, onReset }: { stats: Stats; onReset: () => void }) {
  return (
    <div className="mx-4 mt-4 flex items-end justify-between rounded-xl bg-keylime-wash px-5 py-4">
      <div>
        <p className="font-serif font-light text-[44px] leading-none tracking-[-0.03em] text-forest-ink lining-nums tabular-nums">
          {stats.filtered.toLocaleString()}
        </p>
        <p className="mt-1.5 text-xs text-charcoal/70">
          tweets filtered · {stats.total.toLocaleString()} scanned
        </p>
      </div>
      <button
        type="button"
        className="flex items-center justify-center size-8 rounded-full bg-cream-paper text-forest-ink hover:bg-mint-veil transition-colors duration-200 cursor-pointer"
        onClick={onReset}
        title="Reset statistics"
        aria-label="Reset statistics"
      >
        <Icon name="rotateCcw" className="size-4" />
      </button>
    </div>
  );
}
