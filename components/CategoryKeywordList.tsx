import { useState } from 'react';
import type { Settings } from '../utils/types';
import { Icon } from './Icon';

export function CategoryKeywordList({
  categoryName,
  settings,
  updateSettings
}: {
  categoryName: string;
  settings: Settings;
  updateSettings: (patch: Partial<Settings>) => void;
}) {
  const [isExpanded, setIsExpanded] = useState(false);

  const key = `${categoryName}Keywords` as keyof Settings;
  const keywords = (settings[key] as string[]) || [];

  if (!keywords || keywords.length === 0) return null;

  return (
    <div className="flex flex-col w-full">
      <button
        type="button"
        onClick={() => setIsExpanded(prev => !prev)}
        aria-expanded={isExpanded}
        className="inline-flex items-center gap-1 self-start text-xs text-forest-ink hover:underline underline-offset-2 cursor-pointer"
      >
        {isExpanded ? 'Hide keywords' : `View ${keywords.length} keywords`}
        <Icon name="chevronDown" className={`size-3.5 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`} />
      </button>

      {isExpanded && (
        <div className="flex flex-wrap gap-1.5 mt-2 max-h-36 overflow-y-auto">
          {keywords.map(keyword => (
            <span key={keyword} className="inline-flex items-center gap-0.5 rounded-full bg-cream-paper pl-2.5 pr-1 py-0.5 text-xs text-forest-ink">
              {keyword}
              <button
                type="button"
                onClick={() => updateSettings({ [key]: keywords.filter(k => k !== keyword) })}
                disabled={!settings.enabled}
                aria-label={`Remove ${keyword}`}
                className="flex items-center justify-center size-4 rounded-full text-forest-ink/70 hover:bg-mint-veil hover:text-forest-ink disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
              >
                <Icon name="x" className="size-3" strokeWidth={2} />
              </button>
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
