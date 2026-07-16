window.addEventListener("DOMContentLoaded", () => {

    const params = new URLSearchParams(window.location.search);

    let invite = params.get("invite");

    if (!invite) {

        const pathMatch = window.location.pathname.match(/^\/j\/([^/]+)\/?$/);

        if (pathMatch) {

            invite = pathMatch[1];

        }

    }

    if (invite) {

        AppState.inviteCode = invite;

    }

    Router.show("welcome");

});