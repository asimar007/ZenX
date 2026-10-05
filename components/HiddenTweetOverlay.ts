import type { Match } from '@/utils/classifier';
import { el } from '@/utils/dom';

export function hideTweet(
  tweetElement: HTMLElement,
  match: Match,
  onShow: () => void
): void {
  const cellInner = tweetElement.closest<HTMLElement>('[data-testid="cellInnerDiv"]');
  const targetElement = cellInner || tweetElement;

  const categoryStrong = document.createElement('strong');
  categoryStrong.textContent = match.category;

  const textSpan = el('span', 'xfeed-hidden-text');
  textSpan.append('Hidden: ', categoryStrong);
  if (match.keyword) {
    textSpan.append(el('span', 'xfeed-hidden-keyword', ` (${match.keyword})`));
  }

  const showBtn = el('button', 'xfeed-show-btn', 'Show');
  const contentWrapper = el('div', 'xfeed-hidden-content');
  contentWrapper.append(el('span', 'xfeed-hidden-icon', '🛡️'), textSpan, showBtn);

  const overlay = el('div', 'xfeed-hidden-tweet');
  overlay.append(contentWrapper);

  showBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    targetElement.classList.remove('xfeed-tweet-hidden');
    overlay.remove();
    onShow();
  });

  targetElement.classList.add('xfeed-tweet-hidden');
  targetElement.appendChild(overlay);
}
