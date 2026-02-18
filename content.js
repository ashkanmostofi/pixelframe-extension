let currentOverlay = null;

document.addEventListener("click", async function(e) {
  const path = e.composedPath();
  const img = path.find(el => el.tagName === "IMG");
  if (!img) return;

  const { pixelFrameActive } = await chrome.storage.local.get("pixelFrameActive");
  if (!pixelFrameActive) return;

  e.preventDefault();
  e.stopPropagation();
  e.stopImmediatePropagation();

  if (currentOverlay) {
    currentOverlay.outline.remove();
    currentOverlay.label.remove();
    currentOverlay = null;
  }

  const width = img.naturalWidth;
  const height = img.naturalHeight;

  const rect = img.getBoundingClientRect();

  const outline = document.createElement("div");
  outline.style.position = "absolute";
  outline.style.left = rect.left + window.scrollX + "px";
  outline.style.top = rect.top + window.scrollY + "px";
  outline.style.width = rect.width + "px";
  outline.style.height = rect.height + "px";
  outline.style.border = "3px solid #00ffcc";
  outline.style.pointerEvents = "none";
  outline.style.zIndex = "9999";
  document.body.appendChild(outline);

  const label = document.createElement("div");
  label.textContent = `width: ${width}px - height: ${height}px`;
  label.style.position = "absolute";
  label.style.left = rect.left + window.scrollX + "px";
  label.style.top = rect.top + window.scrollY - 25 + "px";
  label.style.background = "rgba(0,0,0,0.7)";
  label.style.color = "white";
  label.style.padding = "2px 6px";
  label.style.fontSize = "12px";
  label.style.fontFamily = "Tahoma, Arial, sans-serif";
  label.style.borderRadius = "3px";
  label.style.pointerEvents = "none";
  label.style.zIndex = "10000";
  document.body.appendChild(label);
  
  label.style.setProperty("font-family", "Tahoma, Arial, sans-serif", "important");
  label.style.setProperty("font-size", "14px", "important");
  label.style.setProperty("font-weight", "bold", "important");
  const labelOffset = 3;
  label.style.top = (rect.top + window.scrollY - 25 - labelOffset) + "px";

  currentOverlay = { outline, label };
}, true);
