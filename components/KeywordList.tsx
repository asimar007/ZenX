import { Icon } from './Icon';

export function KeywordList({
  keywords,
  onRemove,
  disabled,
}: {
  keywords: string[];
  onRemove: (keyword: string) => void;
  disabled?: boolean;
}) {
  return (
    <ul className="flex flex-wrap gap-1.5 rounded-xl bg-cream-paper p-2.5 max-h-44 overflow-y-auto">
      {/* Display-only sort: shortest first. Stored order stays, the classifier reports the first match by it. */}
      {[...keywords].sort((a, b) => a.length - b.length || a.localeCompare(b)).map((keyword) => (
        <li
          key={keyword}
          className="group inline-flex items-center h-7 max-w-full rounded-full bg-keylime-wash pl-3 pr-1 text-xs text-forest-ink transition-colors duration-150 hover:bg-mint-veil"
        >
          <span className="truncate">{keyword}</span>
          <button
            type="button"
            onClick={() => onRemove(keyword)}
            disabled={disabled}
            aria-label={`Remove ${keyword}`}
            title={`Remove ${keyword}`}
            className="ml-1 flex shrink-0 items-center justify-center size-5 rounded-full text-forest-ink/45 group-hover:text-forest-ink hover:bg-sage-mist focus-visible:text-forest-ink disabled:opacity-40 disabled:cursor-not-allowed transition-colors duration-150 cursor-pointer"
          >
            <Icon name="x" className="size-3" strokeWidth={2.25} />
          </button>
        </li>
      ))}
    </ul>
  );
}
