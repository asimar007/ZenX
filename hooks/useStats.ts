import { useState, useEffect } from 'react';
import { statsStorage } from '@/utils/storage';
import { DEFAULT_STATS } from '@/utils/types';
import type { Stats } from '@/utils/types';

export function useStats() {
  const [stats, setStats] = useState<Stats>({ ...DEFAULT_STATS });

  useEffect(() => {
    statsStorage.getValue().then(setStats);
    statsStorage.watch((s) => setStats(s));
  }, []);

  const resetStats = async () => {
    const fresh = { ...DEFAULT_STATS };
    await statsStorage.setValue(fresh);
    setStats(fresh);
  };

  return { stats, resetStats };
}
