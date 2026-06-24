const contentDiv = document.getElementById("content");

document.getElementById("fetchData").addEventListener("click", () => {

    chrome.tabs.query(
        {
            active: true,
            currentWindow: true
        },
        (tabs) => {
            if (!tabs.length) {
                contentDiv.innerHTML =
                    '<p class="error">No active tab found.</p>';
                return;
            }

            const tab = tabs[0];
            const url = tab.url || "";

            if (!url.includes(".smartschool.be")) {
                contentDiv.innerHTML = `
                <h2>Error</h2>
                <p class="error">
                    This extension only works on Smartschool pages.
                </p>
            `;
                return;
            }

            chrome.tabs.sendMessage(
                tab.id,
                { action: "getData" },
                (response) => {
                    if (chrome.runtime.lastError) {
                        contentDiv.innerHTML = `
                        <h2>Error</h2>
                        <p class="error">
                            ${chrome.runtime.lastError.message}
                        </p>
                    `;
                        return;
                    }

                    if (!response || !response.success) {
                        contentDiv.innerHTML = `
                        <p class="error">
                            Failed to get data from content script.
                        </p>
                    `;
                        return;
                    }

                    contentDiv.innerHTML = `
                    <h2>Data from Smartschool</h2>
                    <pre>${JSON.stringify(response.data, null, 2)}</pre>
                `;
                }
            );
        }
    );
});