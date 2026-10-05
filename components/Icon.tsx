import { ICONS, type IconName } from '@/utils/icons';

export function Icon({ name, className = 'size-4', strokeWidth = 1.75 }: { name: IconName; className?: string; strokeWidth?: number }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={`shrink-0 ${className}`}
      dangerouslySetInnerHTML={{ __html: ICONS[name] }}
    />
  );
}
