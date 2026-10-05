// Visual switch; wrap it in a <label> so the label text toggles it too.
export function Switch({ checked, onChange, label }: { checked: boolean; onChange: (v: boolean) => void; label?: string }) {
  return (
    <span className="relative inline-flex shrink-0">
      <input
        type="checkbox"
        role="switch"
        aria-label={label}
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="peer sr-only"
      />
      <span
        aria-hidden="true"
        className="h-5 w-9 rounded-full bg-charcoal/25 transition-colors duration-200 peer-checked:bg-forest-ink peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-forest-ink after:absolute after:top-0.5 after:left-0.5 after:size-4 after:rounded-full after:bg-cream-paper after:transition-transform after:duration-200 after:ease-out peer-checked:after:translate-x-4"
      />
    </span>
  );
}
