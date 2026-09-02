const R2_VOCALS = "https://pub-7236cb2f994c4bdeba84ae4920d69b30.r2.dev/sounds/instruments/athmospheresDawdio/vocals";
const freeFSharpm = `${R2_VOCALS}/110_Free_FSharpm.wav`;
const altEm = `${R2_VOCALS}/120_Alt_Em.wav`;
const deepAm = `${R2_VOCALS}/128_Deep_Am.wav`;
const heavenlyGm = `${R2_VOCALS}/110_Heavenly_Gm.wav`;

export const AthmosphereVocals = {
    FreeFSharpm: freeFSharpm,
    AltEm: altEm,
    DeepAm: deepAm,
    HeavenlyGm: heavenlyGm,
} as const;