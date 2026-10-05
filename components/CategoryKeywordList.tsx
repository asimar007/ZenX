import { useState } from 'react';
import type { Settings } from '../utils/types';
import { Icon } from './Icon';
import { KeywordList } from './KeywordList';

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
        className="ml-11 inline-flex items-center gap-1 self-start text-xs text-forest-ink hover:underline underline-offset-2 cursor-pointer"
      >
        {isExpanded ? 'Hide keywords' : `View ${keywords.length} keywords`}
        <Icon name="chevronDown" className={`size-3.5 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`} />
      </button>

      {isExpanded && (
        <div className="mt-2.5">
          <KeywordList
            keywords={keywords}
            onRemove={(keyword) => updateSettings({ [key]: keywords.filter(k => k !== keyword) })}
            disabled={!settings.enabled}
          />
        </div>
      )}
    </div>
  );
}
