import { mount, destroy } from '@matthesketh/fontvibe';

let active = false;

function activate(apiKey: string): void {
  if (active) return;
  active = true;
  mount({ apiKey });
}

chrome.storage.sync.get('fontvibeApiKey', (data) => {
  if (data.fontvibeApiKey) {
    activate(data.fontvibeApiKey);
  }
});

chrome.runtime.onMessage.addListener((msg) => {
  if (msg.type === 'fontvibe-activate' && msg.apiKey) {
    if (active) {
      destroy();
      active = false;
    }
    activate(msg.apiKey);
  }
});
