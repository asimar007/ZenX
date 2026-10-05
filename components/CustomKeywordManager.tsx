import { useState } from 'react';
import type { Settings } from '../utils/types';
import { Icon } from './Icon';
import { CheckboxItem } from './CheckboxItem';
import { KeywordList } from './KeywordList';

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
    <CheckboxItem
      icon="penLine"
      label="Custom Keywords"
      meta={settings.customKeywords.length ? `${settings.customKeywords.length} keywords` : 'Your own words or phrases'}
    >
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
          className="flex-1 min-w-0 h-9 rounded-xl bg-cream-paper px-3 text-sm text-charcoal ring-1 ring-inset ring-sage-mist placeholder:text-charcoal/65 focus:outline-none focus:ring-2 focus:ring-forest-ink disabled:opacity-50 disabled:cursor-not-allowed transition-shadow"
          disabled={!settings.enabled}
        />
        <button
          type="button"
          onClick={addCustomKeyword}
          disabled={!settings.enabled || !customKeywordInput.trim()}
          className="inline-flex items-center gap-1 h-9 px-3 rounded-xl bg-forest-ink text-cream-paper text-sm hover:bg-forest-shadow disabled:opacity-40 disabled:cursor-not-allowed transition-colors duration-200 cursor-pointer"
        >
          <Icon name="plus" className="size-4" strokeWidth={2} />
          Add
        </button>
      </div>

      {settings.customKeywords.length > 0 && (
        <div className="mt-2.5">
          <KeywordList
            keywords={settings.customKeywords}
            onRemove={removeCustomKeyword}
            disabled={!settings.enabled}
          />
        </div>
      )}
    </CheckboxItem>
  );
}
