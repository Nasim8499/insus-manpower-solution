# INSUS Manpower Solution

বাংলাদেশ থেকে Singapore employment, Work Permit, IPA, deployment process, worker safety এবং ৫০টি FAQ-এর responsive PWA guide.

## Features

- Mobile-first responsive FAQ and deployment guide
- Installable PWA with offline shell
- Direct Android APK download section
- iPhone/iPad Add to Home Screen instructions
- Editable admin content panel stored locally in the browser

## Local development

```bash
npm install
npm run dev
```

## Production build

```bash
npm run build
```

The Android download button serves `public/downloads/insus-manpower-solution.apk` from `/downloads/insus-manpower-solution.apk`.

> APK installation is supported on Android devices. iPhone and iPad use the PWA Add to Home Screen flow because iOS cannot install Android APK files.
