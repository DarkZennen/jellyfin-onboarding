const app = document.getElementById("app");

const devices = {
    ios: {
        icon: "🍎",
        title: "iPhone / iPad",
        button: "Download from the App Store",
        url: "https://apps.apple.com/us/app/jellyfin-mobile/id1480192618"
    },
    android: {
        icon: "🤖",
        title: "Android",
        button: "Get it on Google Play",
        url: "https://play.google.com/store/apps/details?id=org.jellyfin.mobile"
    },
    windows: {
        icon: "🪟",
        title: "Windows",
        button: "Download Jellyfin Media Player",
        url: "https://github.com/jellyfin/jellyfin-media-player/releases/latest"
    },
    mac: {
        icon: "🍎",
        title: "macOS",
        button: "Download Jellyfin Media Player",
        url: "https://github.com/jellyfin/jellyfin-media-player/releases/latest"
    },
    linux: {
        icon: "🐧",
        title: "Linux",
        button: "Download Jellyfin Media Player",
        url: "https://github.com/jellyfin/jellyfin-media-player/releases/latest"
    },
    unknown: {
        icon: "📱",
        title: "Unknown Device",
        button: "View All Downloads",
        url: "https://jellyfin.org/downloads/"
    }
};

function detectDevice() {

    const ua = navigator.userAgent.toLowerCase();

    if (/iphone|ipad|ipod/.test(ua)) return devices.ios;

    if (/android/.test(ua)) return devices.android;

    if (/windows/.test(ua)) return devices.windows;

    if (/macintosh|mac os x/.test(ua)) return devices.mac;

    if (/linux/.test(ua)) return devices.linux;

    return devices.unknown;
}

function showDevicePage(device) {

    app.innerHTML = `

    <div class="row justify-content-center align-items-center min-vh-100">

    <div class="col-lg-8">

    <div class="text-center">

    <h1 class="display-3 mb-4">
    ${device.icon}
    </h1>

    <h2 class="mb-3">
    We detected ${device.title}
    </h2>

    <p class="lead text-secondary mb-5">
    Let's get Jellyfin installed.
    </p>

    <a href="${device.url}"
    target="_blank"
    class="btn btn-primary btn-lg mb-4">

    ${device.button}

    </a>

    <br><br>

    <button id="backButton" class="btn btn-outline-light">

    <i class="bi bi-arrow-left"></i>

    Back

    </button>

    </div>

    </div>

    </div>

    `;

    document.getElementById("backButton").addEventListener("click", () => {

        location.reload();

    });

}

document.addEventListener("DOMContentLoaded", () => {

    document.getElementById("startButton").addEventListener("click", () => {

        const device = detectDevice();

        showDevicePage(device);

    });

});
