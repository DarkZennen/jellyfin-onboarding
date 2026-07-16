const UI = {

    bindWelcome() {

        const button = document.getElementById("startButton");

        if (!button) return;

        button.onclick = () => {

            if (AppState.inviteCode) {

                window.open(CONFIG.inviteUrl(AppState.inviteCode), "_blank");

            }

            Router.show("loading");

            setTimeout(() => {

                Detect.getDevice();

                AppState.currentStep = 2;

                Router.show("device");

            }, 1500);

        };

        if (AppState.inviteCode) {

            QR.renderInto("inviteQrCode", CONFIG.inviteUrl(AppState.inviteCode));

        }

    },

    bindDevice() {

        const button = document.getElementById("continueButton");

        if (button) {

            button.onclick = () => {

                AppState.currentStep = 3;

                Router.show("install");

            };

        }

        const notThisDevice = document.getElementById("notThisDevice");

        if (notThisDevice) {

            notThisDevice.onclick = () => {

                Router.show("choosePlatform");

            };

        }

    },

    bindChoosePlatform() {

        const options = document.querySelectorAll(".device-option");

        options.forEach(option => {

            option.onclick = () => {

                const chosen = DEVICE_CATALOG.find(d => d.id === option.dataset.id);

                if (!chosen) return;

                AppState.device = chosen;

                AppState.currentStep = 3;

                Router.show("install");

            };

        });

        const backBtn = document.getElementById("backToDetected");

        if (backBtn) {

            backBtn.onclick = () => {

                AppState.currentStep = 2;

                Router.show("device");

            };

        }

    },

    bindInstall() {

        const device = AppState.device || Detect.getDevice();

        const isTvPlatform = TV_PLATFORMS.includes(device.id);

        if (isTvPlatform) {

            AppState.installMethod = "app";

        }

        const options = document.querySelectorAll(".install-option");

        options.forEach(option => {

            option.onclick = () => {

                options.forEach(o => o.classList.remove("selected"));

                option.classList.add("selected");

                AppState.installMethod = option.dataset.method;

                if (option.dataset.method === "app") {

                    const link = CONFIG.installLinks[device.id]
                        || CONFIG.installLinks.browser;

                    const toast = document.getElementById("installCopyToast");

                    navigator.clipboard.writeText(CONFIG.serverUrl).then(() => {

                        if (toast) toast.style.display = "flex";

                    }).catch((err) => {

                        console.error("Clipboard write failed:", err);

                    });

                    if (link && link.url) {

                        window.open(link.url, "_blank");

                    }

                }

            };

        });

        if (!isTvPlatform) {

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

            if (!MOBILE_PLATFORMS.includes(device.id)) {

                QR.renderInto("serverQrCode", continueOnPhoneUrl());

            }

        }

        const button = document.getElementById("continueInstall");

        if (!button) return;

        button.onclick = () => {

            if (!AppState.installMethod) {

                alert("Please choose an installation method.");

                return;

            }

            if (isTvPlatform) {

                AppState.currentStep = 4;

                Router.show("server");

            } else {

                AppState.currentStep = 4;

                Router.show("finished");

            }

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

        const device = AppState.device || Detect.getDevice();

        if (!TV_PLATFORMS.includes(device.id) && !MOBILE_PLATFORMS.includes(device.id)) {

            QR.renderInto("serverQrCode", continueOnPhoneUrl());

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