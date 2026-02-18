const apiKeyInput = document.getElementById('apiKey') as HTMLInputElement;
const saveBtn = document.getElementById('save') as HTMLButtonElement;
const statusEl = document.getElementById('status') as HTMLDivElement;

chrome.storage.sync.get('fontvibeApiKey', (data) => {
  if (data.fontvibeApiKey) {
    apiKeyInput.value = data.fontvibeApiKey;
  }
});

saveBtn.addEventListener('click', () => {
  const apiKey = apiKeyInput.value.trim();
  if (!apiKey) {
    statusEl.textContent = 'API key is required';
    return;
  }

  chrome.storage.sync.set({ fontvibeApiKey: apiKey }, () => {
    statusEl.textContent = 'saved — reload the page to activate';

    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs[0]?.id) {
        chrome.tabs.sendMessage(tabs[0].id, { type: 'fontvibe-activate', apiKey });
      }
    });
  });
});
