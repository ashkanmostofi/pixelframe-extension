const statusEl = document.getElementById("status");
const btn = document.getElementById("toggleBtn");

function updateUI(active) {
  statusEl.textContent = active ? "Active" : "Inactive";
  btn.textContent = active ? "Deactivate" : "Activate";
}
chrome.storage.local.get("pixelFrameActive", (data) => {
  updateUI(data.pixelFrameActive);
});
btn.addEventListener("click", () => {
  chrome.storage.local.get("pixelFrameActive", (data) => {
    const newState = !data.pixelFrameActive;
    chrome.storage.local.set({ pixelFrameActive: newState });
    updateUI(newState);
  });
});
