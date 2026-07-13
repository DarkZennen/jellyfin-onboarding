const Pages = {

progress(step) {

    const total = 5;

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

return `

<div class="card fade">

    <img
        class="logo floating"
        src="assets/logo/logo.png"
        alt="ThatOneCloud">

    <h1>
        Welcome to
        <br>
        ${CONFIG.appName}
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

        🚀 Get Started

    </button>

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
        src="assets/logo/logo.png">

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

<img class="logo floating" src="assets/logo/logo.png">

<h2>${device.icon} ${device.name}</h2>

<p class="description">${device.description}</p>

<div class="device-grid" style="margin:24px 0;">
<span>✓ Device Ready</span>
<span>✓ Browser Supported</span>
<span>✓ Secure Connection</span>
<span>✓ Guided Setup</span>
</div>

<button id="continueButton">Continue →</button>

</div>

`;

},

install(device){

device = device || AppState.device || Detect.getDevice();

const link = CONFIG.installLinks[device.id] || CONFIG.installLinks.browser;

return `

<div class="card fade">

${Pages.progress(3)}

<img class="logo floating" src="assets/logo/logo.png">

<h2>📲 Get the App</h2>

<p class="description">
    Install the Jellyfin app for ${device.name},
    or continue right in your browser — either works great.
</p>

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

<button id="continueInstall">Continue →</button>

</div>

`;

},

server(){

return `

<div class="card fade">

${Pages.progress(4)}

<img class="logo floating" src="assets/logo/logo.png">

<h2>🔗 Connect to the Server</h2>

<p class="description">
    Enter or paste this address when the app asks for a server —
    or just tap Open to connect instantly.
</p>

<div class="server-box">
    <span id="serverUrlText">${CONFIG.serverUrl}</span>
    <button id="copyServerUrl" class="copy-btn">Copy</button>
</div>

<button id="openServerButton">Open ${CONFIG.appName} →</button>

<button id="continueServer" class="secondary-btn">I've Connected →</button>

</div>

`;

},

finished(){

return `

<div class="card fade">

${Pages.progress(5)}

<img class="logo floating" src="assets/logo/logo.png">

<h2>🎉 You're All Set!</h2>

<p class="description">
    Enjoy ${CONFIG.appName}. If you ever need help again,
    just reopen this link and we'll walk you through it.
</p>

<button id="openFinishedButton">Open ${CONFIG.appName} →</button>

<button id="restartButton" class="secondary-btn">Start Over</button>

</div>

`;

}

};