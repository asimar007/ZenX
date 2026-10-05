import { el } from '@/utils/dom';
import { svg } from '@/utils/icons';

let statsDisplay: HTMLElement | null = null;

export function createStatsDisplay() {
  if (statsDisplay) return;

  const countSpan = document.createElement('span');
  countSpan.id = 'xfeed-filtered-count';
  countSpan.textContent = '0';

  const textSpan = el('span', 'xfeed-stats-text');
  textSpan.append(countSpan, ' filtered');

  const icon = el('span', 'xfeed-stats-icon');
  icon.innerHTML = svg('shieldCheck', 15);

  const contentDiv = el('div', 'xfeed-stats-content');
  contentDiv.append(icon, textSpan);

  statsDisplay = document.createElement('div');
  statsDisplay.id = 'xfeed-filter-stats';
  statsDisplay.append(contentDiv);
  document.body.appendChild(statsDisplay);
}

export function updateStatsDisplay(count: number) {
  const countEl = document.getElementById('xfeed-filtered-count');
  if (countEl) countEl.textContent = String(count);
}

export function removeStatsDisplay() {
  if (statsDisplay) {
    statsDisplay.remove();
    statsDisplay = null;
  }
}
