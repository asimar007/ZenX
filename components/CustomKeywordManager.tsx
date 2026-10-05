import { useState } from 'react';
import type { Settings } from '../utils/types';
import { Icon } from './Icon';

export function CustomKeywordManager({
  settings,
  updateSettings
}: {
  settings: Settings;
  updateSettings: (patch: Partial<Settings>) => void;
}) {
  const [customKeywordInput, setCustomKeywordInput] = useState('');

  const addCustomKeyword = () => {
    const keyword = customKeywordInput.trim();
    if (!keyword) return;

    // Check if it already exists
    if (!settings.customKeywords.includes(keyword)) {
      updateSettings({ customKeywords: [...settings.customKeywords, keyword] });
    }
    setCustomKeywordInput('');
  };

  const removeCustomKeyword = (keywordToRemove: string) => {
    updateSettings({
      customKeywords: settings.customKeywords.filter(k => k !== keywordToRemove)
    });
  };

  return (
    <section className="flex flex-col gap-3">
      <div>
        <h2 className="text-[11px] font-semibold uppercase tracking-[0.08em] text-forest-ink">Custom keywords</h2>
        <p className="mt-1 text-xs text-charcoal/70">Hide tweets that mention your own words or phrases.</p>
      </div>
      <div className="flex gap-2">
        <input
          type="text"
          value={customKeywordInput}
          onChange={(e) => setCustomKeywordInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              addCustomKeyword();
            }
          }}
          placeholder="e.g. crypto, spoilers"
          aria-label="Keyword to block"
          className="flex-1 min-w-0 h-10 rounded-xl bg-cream-paper px-3.5 text-sm text-charcoal ring-1 ring-inset ring-sage-mist placeholder:text-charcoal/65 focus:outline-none focus:ring-2 focus:ring-forest-ink disabled:opacity-50 disabled:cursor-not-allowed transition-shadow"
          disabled={!settings.enabled}
        />
        <button
          type="button"
          onClick={addCustomKeyword}
          disabled={!settings.enabled || !customKeywordInput.trim()}
          className="inline-flex items-center gap-1.5 h-10 px-4 rounded-xl bg-forest-ink text-cream-paper text-sm hover:bg-forest-shadow disabled:opacity-40 disabled:cursor-not-allowed transition-colors duration-200 cursor-pointer"
        >
          <Icon name="plus" className="size-4" strokeWidth={2} />
          Add
        </button>
      </div>

      {settings.customKeywords.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {settings.customKeywords.map((keyword, index) => (
            <span
              key={index}
              className="inline-flex items-center gap-0.5 rounded-full bg-keylime-wash pl-3 pr-1 py-1 text-xs text-forest-ink"
            >
              {keyword}
              <button
                type="button"
                onClick={() => removeCustomKeyword(keyword)}
                disabled={!settings.enabled}
                aria-label={`Remove ${keyword}`}
                className="flex items-center justify-center size-5 rounded-full text-forest-ink/70 hover:bg-mint-veil hover:text-forest-ink disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
              >
                <Icon name="x" className="size-3" strokeWidth={2} />
              </button>
            </span>
          ))}
        </div>
      )}
    </section>
  );
}
