const Detect = {

    getDevice() {

        const ua = navigator.userAgent.toLowerCase();

        let device = {

            id: "browser",

            icon: "🌐",

            name: "Browser",

            description:
                "We'll help you connect using your browser."

        };

        if (ua.includes("android")) {

            device = {

                id: "android",

                icon: "📱",

                name: "Android",

                description:
                    "We'll install Jellyfin from Google Play."

            };

        }

        else if (ua.includes("iphone") || ua.includes("ipad")) {

            device = {

                id: "ios",

                icon: "🍎",

                name: "iPhone / iPad",

                description:
                    "We'll install Jellyfin from the App Store."

            };

        }

        else if (ua.includes("windows")) {

            device = {

                id: "windows",

                icon: "🖥️",

                name: "Windows",

                description:
                    "We'll install Jellyfin for Windows."

            };

        }

        else if (ua.includes("mac os")) {

            device = {

                id: "macos",

                icon: "🍎",

                name: "macOS",

                description:
                    "We'll install Jellyfin for macOS."

            };

        }

        else if (ua.includes("linux")) {

            device = {

                id: "linux",

                icon: "🐧",

                name: "Linux Desktop",

                description:
                    "We'll help you install Jellyfin on Linux."

            };

        }

        else if (
            ua.includes("aftb") ||
            ua.includes("aftm") ||
            ua.includes("aftt") ||
            ua.includes("afts")
        ) {

            device = {

                id: "firetv",

                icon: "🔥",

                name: "Fire TV",

                description:
                    "We'll install Jellyfin on Fire TV."

            };

        }

        else if (ua.includes("roku")) {

            device = {

                id: "roku",

                icon: "📺",

                name: "Roku",

                description:
                    "We'll install Jellyfin on Roku."

            };

        }

        AppState.device = device;

        AppState.browser = navigator.userAgent;

        return device;

    }

};