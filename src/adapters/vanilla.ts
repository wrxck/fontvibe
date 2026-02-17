import type { FontVibeConfig } from '../core/types.js';
import { mount, destroy } from '../ui/mount.js';

export const fontvibe = {
  mount(options: Partial<FontVibeConfig> & { apiKey: string }): () => void {
    if (typeof window === 'undefined') return () => {};
    if (process.env.NODE_ENV === 'production') return () => {};
    return mount(options);
  },
  destroy,
};
