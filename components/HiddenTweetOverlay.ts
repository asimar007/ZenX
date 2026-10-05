import type { Match } from '@/utils/classifier';
import { el } from '@/utils/dom';
import { svg } from '@/utils/icons';
import { CATEGORIES } from '@/utils/types';

export function hideTweet(
  tweetElement: HTMLElement,
  match: Match,
  onShow: () => void
): void {
  const cellInner = tweetElement.closest<HTMLElement>('[data-testid="cellInnerDiv"]');
  const targetElement = cellInner || tweetElement;

  const category = CATEGORIES.find((c) => c.id === match.category);
  const label = category?.title ?? 'Custom';

  const icon = el('span', 'xfeed-hidden-icon');
  icon.innerHTML = svg(category?.icon ?? 'penLine', 16);

  const text = el('div', 'xfeed-hidden-text');
  text.append(
    el('p', 'xfeed-hidden-title', 'Tweet hidden by ZenX'),
    el('span', 'xfeed-hidden-tag', match.keyword ? `${label} · "${match.keyword}"` : label),
  );

  const content = el('div', 'xfeed-hidden-content');
  content.append(icon, text);

  const showBtn = el('button', 'xfeed-show-btn', 'Reveal');
  showBtn.setAttribute('type', 'button');

  const overlay = el('div', 'xfeed-hidden-tweet');
  overlay.append(content, showBtn);

  showBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    targetElement.classList.remove('xfeed-tweet-hidden');
    overlay.remove();
    onShow();
  });

  targetElement.classList.add('xfeed-tweet-hidden');
  targetElement.appendChild(overlay);
}
