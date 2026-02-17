import { useEffect } from 'react';

import type { FontVibeConfig } from '../core/types.js';
import { mount, destroy } from '../ui/mount.js';

interface FontVibeProps extends Partial<Omit<FontVibeConfig, 'apiKey'>> {
  apiKey: string;
}

export function FontVibe(props: FontVibeProps): null {
  useEffect(() => {
    if (process.env.NODE_ENV === 'production') return;

    const teardown = mount(props);
    return () => {
      teardown();
      destroy();
    };
  }, [props.apiKey]);

  return null;
}
