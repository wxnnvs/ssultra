console.log("Smartschool Ultra content script loaded");

function getData() {
    const logo = document.querySelector(".login-app__school-logo");
    const schoolName = document.querySelector(".login-app__school-name");

    return {
        logoUrl: logo?.src || null,
        schoolName: schoolName?.textContent.trim() || null
    };
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "getData") {
        sendResponse({
            success: true,
            data: getData()
        });
    }

    // if (request.action === "toggleStyling") {
    //     toggleStyling();
    //     sendResponse({ success: true });
    // }

    return true;
});

async function openSettings() {
    const html = await fetch(
        chrome.runtime.getURL('html/settings.html')
    ).then(r => r.text());

    const modal = document.createElement('div');
    modal.innerHTML = html;

    document.body.appendChild(modal);

    const dialog = document.querySelector('.ssu-settings');
    const toggleButton = document.getElementById('toggle-styling');
    const closeButton = document.getElementById('close-btn');

    toggleButton.addEventListener('click', () => {
        toggleStyling();
    });

    closeButton.addEventListener('click', () => {
        dialog.close();
    });

    dialog.showModal();
}

function toggleStyling() {
    chrome.runtime.sendMessage({ action: "toggleStyling" });
}

function addSettingsButton() {
    if (document.querySelector('.ssu-settings-btn')) {
        return true;
    }

    const link = document.querySelector('a.js-btn-home.topnav__btn');

    if (!link) {
        return false;
    }

    const settings = link.cloneNode(true);

    settings.classList.add('ssu-settings-btn');
    settings.href = '#';
    settings.textContent = 'Settings';

    settings.addEventListener('click', (event) => {
        event.preventDefault();
        openSettings();
    });

    link.parentNode.insertBefore(settings, link);

    return true;
}

// Try immediately
if (!addSettingsButton()) {
    const observer = new MutationObserver(() => {
        if (addSettingsButton()) {
            observer.disconnect();
        }
    });

    observer.observe(document.documentElement, {
        childList: true,
        subtree: true,
    });
}


