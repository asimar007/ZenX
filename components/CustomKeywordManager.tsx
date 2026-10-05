import { useState } from 'react';
import type { Settings } from '../utils/types';

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
      <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Custom Keywords</h2>
      <div className="flex flex-col gap-2">
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
            placeholder="Add keyword to block"
            className="flex-1 bg-slate-800 border border-slate-700 rounded-lg p-2 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
            disabled={!settings.enabled}
          />
          <button 
            onClick={addCustomKeyword}
            disabled={!settings.enabled}
            className="px-4 py-2 bg-slate-700 hover:bg-slate-600 disabled:opacity-50 disabled:cursor-not-allowed text-slate-200 text-sm font-medium rounded-lg transition-colors cursor-pointer"
            title="Add Keyword"
          >
            Add
          </button>
        </div>
        
        {settings.customKeywords.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-1">
            {settings.customKeywords.map((keyword, index) => (
              <div 
                key={index}
                className="flex items-center gap-1.5 bg-slate-800 border border-slate-700 rounded-full pl-3 pr-1 py-1 text-xs text-slate-300"
              >
                <span>{keyword}</span>
                <button 
                  onClick={() => removeCustomKeyword(keyword)}
                  disabled={!settings.enabled}
                  className="text-slate-500 hover:text-red-400 disabled:opacity-50 disabled:hover:text-slate-500 transition-colors p-1 rounded-full hover:bg-slate-700/50 cursor-pointer"
                  title="Remove keyword"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
