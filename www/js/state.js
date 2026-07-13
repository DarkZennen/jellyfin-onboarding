const AppState = {

    currentStep: 1,

    totalSteps: 5,

    device: null,

    installMethod: null,

    inviteCode: null,

    serverUrl: "",

    browser: null,

    reset() {

        this.currentStep = 1;

        this.device = null;

        this.installMethod = null;

        this.browser = null;

    }

};