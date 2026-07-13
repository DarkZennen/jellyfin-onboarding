const Detect={
getDevice(){
const ua=navigator.userAgent.toLowerCase();
if(ua.includes("android")) return {id:"android",icon:"📱",name:"Android Device Detected",description:"We'll help you install Jellyfin from the Google Play Store."};
if(ua.includes("iphone")||ua.includes("ipad")) return {id:"ios",icon:"🍎",name:"Apple Device Detected",description:"We'll help you install Jellyfin from the App Store."};
if(ua.includes("roku")) return {id:"roku",icon:"📺",name:"Roku Detected",description:"We'll show you how to install Jellyfin on your Roku."};
if(/aft[bmst]/.test(ua)) return {id:"firetv",icon:"🔥",name:"Fire TV Detected",description:"We'll guide you through installing Jellyfin from the Amazon Appstore."};
if(ua.includes("windows")) return {id:"windows",icon:"🖥️",name:"Windows Detected",description:"We'll help you install Jellyfin on Windows."};
if(ua.includes("mac os")) return {id:"macos",icon:"🍎",name:"macOS Detected",description:"We'll help you install Jellyfin on your Mac."};
if(ua.includes("linux")) return {id:"linux",icon:"🐧",name:"Linux Desktop Detected",description:"We'll help you install Jellyfin using the best method for your Linux desktop."};
return {id:"browser",icon:"🌐",name:"Browser Detected",description:"We'll help you continue in your browser."};
}};