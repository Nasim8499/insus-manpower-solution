# INSUS Manpower Solution — PWA → Installable App / APK Guide

This web app is a fully installable Progressive Web App (PWA) and exposes a direct Android APK download at `/downloads/insus-manpower-solution.apk`.

## 1. Install instantly (no APK needed)

- **Android (Chrome / Edge):** open the deployed site → the in-app
  **“Install App”** popup appears (or tap browser menu ⋮ → **Install app /
  Add to Home screen**). Chrome packages it as a **WebAPK** — a real installed
  app with its own icon, full-screen standalone launch and offline support.
- **iPhone / iPad (Safari):** tap the **Share** button → **Add to Home Screen**.
- **Desktop (Chrome / Edge):** click the install icon in the address bar or the
  in-app Install button — it installs as a desktop app window.

Includes: `manifest.webmanifest`, service worker (`sw.js`) with offline
caching, and maskable/any PNG icons.

## 2. Building a signed Android APK

A real `.apk` is compiled from the PWA as a **Trusted Web Activity** using
Google’s Bubblewrap (needs JDK 17+ and Android SDK on the build machine):

```bash
npm i -g @bubblewrap/cli
# deploy the site first, then update "host" / iconUrl in public/twa-manifest.json
bubblewrap init --manifest https://YOUR-DEPLOYED-URL/manifest.webmanifest
bubblewrap build
# → produces app-release-signed.apk

Copy the final APK into `public/downloads/insus-manpower-solution.apk` before the production build so the web page downloads it directly.
```

Or use the no-command web tool: **https://www.pwabuilder.com** → paste the
deployed URL → Package for Android → download the signed APK bundle.

`public/twa-manifest.json` is a ready Bubblewrap config template
(packageId `com.insus.manpower`) — just replace the placeholder host URL after
deployment.

> APK installation is for Android phones and tablets. iPhone/iPad users should use Safari → Share → Add to Home Screen.
