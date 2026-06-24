chrome.runtime.onMessage.addListener((message, sender) => {
  if (message.action === "toggleStyling") {
    toggleStyling().catch(console.error);
  }
});

const CONTENT_SCRIPT_ID = "ssu-css";
const CSS_FILE = "styles/ssu/fix.css";

let enabled = false;

// on startup, check if the extension is enabled and register the content script if necessary
(async () => {
  const result = await chrome.storage.local.get({
    enabled: false
  });

  enabled = result.enabled;

  if (enabled) {
    await ensureContentScriptRegistered();
    await injectIntoExistingTabs();
  } else {
    await ensureContentScriptUnregistered();
  }
})();

async function toggleStyling() {
  if (enabled) {
    await disableStyling();
  } else {
    await enableStyling();
  }
}

async function enableStyling() {
  await ensureContentScriptRegistered();
  await injectIntoExistingTabs();

  enabled = true;

  await chrome.storage.local.set({
    enabled: true
  });
}

async function disableStyling() {
  await ensureContentScriptUnregistered();
  await removeFromExistingTabs();

  enabled = false;

  await chrome.storage.local.set({
    enabled: false
  });
}

async function ensureContentScriptRegistered() {
  const scripts = await chrome.scripting.getRegisteredContentScripts();

  const exists = scripts.some(
    script => script.id === CONTENT_SCRIPT_ID
  );

  if (exists) {
    return;
  }

  await chrome.scripting.registerContentScripts([
    {
      id: CONTENT_SCRIPT_ID,
      matches: ["<all_urls>"],
      css: [CSS_FILE],
      runAt: "document_start"
    }
  ]);
}

async function ensureContentScriptUnregistered() {
  const scripts = await chrome.scripting.getRegisteredContentScripts();

  const exists = scripts.some(
    script => script.id === CONTENT_SCRIPT_ID
  );

  if (!exists) {
    return;
  }

  await chrome.scripting.unregisterContentScripts({
    ids: [CONTENT_SCRIPT_ID]
  });
}

async function injectIntoExistingTabs() {
  const tabs = await chrome.tabs.query({});

  for (const tab of tabs) {
    if (!tab.id || !tab.url?.startsWith("http")) {
      continue;
    }

    try {
      await chrome.scripting.insertCSS({
        target: { tabId: tab.id },
        files: [CSS_FILE]
      });
    } catch (err) {
      console.warn(`Failed to inject CSS into tab ${tab.id}`, err);
    }
  }
}

async function removeFromExistingTabs() {
  const tabs = await chrome.tabs.query({});

  for (const tab of tabs) {
    if (!tab.id || !tab.url?.startsWith("http")) {
      continue;
    }

    try {
      await chrome.scripting.removeCSS({
        target: { tabId: tab.id },
        files: [CSS_FILE]
      });
    } catch (err) {
      console.warn(`Failed to remove CSS from tab ${tab.id}`, err);
    }
  }
}