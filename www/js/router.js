const Router = {

    show(page) {

        const app = document.getElementById("app");

        if (!Pages[page]) {

            console.error(`Unknown page: ${page}`);

            return;

        }

        const needsDevice = (page === "device" || page === "install");

        app.innerHTML = needsDevice ? Pages[page](AppState.device) : Pages[page]();

        switch (page) {

            case "welcome":
                UI.bindWelcome();
                break;

            case "device":
                UI.bindDevice();
                break;

            case "install":
                UI.bindInstall();
                break;

            case "server":
                UI.bindServer();
                break;

            case "finished":
                UI.bindFinished();
                break;

        }

    }

};