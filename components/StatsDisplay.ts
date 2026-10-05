import { el } from '@/utils/dom';

let statsDisplay: HTMLElement | null = null;

export function createStatsDisplay() {
  if (statsDisplay) return;

  const countSpan = document.createElement('span');
  countSpan.id = 'xfeed-filtered-count';
  countSpan.textContent = '0';

  const textSpan = el('span', 'xfeed-stats-text');
  textSpan.append(countSpan, ' filtered');

  const contentDiv = el('div', 'xfeed-stats-content');
  contentDiv.append(el('span', 'xfeed-stats-icon', '🛡️'), textSpan);

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
