chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.local.set({ pixelFrameActive: true });
});

chrome.action.onClicked.addListener((tab) => {
  chrome.storage.local.get("pixelFrameActive", (data) => {
    const newState = !data.pixelFrameActive;
    chrome.storage.local.set({ pixelFrameActive: newState });
    chrome.action.setIcon({
      tabId: tab.id,
      path: newState
        ? {16:"icons/16.png",48:"icons/48.png",128:"icons/128.png"}
        : {16:"icons/16_gray.png",48:"icons/48_gray.png",128:"icons/128_gray.png"}
    });
  });
});
