// SETTINGS
//Add your public key below and whether the notification should show always or only when tab not active

const publicVapidKey =
    "<ENTER PUBLIC KEY HERE>";
const show_only_when_tab_not_active = true; // When False the notification will always show


//
let SW;
let hidden = false;

//

document.addEventListener("visibilitychange", () => {
    if (document.visibilityState == "visible") {
        hidden = false;
        navigator.serviceWorker.controller.postMessage({
            state: hidden,
            onlyWhenHidden: show_only_when_tab_not_active
        });

    } else {
        hidden = true;
        navigator.serviceWorker.controller.postMessage({
            state: hidden,
            onlyWhenHidden: show_only_when_tab_not_active
        });
    }
});

if ("serviceWorker" in navigator) {
    send().catch((err) => console.error(err));

};


// Register SW, Register Push, Send Push
async function send() {
    // Register Service Worker

    const register = await navigator.serviceWorker.register(
        "/worker.js",
        {
            scope: "/",
        }
    );

    SW = register.installing || register.waiting || register.active;

    navigator.serviceWorker.controller.postMessage({
        state: hidden,
        onlyWhenHidden: show_only_when_tab_not_active
    });

    navigator.serviceWorker.addEventListener('controllerchange', async () => {
        SW = navigator.serviceWorker.controller;
    });

    // Register Push

    const subscription = await register.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(publicVapidKey),
    });

    // Subscribe to Push Notification
    await fetch("/api/web_push/subscribe", {
        method: "POST",
        body: JSON.stringify(subscription),
        headers: {
            "content-type": "application/json",
        },
    });
};


function urlBase64ToUint8Array(base64String) {
    const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
    const base64 = (base64String + padding)
        .replace(/\-/g, "+")
        .replace(/_/g, "/");

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
};