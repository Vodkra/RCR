
"use strict";

const REDIRECT_URL = "https://vodkra.github.io/RCR/Index.html";

const BLOCKED_DOMAINS = [
    "teamviewer.com",
    "anydesk.com",
    "splashtop.com",
    "logmein.com",
    "realvnc.com",
    "screenconnect.com",
    "connectwise.com",
    "zoho.com",
    "goto.com",
    "gotomypc.com",
    "gotoassist.com",
    "ultraviewer.net",
    "supremocontrol.com",
    "atera.com",
    "syncromsp.com",
    "syncrosecure.com",
    "remotedesktop.google.com",
    "rustdesk.com",
    "iperiusremote.com",
    "dwservice.net",
    "islonline.com",
    "filehippo.com"
];

function isBlocked(hostname) {
    hostname = hostname.toLowerCase();

    return BLOCKED_DOMAINS.some(domain =>
        hostname === domain ||
        hostname.endsWith("." + domain)
    );
}

browser.webRequest.onBeforeRequest.addListener(
    function(details) {

        try {
            const url = new URL(details.url);

            if (isBlocked(url.hostname)) {
                return {
                    redirectUrl: REDIRECT_URL
                };
            }

        } catch (error) {
            console.error("RCR Blocker:", error);
        }

        return {};
    },
    {
        urls: ["<all_urls>"],
        types: ["main_frame"]
    },
    ["blocking"]
);
