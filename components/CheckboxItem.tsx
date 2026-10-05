import { ReactNode } from 'react';
import type { IconName } from '@/utils/icons';
import { Icon } from './Icon';
import { Switch } from './Switch';

export function CheckboxItem({
  label,
  meta,
  icon,
  checked = true,
  onChange,
  children,
}: {
  label: string;
  meta?: string;
  icon: IconName;
  checked?: boolean;
  /** Omit for an always-on card with no switch. */
  onChange?: (v: boolean) => void;
  children?: ReactNode;
}) {
  const Header = onChange ? 'label' : 'div';

  return (
    <div
      className={`rounded-xl px-3.5 py-3 transition-colors duration-200 ${
        checked ? 'bg-keylime-wash' : 'bg-cream-paper ring-1 ring-inset ring-border-mist hover:bg-keylime-wash/40'
      }`}
    >
      <Header className={`flex items-center gap-3 ${onChange ? 'cursor-pointer' : ''}`}>
        <span
          className={`flex items-center justify-center size-8 rounded-full transition-colors duration-200 ${
            checked ? 'bg-mint-veil text-forest-ink' : 'bg-border-mist text-charcoal/70'
          }`}
        >
          <Icon name={icon} className="size-4" />
        </span>
        <span className="flex-1 min-w-0">
          <span className={`block text-sm ${checked ? 'text-forest-ink' : 'text-charcoal'}`}>{label}</span>
          {meta && <span className="block text-xs text-charcoal/70">{meta}</span>}
        </span>
        {onChange && <Switch checked={checked} onChange={onChange} />}
      </Header>
      {children && <div className="mt-3">{children}</div>}
    </div>
  );
}
