window.addEventListener("DOMContentLoaded", () => {

    const params = new URLSearchParams(window.location.search);

    const invite = params.get("invite");

    if (invite) {

        AppState.inviteCode = invite;

    }

    Router.show("welcome");

});