import { mount } from '../src/ui/mount.js';
import { setState } from '../src/ui/state.js';

mount({
  apiKey: import.meta.env.VITE_GOOGLE_FONTS_API_KEY || '',
  position: 'bottom-right',
});

// Expose state setter for screenshot automation
(window as any).__fvSetState = setState;
