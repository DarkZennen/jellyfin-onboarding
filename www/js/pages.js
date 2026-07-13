const Pages = {

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

return `

<div class="card fade">

<div class="progress">
<div class="progress-track">
<div class="dot active"></div>
<div class="dot active"></div>
<div class="dot"></div>
<div class="dot"></div>
<div class="dot"></div>
</div>
<div class="progress-label">Step 2 of 5</div>
</div>

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

}

};