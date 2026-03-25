// ============================================
// Settings
// ============================================

export interface Settings {
  enabled: boolean;
  blockPolitics: boolean;
  blockRacism: boolean;
  blockReligion: boolean;
  blockWar: boolean;
  blockControversial: boolean;
  showFilteredCount: boolean;
  customKeywords: string[];
  politicsKeywords: string[];
  racismKeywords: string[];
  religionKeywords: string[];
  warKeywords: string[];
  controversialKeywords: string[];
}

export const DEFAULT_SETTINGS: Settings = {
  enabled: true,
  blockPolitics: true,
  blockRacism: true,
  blockReligion: true,
  blockWar: true,
  blockControversial: true,
  showFilteredCount: true,
  customKeywords: [],
  politicsKeywords: [
    "trump", "biden", "democrat", "republican", "gop", "maga", "liberal", 
    "conservative", "election", "voted", "voting", "ballot", "congress", 
    "senate", "politician", "left wing", "right wing", "leftist", "rightist", 
    "socialism", "fascism", "antifa", "proud boys", "woke", "anti-woke", 
    "red state", "blue state", "impeach", "insurrection", "capitol riot", 
    "stolen election", "deep state", "kamala", "desantis", "aoc", "pelosi", 
    "mcconnell", "potus", "flotus", "modi", "bjp", "congress", "rahul gandhi"
  ],
  racismKeywords: [
    "racist", "racism", "white supremac", "nazi", "kkk", "bigot", "xenophob", 
    "hate crime", "ethnic cleansing", "racial slur", "supremacist"
  ],
  religionKeywords: [
    "atheist", "christian nation", "sharia", "infidel", "heathen", "blasphemy", 
    "god says", "bible says", "quran says", "religious freedom", "pray for", 
    "sin of", "sinful", "godless", "evangelical", "jihad", "crusade"
  ],
  warKeywords: [
    "war", "iran", "iranian", "tehran", "khamenei", "irgc", "islamic republic", 
    "persian gulf", "iranian regime", "nuclear deal", "jcpoa", "enriched uranium", 
    "nuclear program", "iranian missile", "iranian drone", "ayatollah", 
    "revolutionary guard", "strait of hormuz", "sanctions on iran", "iran nuclear", 
    "iran attack", "israel", "israeli", "netanyahu", "idf", "mossad", "tel aviv", 
    "jerusalem", "gaza", "gaza strip", "west bank", "hamas", "hezbollah", "plo", 
    "fatah", "palestin", "intifada", "settler", "occupation", "iron dome", 
    "zionist", "anti-zionist", "two-state", "ceasefire", "hostage deal", "rafah", 
    "october 7", "al-aqsa", "temple mount", "ethnic cleansing gaza", "us strike", 
    "us airstrike", "american airstrike", "pentagon strike", "carrier strike group", 
    "fifth fleet", "centcom", "us troops middle east", "regime change", 
    "axis of resistance", "houthi", "houthis", "red sea attack", "drone strike iran", 
    "ballistic missile attack", "hypersonic missile", "middle east war", 
    "regional war", "world war 3", "ww3", "escalation", "proxy war", 
    "retaliation strike", "retaliatory attack", "war in middle east"
  ],
  controversialKeywords: [
    "abortion", "pro-life", "pro-choice", "gun control", "second amendment", 
    "2a", "trans rights", "lgbtq agenda", "groomer", "woke mob", "cancel culture", 
    "critical race theory", "crt", "dei", "affirmative action", "reparations", 
    "border crisis", "illegal alien", "open borders", "defund police", 
    "vaccine mandate", "anti-vax", "plandemic", "my body my choice"
  ]
};

// ============================================
// Classification
// ============================================

export interface ClassificationResult {
  action: 'show' | 'hide';
  category: string | null;
  confidence: number;
  reason?: string;
  method?: 'keyword';
  matchedKeyword?: string;
}

export interface InstantResult {
  decision: 'show' | 'hide';
  confidence?: number;
  category?: string;
  blockScore?: number;
  blockCategory?: string | null;
  method: 'keyword';
  matchedKeyword?: string;
}

// ============================================
// Stats
// ============================================

export interface Stats {
  filtered: number;
  allowed: number;
  total: number;
}

export const DEFAULT_STATS: Stats = {
  filtered: 0,
  allowed: 0,
  total: 0,
};

// ============================================
// Messages (background ↔ content script)
// ============================================

export type Message =
  | { action: 'getStats' }
  | { action: 'updateStats'; filtered: boolean }
  | { action: 'resetStats' };

export type MessageResponse =
  | { success: true; result: ClassificationResult }
  | { success: false; error: string }
  | { stats: Stats }
  | { success: true };
