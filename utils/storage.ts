import { storage } from 'wxt/utils/storage';
import { DEFAULT_SETTINGS, DEFAULT_STATS } from './types';
import type { Settings, Stats } from './types';

export const settingsStorage = storage.defineItem<Settings>('sync:settings', { fallback: DEFAULT_SETTINGS });
export const statsStorage = storage.defineItem<Stats>('local:stats', { fallback: DEFAULT_STATS });
