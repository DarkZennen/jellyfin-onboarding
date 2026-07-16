// =============================================================
// Jellyfin Onboarding — Configuration
// =============================================================
// This is the ONE file you need to edit to make Jellyfin Onboarding
// point at YOUR Jellyfin server instead of the reference
// deployment it was built for.
//
// REQUIRED CHANGES:
//   - serverUrl   -> your Jellyfin server's public URL
//   - wizarrUrl   -> your Wizarr instance's public URL
//                    (only if you use Wizarr for invites — if you
//                    don't, you can leave this as-is; the invite
//                    flow simply won't be used)
//
// OPTIONAL CHANGES:
//   - appName / tagline -> your own branding
//   - installLinks      -> only touch these if you want to point
//                          at a different Jellyfin client (e.g. a
//                          fork, or a different Android TV app)
//
// Everything below installLinks (DEVICE_CATALOG, TV_PLATFORMS,
// MOBILE_PLATFORMS, INSTALL_INSTRUCTIONS) is generic and should
// work for any Jellyfin deployment without changes.
// =============================================================

const CONFIG={

appName:"Jellyfin Onboarding",

tagline:"Your Personal Streaming Service",

version:"0.5.0",

serverUrl:"https://jellyfin.thatonecloud.com",

wizarrUrl:"https://onboard.thatonecloud.com",

inviteUrl(code){

    return this.wizarrUrl.replace(/\/$/, "") + "/j/" + code;

},

installLinks:{

    android:{
        url:"https://play.google.com/store/apps/details?id=org.jellyfin.mobile",
        label:"Get it on Google Play"
    },

    ios:{
        url:"https://apps.apple.com/us/app/jellyfin-mobile/id1480192618",
        label:"Download on the App Store"
    },

    windows:{
        url:"https://github.com/jellyfin/jellyfin-media-player/releases/latest",
        label:"Download Jellyfin Media Player"
    },

    macos:{
        url:"https://github.com/jellyfin/jellyfin-media-player/releases/latest",
        label:"Download Jellyfin Media Player"
    },

    linux:{
        url:"https://github.com/jellyfin/jellyfin-media-player/releases/latest",
        label:"Download Jellyfin Media Player"
    },

    firetv:{
        url:"https://www.amazon.com/gp/product/B07QSX8CY6",
        label:"Get it on the Amazon Appstore"
    },

    roku:{
        url:"https://channelstore.roku.com/details/1fefac9c78bf85cf50e4b34c37e1cbd9/jellyfin",
        label:"Add the Roku Channel"
    },

    androidtv:{
        url:"https://play.google.com/store/apps/details?id=org.jellyfin.androidtv",
        label:"Get it on Google Play (Android TV / Google TV)"
    },

    appletv:{
        url:"https://apps.apple.com/us/app/swiftfin/id1604098728",
        label:"Download Swiftfin on the App Store"
    },

    browser:{
        url:null,
        label:"No install needed"
    }

}

};

const DEVICE_CATALOG=[

    { id:"android",   icon:"📱", name:"Android",              description:"Phone or tablet running Android." },
    { id:"ios",       icon:"🍎", name:"iPhone / iPad",         description:"Apple phone or tablet." },
    { id:"windows",   icon:"🖥️", name:"Windows",               description:"Windows PC or laptop." },
    { id:"macos",     icon:"🍎", name:"macOS",                 description:"Mac desktop or laptop." },
    { id:"linux",     icon:"🐧", name:"Linux Desktop",         description:"Linux PC or laptop." },
    { id:"firetv",    icon:"🔥", name:"Fire TV",               description:"Amazon Fire TV or Fire TV Stick." },
    { id:"roku",      icon:"📺", name:"Roku",                  description:"Roku streaming device or Roku TV." },
    { id:"androidtv", icon:"📺", name:"Android TV / Google TV",description:"Android TV, Google TV, or Nvidia Shield." },
    { id:"appletv",   icon:"📺", name:"Apple TV",              description:"Apple TV 4K or HD, via Swiftfin." },
    { id:"browser",   icon:"🌐", name:"Web Browser",           description:"Watch right in your browser, no install." }

];

const TV_PLATFORMS = ["firetv", "roku", "androidtv", "appletv"];

const MOBILE_PLATFORMS = ["android", "ios"];

function continueOnPhoneUrl() {

    const origin = window.location.origin;

    const invite = AppState.inviteCode;

    return origin + "/" + (invite ? ("?invite=" + encodeURIComponent(invite)) : "");

}

const INSTALL_INSTRUCTIONS = {

    firetv: [
        "On your Fire TV remote, press Home.",
        "Go to Find → Search.",
        "Search for \"Jellyfin\" and select it.",
        "Select Get / Download, then Open once it's installed."
    ],

    roku: [
        "On your Roku remote, press Home.",
        "Go to Streaming Channels → Search Channels.",
        "Search for \"Jellyfin\" and select it.",
        "Select Add Channel, then open it once it's installed."
    ],

    androidtv: [
        "On your Android TV / Google TV, open the Google Play Store app.",
        "Search for \"Jellyfin\".",
        "Select Install, then Open once it's installed."
    ],

    appletv: [
        "On your Apple TV, open the App Store app.",
        "Search for \"Swiftfin\" (Jellyfin's official Apple TV app).",
        "Select Get, then Open once it's installed."
    ]

};