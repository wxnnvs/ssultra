chrome.runtime.onMessage.addListener(async (message, sender) => {
  if (message.action === "toggleStyling") {
    const tabId = sender.tab?.id;

    if (!tabId) {
      console.error("No tab ID available");
      return;
    }

    await toggleStyling(tabId);
  }
});

let enabled = false;

async function toggleStyling(tabId) {
  if (enabled) {
    await chrome.scripting.removeCSS({
      target: { tabId },
      files: ['styles/ssu/fix.css']
    });
    enabled = false;
  } else {
    await chrome.scripting.insertCSS({
      target: { tabId },
      files: ['styles/ssu/fix.css']
    });
    enabled = true;
  }
}