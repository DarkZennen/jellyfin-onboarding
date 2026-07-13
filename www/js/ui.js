const UI = {

    bindWelcome() {

        const button = document.getElementById("startButton");

        if (!button) return;

        button.onclick = () => {

            // Show loading screen
            Router.show("loading");

            // Fake loading animation
            setTimeout(() => {

                const device = Detect.getDevice();

                const app = document.getElementById("app");

                app.innerHTML = Pages.device(device);

                UI.bindContinue(device);

            }, 1500);

        };

    },

    bindContinue(device) {

        const button = document.getElementById("continueButton");

        if (!button) return;

        button.onclick = () => {

            const app=document.getElementById("app");
app.innerHTML=`
<div class="card fade">
<div class="progress">
<div class="progress-track">
<div class="dot active"></div><div class="dot active"></div><div class="dot active"></div><div class="dot"></div><div class="dot"></div>
</div>
<div class="progress-label">Step 3 of 5</div>
</div>
<h2>📦 Install Jellyfin</h2>
<p class="description">Next we'll help you install Jellyfin on your device.</p>
<button>Coming Next →</button>
</div>`;

            // We'll replace this with the install pages
            // in the next sprint.

        };

    }

};