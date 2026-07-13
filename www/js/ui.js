const UI = {

    bindWelcome() {

        const button = document.getElementById("startButton");

        if (!button) return;

        button.onclick = () => {

            Router.show("loading");

            setTimeout(() => {

                Detect.getDevice();

                AppState.currentStep = 2;

                Router.show("device");

            }, 1500);

        };

    },

    bindDevice() {

        const button = document.getElementById("continueButton");

        if (!button) return;

        button.onclick = () => {

            AppState.currentStep = 3;

            Router.show("install");

        };

    },

    bindInstall() {

        const options = document.querySelectorAll(".install-option");

        options.forEach(option => {

            option.onclick = () => {

                options.forEach(o => o.classList.remove("selected"));

                option.classList.add("selected");

                AppState.installMethod = option.dataset.method;

                if (option.dataset.method === "app") {

                    const link = CONFIG.installLinks[AppState.device.id]
                        || CONFIG.installLinks.browser;

                    if (link && link.url) {

                        window.open(link.url, "_blank");

                    }

                }

            };

        });

        const button = document.getElementById("continueInstall");

        if (!button) return;

        button.onclick = () => {

            if (!AppState.installMethod) {

                alert("Please choose an installation method.");

                return;

            }

            AppState.currentStep = 4;

            Router.show("server");

        };

    },

    bindServer() {

        const copyBtn = document.getElementById("copyServerUrl");

        if (copyBtn) {

            copyBtn.onclick = () => {

                navigator.clipboard.writeText(CONFIG.serverUrl).then(() => {

                    copyBtn.textContent = "Copied!";

                    setTimeout(() => { copyBtn.textContent = "Copy"; }, 1500);

                }).catch(() => {

                    copyBtn.textContent = "Couldn't copy";

                    setTimeout(() => { copyBtn.textContent = "Copy"; }, 1500);

                });

            };

        }

        const openBtn = document.getElementById("openServerButton");

        if (openBtn) {

            openBtn.onclick = () => window.open(CONFIG.serverUrl, "_blank");

        }

        const continueBtn = document.getElementById("continueServer");

        if (continueBtn) {

            continueBtn.onclick = () => {

                AppState.currentStep = 5;

                Router.show("finished");

            };

        }

    },

    bindFinished() {

        const openBtn = document.getElementById("openFinishedButton");

        if (openBtn) {

            openBtn.onclick = () => window.open(CONFIG.serverUrl, "_blank");

        }

        const restartBtn = document.getElementById("restartButton");

        if (restartBtn) {

            restartBtn.onclick = () => {

                AppState.reset();

                Router.show("welcome");

            };

        }

    }

};