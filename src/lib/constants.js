/**
 * Suzume Cinematic Design System & Movie Metadata Constants
 */

export const MOVIE_INFO = {
  title: 'Suzume',
  originalTitle: 'すずめの戸締まり',
  romaji: 'Suzume no Tojimari',
  director: 'Makoto Shinkai',
  music: 'RADWIMPS & Kazuma Jinnouchi',
  studio: 'CoMix Wave Films',
  releaseYear: 2022,
  tagline: 'On the other side of the door, was time in its entirety.',
  japaneseTagline: '扉の向こうには、すべての時間があった――',
};

export const SUZUME_PALETTE = {
  void: '#05070f',
  navyDeep: '#080d1a',
  navySurface: '#0e1628',
  navyElevated: '#162038',
  twilight: '#131b2e',

  // The Door
  doorVermilion: '#e11d48',
  doorCrimson: '#be123c',
  doorGlow: '#fb7185',
  doorWood: '#2a1810',

  // The Calamity
  calamityRed: '#ef4444',
  calamityMagenta: '#be185d',
  calamityShadow: '#3b0724',

  // Souta & The Key
  chairAmber: '#f59e0b',
  chairYellow: '#fbbf24',
  keyGold: '#d97706',
  goldShimmer: '#fde68a',

  // Tokoyo Realm
  tokoyoIndigo: '#312e81',
  tokoyoPurple: '#4338ca',
  tokoyoStarlight: '#818cf8',
  tokoyoViolet: '#6366f1',
  tokoyoDusk: '#c084fc',

  // Shinkai Sky & Water
  skyAzure: '#0ea5e9',
  skyCyan: '#38bdf8',
  skyPale: '#bae6fd',
  seaDeep: '#0369a1',

  // Daijin & Mist
  daijinPure: '#ffffff',
  daijinPearl: '#f8fafc',
  mist: '#cbd5e1',
  mistDim: '#64748b',
};

export const ANIMATION_PRESETS = {
  duration: {
    instant: 0.2,
    fast: 0.4,
    medium: 0.8,
    cinematic: 1.2,
    epic: 2.0,
  },
  easing: {
    cinematic: 'power3.out',
    smooth: 'power2.inOut',
    doorOpen: 'expo.inOut',
    calamityPulse: 'sine.inOut',
  },
};

/**
 * Section blueprint planned for upcoming implementation stages
 */
export const PLANNED_SECTIONS = [
  { id: 'hero', name: 'The Awakening Portal', japanese: '開かれた扉' },
  { id: 'journey', name: 'Closing the Calamity', japanese: '日本列島の旅' },
  { id: 'characters', name: 'Keepers & Keystones', japanese: '閉じ師と要石' },
  { id: 'tokoyo', name: 'The Ever-After Realm', japanese: '常世の世界' },
  { id: 'soundscape', name: 'RADWIMPS Symphony', japanese: '主題歌と劇伴' },
  { id: 'credits', name: 'Film Credits & Archives', japanese: '制作記録' },
];
