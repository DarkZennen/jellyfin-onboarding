const Pages = {

progress(step, total = 5) {

    let dots = "";

    for (let i = 1; i <= total; i++) {

        dots += `<div class="dot ${i <= step ? "active" : ""}"></div>`;

    }

    return `

    <div class="progress">
    <div class="progress-track">${dots}</div>
    <div class="progress-label">Step ${step} of ${total}</div>
    </div>

    `;

},

welcome() {

const invite = AppState.inviteCode;

return `

<div class="card fade">

    <img
        class="logo floating"
        src="/assets/logo/logo.png"
        alt="Jellyfin Onboarding">

    ${invite ? `<div class="invite-badge">🎟️ You've been invited</div>` : ""}

    <h1>
        Welcome to
        <br>
        ${CONFIG.serverName}
    </h1>

    <p class="subtitle">

        Your personal streaming library.

    </p>

    <p class="description">

        Stream your movies, TV shows, anime,
        documentaries, music and more
        from virtually any device.

    </p>

    <button id="startButton">

        ${invite ? "🎟️ Accept Invite &amp; Get Started" : "🚀 Get Started"}

    </button>

    ${invite ? `

    <div class="invite-qr">

        <div id="inviteQrCode" class="qr-box"></div>

        <p class="qr-caption">
            Setting up on another device?
            Scan this to create your account there.
        </p>

    </div>

    ` : ""}

    <div class="supported">

        <div class="supported-title">

            WORKS GREAT ON

        </div>

        <div class="device-grid">

            <span>📱 Android</span>
            <span>🍎 iPhone</span>
            <span>📺 Roku</span>
            <span>🔥 Fire TV</span>
            <span>💻 Windows</span>
            <span>🍎 macOS</span>
            <span>🐧 Linux</span>
            <span>🌐 Browser</span>

        </div>

    </div>

</div>

`;

},

loading(){

return `

<div class="card fade loading-page">

    <img
        class="logo floating"
        src="/assets/logo/logo.png">

    <h2>

        Detecting your device...

    </h2>

    <div class="spinner"></div>

    <p class="description">

        Preparing your personalized setup...

    </p>

</div>

`;

},

device(device){

device = device || AppState.device || Detect.getDevice();

return `

<div class="card fade">

${Pages.progress(2)}

<img class="logo floating" src="/assets/logo/logo.png">

<h2>${device.icon} ${device.name}</h2>

<p class="description">${device.description}</p>

<div class="device-grid" style="margin:24px 0;">
<span>✓ Device Ready</span>
<span>✓ Browser Supported</span>
<span>✓ Secure Connection</span>
<span>✓ Guided Setup</span>
</div>

<button id="continueButton">Continue →</button>

<button id="notThisDevice" class="secondary-btn">Not on ${device.name}? Choose a different device →</button>

</div>

`;

},

choosePlatform(){

const options = DEVICE_CATALOG.map(d => `

    <div class="device-option" data-id="${d.id}">
        <span class="device-option-icon">${d.icon}</span>
        <div class="device-option-text">
            <strong>${d.name}</strong>
            <span>${d.description}</span>
        </div>
    </div>

`).join("");

return `

<div class="card fade">

${Pages.progress(2)}

<img class="logo floating" src="/assets/logo/logo.png">

<h2>📺 Choose Your Device</h2>

<p class="description">
    Setting this up on a different device than the one
    you're using right now? Pick it below.
</p>

<div class="device-picker-list">
${options}
</div>

<button id="backToDetected" class="secondary-btn">← Back</button>

</div>

`;

},

install(device){

device = device || AppState.device || Detect.getDevice();

if (TV_PLATFORMS.includes(device.id)) {

    const steps = INSTALL_INSTRUCTIONS[device.id] || [];

    const stepsHtml = steps.map((step, i) => `

        <div class="tv-step">
            <span class="tv-step-number">${i + 1}</span>
            <span class="tv-step-text">${step}</span>
        </div>

    `).join("");

    return `

    <div class="card fade">

    ${Pages.progress(3)}

    <img class="logo floating" src="/assets/logo/logo.png">

    <h2>📲 Install on ${device.name}</h2>

    <p class="description">
        Since you're not on your ${device.name} right now,
        here's how to install Jellyfin directly on it:
    </p>

    <div class="tv-steps">
    ${stepsHtml}
    </div>

    <button id="continueInstall">Continue →</button>

    </div>

    `;

}

const link = CONFIG.installLinks[device.id] || CONFIG.installLinks.browser;

const isMobilePlatform = MOBILE_PLATFORMS.includes(device.id);

const qrSection = isMobilePlatform ? "" : `

    <div class="server-qr">

        <div id="serverQrCode" class="qr-box"></div>

        <p class="qr-caption">
            Prefer to set this up on your phone?
            Scan to continue there — we'll detect
            Android or iPhone automatically.
        </p>

    </div>

`;

return `

<div class="card fade">

${Pages.progress(3)}

<img class="logo floating" src="/assets/logo/logo.png">

<h2>🚀 Get Set Up</h2>

<p class="description">
    Here's your server address, and how to get the
    Jellyfin app for ${device.name}.
</p>

<div class="server-box">
    <span id="serverUrlText">${CONFIG.serverUrl}</span>
    <button id="copyServerUrl" class="copy-btn">Copy</button>
</div>

${qrSection}

<div class="install-option selected" data-method="app">
    <span class="install-icon">⬇️</span>
    <div class="install-text">
        <strong>Install the App</strong>
        <span>${link.label}</span>
    </div>
</div>

<div class="install-option" data-method="web">
    <span class="install-icon">🌐</span>
    <div class="install-text">
        <strong>Use in Browser</strong>
        <span>No install needed</span>
    </div>
</div>

<div id="installCopyToast" class="copy-toast" style="display:none;">
    📋 Server address copied! Paste it when Jellyfin asks for a server.
</div>

<button id="openServerButton" class="secondary-btn">Open ${CONFIG.serverName} →</button>

<button id="continueInstall">Continue →</button>

</div>

`;

},

server(){

const device = AppState.device || Detect.getDevice();

const isTvPlatform = TV_PLATFORMS.includes(device.id);

const isMobilePlatform = MOBILE_PLATFORMS.includes(device.id);

let qrSection;

if (isTvPlatform) {

    qrSection = `

        <div class="quickconnect-tip">
            <strong>💡 Typing a password with your remote is painful.</strong>
            <p>
                Sign in once on your phone or computer with your username
                and password, then look for <strong>Quick Connect</strong>
                on ${device.name}'s login screen — it'll show a short code.
                Enter that code on the device you just signed into, and
                ${device.name} logs in automatically. No remote typing.
            </p>
        </div>

    `;

} else if (isMobilePlatform) {

    qrSection = "";

} else {

    qrSection = `

        <div class="server-qr">

            <div id="serverQrCode" class="qr-box"></div>

            <p class="qr-caption">
                Prefer to set this up on your phone?
                Scan to continue there — we'll detect
                Android or iPhone automatically.
            </p>

        </div>

    `;

}

return `

<div class="card fade">

${Pages.progress(4)}

<img class="logo floating" src="/assets/logo/logo.png">

<h2>🔗 Connect to the Server</h2>

<p class="description">
    Enter or paste this address when the app asks for a server —
    or just tap Open to connect instantly.
    ${AppState.installMethod === "app" && !isTvPlatform
        ? "<br><span class=\"already-copied-hint\">Already in your clipboard from the last step — just paste it.</span>"
        : ""}
</p>

<div class="server-box">
    <span id="serverUrlText">${CONFIG.serverUrl}</span>
    <button id="copyServerUrl" class="copy-btn">Copy</button>
</div>

${qrSection}

${isTvPlatform ? "" : `<button id="openServerButton">Open ${CONFIG.serverName} →</button>`}

<button id="continueServer" class="secondary-btn">I've Connected →</button>

</div>

`;

},

finished(){

return `

<div class="card fade">

${Pages.progress(5)}

<img class="logo floating" src="/assets/logo/logo.png">

<h2>🎉 You're All Set!</h2>

<p class="description">
    Enjoy ${CONFIG.serverName}. If you ever need help again,
    just reopen this link and we'll walk you through it.
</p>

<button id="openFinishedButton">Open ${CONFIG.serverName} →</button>

<button id="restartButton" class="secondary-btn">Start Over</button>

</div>

`;

}

};