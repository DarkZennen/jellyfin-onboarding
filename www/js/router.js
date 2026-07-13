const Router = {

    show(page) {

        const app = document.getElementById("app");

        app.innerHTML = Pages[page]();

        switch (page) {

            case "welcome":
                UI.bindWelcome();
                break;

        }

    }

};